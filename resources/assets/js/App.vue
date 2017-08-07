<template>
    <div class="h100">
        <Navbar v-show="showLayout"></Navbar>
        <Actionbar v-show="showLayout"></Actionbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navbar from './components/Navbar.vue'
    import Actionbar from './components/Actionbar.vue'

export default {
  name: 'App',

  data(){
      return {}
  },
  computed: {
      showLayout(){
          return this.$route.meta.layout !== false;
      }
  },
    components: {Navbar, Actionbar}
}
</script>
