<template>
  <div class="default-layout">
    <header-partial></header-partial>
    <section
      class="py-6 bg-black bg-cover bg-center min-h-[350px] sm:min-h-[550px] flex items-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80');
      "
    >
      <div class="container mx-auto pl-4 pr-4">
        <div class="bg-white p-6 w-full max-w-md ml-auto shadow-lg rounded-lg">
          <h1 class="mb-3 text-3xl font-light text-neutral-800">Find homes on Adventures App</h1>
          <h2 class="mb-6 text-sm text-neutral-600 font-normal">
            Discover entire homes and private rooms perfect for any trip.
          </h2>
          <form class="form__search" @submit.prevent>
            <div class="mb-4">
              <label class="block text-sm font-medium text-neutral-700 mb-2" for="where">Where</label>
              <div class="relative">
                <i class="material-icons absolute top-3 left-3 text-neutral-400">search</i>
                <input
                  class="w-full py-3 pl-10 pr-4 text-neutral-700 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  id="where"
                  type="text"
                  placeholder="Bogotá, Colombia"
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-cyan-500 font-semibold rounded-lg text-white hover:bg-cyan-600 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
    <main class="main">
      <slot></slot>
    </main>
    <footer-partial></footer-partial>
  </div>
</template>

<script>
import HeaderPartial from '@/partials/HeaderPartial.vue'
import FooterPartial from '@/partials/FooterPartial.vue'

export default {
  name: 'DefaultLayout',
  components: {
    HeaderPartial,
    FooterPartial,
  },
}
</script>
