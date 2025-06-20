<template>
  <footer class="bg-teal-600 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold mb-4">Adventures App</h3>
          <p class="text-teal-100 text-sm leading-relaxed mb-6">
            Discover entire homes and private rooms perfect for any trip. Experience unique accommodations around the world.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200">
              <i class="material-icons text-xl">facebook</i>
            </a>
            <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200">
              <i class="material-icons text-xl">twitter</i>
            </a>
            <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200">
              <i class="material-icons text-xl">instagram</i>
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Product</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                The solution
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Tools overview
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Press kit
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <!-- More Info Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">More info</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Careers
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Contact
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Blog
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" class="text-teal-100 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="border-t border-teal-500 bg-black">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-white text-sm mb-2 md:mb-0">
            © {{ currentYear }} Adventures App. All rights reserved.
          </p>
          <p class="text-white text-sm">
            Built with <span class="text-yellow-400 font-semibold">Vue.js</span> and <span class="text-yellow-400 font-semibold">Firebase</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'FooterPartial',
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return {
      currentYear,
    };
  },
}
</script>

<style>
/* Custom styles removed - using Tailwind CSS classes */
</style>
