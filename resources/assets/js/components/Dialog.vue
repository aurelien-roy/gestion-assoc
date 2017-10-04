<template>
    <div>

        <transition name="dialog-transition" :duration="500" @afterEnter="onOpening">
            <div v-show="visible">
                <div class="overlay">

                </div>

                <div class="dialog-container no-selectable" @click.prevent="onClickOutside">
                    <div class="dialog" @click.stop ref="modal">

                        <div class="dialog-header" v-if="title">
                            <h1>{{ title }}</h1>
                            <a href="#" class="close" @click="closeModal" v-if="canBeClosed"></a>
                        </div>

                        <div class="dialog-content">
                            <slot></slot>
                        </div>

                        <div class="dialog-footer" v-if="hasButtons" ref="buttons" :class="{center: centerButtons !== undefined}">

                            <button :class="b.class" v-for="b in buttons" tabindex="0" @click="useButton(b)">{{ b.label }}</button>

                        </div>
                    </div>
                </div>

            </div>
        </transition>


    </div>
</template>

<script>

    export default {
        data() {
            return {
                firstTabbableElement: null,
                lastTabbableElement: null,
            }
        },
        components: {},

        methods: {
            closeModal(){
                this.$emit('dismiss');
                this.$emit('update:visible', false)
            },

            onOpening(){
                if(this.visible && this.hasButtons){
                    this.$nextTick(() => {
                        this.$refs.buttons.firstElementChild.focus();
                    });

                }
            },

            onClickOutside(){
              if(this.canBeClosed){
                  this.closeModal();
              }
            },

            findTabbableElements(){
                let elements = this.$refs.modal.querySelectorAll('input, button, select');

                for(let i = 0; i < elements.length; i++){
                    if(!elements[i].disabled){
                        this.firstTabbableElement = elements[i];
                        break;
                    }
                }

                for(let i = elements.length-1; i >= 0; i--){
                    if(!elements[i].disabled){
                        this.lastTabbableElement = elements[i];
                        break;
                    }
                }

            },

            processKeyboardEvent(e){
                if (e.ctrlKey || e.metaKey || e.altKey) {
                    return;
                }

                if (e.which === 27 && this.canBeClosed) { // ESC
                    this.closeModal();
                }else if(e.which === 9){ // TAB

                    if(this.$refs.modal.contains(e.target)) {
                        if (e.shiftKey) {
                            if (e.target === this.firstTabbableElement) {
                                e.preventDefault();
                                this.lastTabbableElement.focus();
                            }
                        } else {
                            if (e.target === this.lastTabbableElement) {
                                e.preventDefault();
                                this.firstTabbableElement.focus();
                            }
                        }
                    }else{
                        e.preventDefault();
                        this.firstTabbableElement.focus();
                    }
                }
            },

            useButton(b){
                if(this.visible) {
                    this.$emit('done', b);
                }
            }
        },

        computed: {
            hasButtons(){
                return this.buttons && this.buttons.length
            },

            canBeClosed(){
                return this.unclosable === undefined;
            }
        },

        props: ['buttons', 'visible', 'closable', 'title', 'center-buttons'],

        mounted(){
            this.findTabbableElements();
            window.addEventListener('keydown', this.processKeyboardEvent);
        },

        destroyed(){
            window.removeEventListener('keydown', this.processKeyboardEvent);
        }
    }

</script>
