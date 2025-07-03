import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { ref as dbRef, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import type { User, LoginCredentials, RegisterData } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userId = computed(() => user.value?.id || null);

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await fetchUser(userCredential.user.uid);
      return true;
    } catch (err) {
      error.value = getAuthErrorMessage(err as any);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const newUser: User = {
        id: userCredential.user.uid,
        email: userData.email,
        name: userData.name,
        username: userData.email.split('@')[0],
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D9488&color=fff&size=128`,
        phone: userData.phone || '',
        bio: '',
        registeredAt: Math.floor(Date.now() / 1000),
        lastVisitAt: Math.floor(Date.now() / 1000),
      };

      // Save user to database
      await set(dbRef(db, `users/${userCredential.user.uid}`), newUser);

      user.value = newUser;
      return true;
    } catch (err) {
      error.value = getAuthErrorMessage(err as any);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      user.value = null;
      error.value = null;
    } catch (err) {
      error.value = 'Error al cerrar sesión';
    }
  };

  const fetchUser = async (uid: string): Promise<void> => {
    try {
      const userRef = dbRef(db, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        user.value = { id: uid, ...snapshot.val() } as User;
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      error.value = 'Error al cargar datos del usuario';
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    if (!user.value) return false;

    try {
      const userRef = dbRef(db, `users/${user.value.id}`);
      await set(userRef, { ...user.value, ...updates });
      user.value = { ...user.value, ...updates };
      return true;
    } catch (err) {
      error.value = 'Error al actualizar usuario';
      return false;
    }
  };

  const initializeAuth = (): void => {
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        await fetchUser(firebaseUser.uid);
      } else {
        user.value = null;
      }
    });
  };

  const clearError = (): void => {
    error.value = null;
  };

  // Helper function for error messages
  const getAuthErrorMessage = (error: any): string => {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/invalid-credential': 'Credenciales inválidas',
    };

    return errorMessages[error.code] || 'Error de autenticación';
  };

  return {
    // State
    user,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    userId,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateUser,
    initializeAuth,
    clearError,
  };
});
