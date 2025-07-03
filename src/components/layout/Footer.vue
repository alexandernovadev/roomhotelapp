<template>
  <footer class="bg-gradient-dark text-white py-12 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">R</span>
            </div>
            <span class="text-white font-bold text-xl">RoomHotel</span>
          </div>
          <p class="text-white/70 mb-4 max-w-md">
            Encuentra tu lugar ideal en cualquier parte del mundo.
            Miles de propiedades únicas esperan por ti.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-white/60 hover:text-white transition-colors">
              📘 Facebook
            </a>
            <a href="#" class="text-white/60 hover:text-white transition-colors">
              📷 Instagram
            </a>
            <a href="#" class="text-white/60 hover:text-white transition-colors">
              🐦 Twitter
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-white/60 hover:text-white transition-colors"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold mb-4">Soporte</h3>
          <ul class="space-y-2">
            <li v-for="item in supportItems" :key="item.label">
              <a
                :href="item.href"
                class="text-white/60 hover:text-white transition-colors"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-white/60 text-sm">
          © 2024 RoomHotel. Todos los derechos reservados.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
            Privacidad
          </a>
          <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
            Términos
          </a>
          <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Quick links (DRY - centralized data)
const quickLinks = [
  { label: 'Buscar Habitaciones', path: '/search' },
  { label: 'Explorar Destinos', path: '/explore' },
  { label: 'Listar Propiedad', path: '/user/rooms/create' },
  { label: 'Sobre Nosotros', path: '/about' },
];

// Support items (DRY - centralized data)
const supportItems = [
  { label: 'Centro de Ayuda', href: '/help' },
  { label: 'Contacto', href: '/contact' },
  { label: 'Preguntas Frecuentes', href: '/faq' },
  { label: 'Reportar Problema', href: '/report' },
];
</script>
