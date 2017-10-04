<template>
    <div class="relative" tabindex="0" @focusin.prevent="openPanel" @focusout="closePanel">
        <div class="disc colorful" @mousedown="togglePanel" :class="[value + '-sheet']"></div>
        <transition name="slide-fade">
            <div class="panel" v-show="panel_opened">
                <div class="disc colorful" v-for="c in colors" :class="[c + '-sheet']" @click="setColor(c)"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    .disc{
        width: 30px;
        height: 30px;
        border-radius: 30px;
        cursor: pointer;
    }

    .panel{
        top: 0px;
        right: 35px;
        position: absolute;
        background: #fafafa;
        border-radius:90px;
        box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.5);
        height: 35px;
        padding-left: 10px;
        padding-right:10px;
        display:flex;
    }

    .panel .disc {
        box-sizing: content-box;
        border: 5px solid;
        border-color: #fafafa !important;
        margin: auto;
        width: 20px;
        height: 20px;
        transition: transform 0.3s;
    }

    .panel .disc:hover {
        transform: scale(1.2);
    }


    .slide-fade-enter-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{

        transform: translateX(20px);
        opacity: 0;
    }
</style>
<script>
    
    export default {
        data() {
            return {
                event: null,
                panel_opened: false,
                colors: ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple']
            }
        },
        
        methods: {
            togglePanel(){
                    this.panel_opened = !this.panel_opened;
                    this.$refs.panel.focus();
            },

            openPanel(){
                this.panel_opened = true;
            },

            closePanel(){
                this.panel_opened = false;
            },

            setColor(color){
                this.$emit('input', color);
                this.closePanel();

            }
        },

        props: ['value'],
    }

</script>
