<template>
    <div>
        <header class="hide-sm">
            <div class="row wrapped push-center">
                <div class="brand-logo" style="line-height: 103px; font-size:2em; text-align: center; border: 1px solid #333;">
                    <router-link to="/">LOGO</router-link>
                </div>
                <nav class="auto row">
                    <div class="col col-12 row align-middle">
                        <div class="col col-12 row align-middle around">
                            <a href="#"><i class="dashboard w24"></i>Dashboard</a>
                            <!--<router-link to="/activites"><i class="activities w24"></i>Activités</router-link>
                            <router-link to="/membres"><i class="members w24"></i>Membres</router-link>-->
                            <a href="#"><i class="payments w24"></i>Comptabilité</a>
                            <a href="#"><i class="settings w24 m0"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>
<style lang="scss" src="../../sass/navbar.scss"></style>
<script>


    
    export default{
        data(){
            return { }
        },
        components: {},
        
        methods: {},
        
        watch: {},
        
        mounted(){
            
        }
    }

</script>
