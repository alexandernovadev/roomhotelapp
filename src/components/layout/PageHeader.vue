<template>
  <section class="bg-gradient-to-r from-cyan-600 to-cyan-700 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="flex-1 mb-6 lg:mb-0">
          <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
          <p v-if="subtitle" class="text-cyan-100 mt-2">{{ subtitle }}</p>
        </div>

        <!-- Right side content -->
        <div v-if="$slots.right" class="flex items-center">
          <slot name="right" />
        </div>

        <!-- Default icon if no right slot -->
        <div v-else-if="icon" class="text-right text-white">
          <i class="material-icons text-4xl">{{ icon }}</i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
