<template>
    <div>
        <header class="hide-sm">
            <div class="row wrapped push-center">
                <div class="brand-logo" style="line-height: 103px; font-size:2em; text-align: center; border: 1px solid #333;">LOGO</div>
                <nav class="auto row">
                    <div class="col col-12 row align-middle">
                        <div class="col col-12 row around align-middle">
                            <a href="#"><i class="dashboard w24"></i>Dashboard</a>
                            <a href="#"><i class="activities w24"></i>Activités</a>
                            <a href="#"><i class="members w24"></i>Membres</a>
                            <a href="#"><i class="payments w24"></i>Comptabilité</a>
                            <a href="#"><i class="settings w24 m0"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <div id="action_bar">
            <div class="row action_bar-visible">
                <a href="#" class="show-sm menu-toggle">
                    <i class="activities"></i>
                    <div class="arrow down"></div>
                </a>
                <div class="action_bar-content">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="../../sass/navbar.scss"></style>
<script>
    
    export default{
        data(){
            return {}
        },
        components: {},
        
        methods: {},
        
        computed: {},
        
        watch: {},
        
        mounted(){
            
        }
    }

</script>
