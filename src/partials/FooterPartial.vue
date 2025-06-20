<template>
  <footer class="footer mt-6">
    <section class="footer__items bg-white border-t py-6">
      <div class="container mx-auto grid-container">
        <div class="footer__brand mb-3">
          <p class="text-gray-800 text-3xl font-semibold mb-2">Adventures Rooms</p>
          <p class="text-gray-600">
            Discover entire homes and private rooms perfect for any trip.
          </p>
        </div>
        <div class="footer__list mb-3">
          <ul class="list-none">
            <li class="mb-2 text-lg text-gray-800 font-semibold">Product</li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#"
                >The solution</a
              >
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#"
                >Tools overview</a
              >
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#"
                >Press kit</a
              >
            </li>
          </ul>
        </div>
        <div class="footer__list">
          <ul class="list-none">
            <li class="mb-2 text-lg text-gray-800 font-semibold">More info</li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#">Careers</a>
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#">Contact</a>
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#">Blog</a>
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#"
                >Terms of Service</a
              >
            </li>
            <li class="mb-2">
              <a class="no-underline text-gray-700 hover:text-gray-900" href="#"
                >Privacy and Cookie Policy</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="footer__copyright bg-teal-700 py-4 text-white">
      <div class="container mx-auto"><b>Vue And Firebase</b></div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'FooterPartial',
}
</script>

<style>
.footer .grid-container {
  grid-template-columns: 2fr 1fr 1fr;
}

@media (max-width: 576px) {
  .footer .grid-container {
    grid-template-columns: 1fr;
  }
  .footer {
    @apply text-center;
  }
}
</style>
