<template>
    <div id="action_bar">
        <div class="action_bar-visible h100">
            <a href="#" class="show-sm menu-toggle">
                <i class="activities"></i>
                <div class="arrow down"></div>
            </a>
            <div class="action_bar-content align-middle">
                <div class="element" v-for="a in actionbar">
                    <a href="#">{{ a.name }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>

    import actionbar from '../store/actionbar'
    
    export default{
        data(){
            return {
                actionbar
            }
        },
        components: {},
        
        methods: {},
        
        computed: {},
        
        watch: {},
        
        mounted(){
            
        }
    }

</script>
