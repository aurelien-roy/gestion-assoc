<template>
    <div>
        <Navbar></Navbar>
        <Actionbar></Actionbar>
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

  },
    components: {Navbar, Actionbar}
}
</script>
