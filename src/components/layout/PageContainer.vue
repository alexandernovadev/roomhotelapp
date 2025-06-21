<template>
  <div class="page-container" :class="containerClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContainer',
  props: {
    padding: {
      type: String,
      default: 'py-8',
      validator: (value) => ['py-4', 'py-6', 'py-8', 'py-12', 'py-16'].includes(value)
    },
    maxWidth: {
      type: String,
      default: '',
      validator: (value) => ['', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl'].includes(value)
    }
  },
  computed: {
    containerClasses() {
      const classes = [this.padding]
      if (this.maxWidth) {
        classes.push(this.maxWidth, 'mx-auto')
      }
      return classes.join(' ')
    }
  }
}
</script>
