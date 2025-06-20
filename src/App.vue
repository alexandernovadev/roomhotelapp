<template>
  <div id="app">
    <!-- <button @click="handleToggle">Toogle</button>
    <ModalJsx :show="show" message="HOla" /> -->
    <router-view />
    <NotificationContainer />
  </div>
</template>

<script>
// import ModalJsx from "./render-functions/ModalJsx.vue";
import NotificationContainer from './components/NotificationContainer.vue'

export default {
  data() {
    return {
      show: false,
    }
  },
  components: {
    NotificationContainer,
  },
  methods: {
    handleToggle() {
      this.show = !this.show
    },
  },
}
</script>
<style lang="postcss" src="./assets/tailwind.postcss"></style>
<style lang="css" src="./assets/main.css"></style>
