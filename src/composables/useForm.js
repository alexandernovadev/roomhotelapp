import { reactive, ref } from 'vue'

export function useForm(initialData = {}) {
  const form = reactive({ ...initialData })
  const errors = reactive({})
  const isSubmitting = ref(false)
  const isValid = ref(true)

  const setField = (field, value) => {
    form[field] = value
    if (errors[field]) {
      delete errors[field]
    }
  }

  const setError = (field, message) => {
    errors[field] = message
    isValid.value = false
  }

  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
    isValid.value = true
  }

  const resetForm = () => {
    Object.keys(form).forEach(key => {
      form[key] = initialData[key] || ''
    })
    clearErrors()
    isSubmitting.value = false
  }

  const validateForm = (validationRules) => {
    clearErrors()

    for (const [field, rules] of Object.entries(validationRules)) {
      const value = form[field]

      if (rules.required && !value) {
        setError(field, `${field} es requerido`)
        continue
      }

      if (rules.minLength && value && value.length < rules.minLength) {
        setError(field, `${field} debe tener al menos ${rules.minLength} caracteres`)
        continue
      }

      if (rules.email && value && !isValidEmail(value)) {
        setError(field, `${field} debe ser un email válido`)
        continue
      }

      if (rules.pattern && value && !rules.pattern.test(value)) {
        setError(field, rules.message || `${field} no tiene el formato correcto`)
        continue
      }
    }

    return Object.keys(errors).length === 0
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const submitForm = async (submitFunction) => {
    if (isSubmitting.value) return

    isSubmitting.value = true

    try {
      await submitFunction(form)
      resetForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    isValid,
    setField,
    setError,
    clearErrors,
    resetForm,
    validateForm,
    submitForm
  }
}
