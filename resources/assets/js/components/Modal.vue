<template>

    <Dialog @done="transmit('done', $event)" @dismiss="transmit('dismiss', $event)" :visible="visible" @update:visible="updateVisible" :buttons="buttons" center-buttons>
        <div class="modal-body" :class="{'with-icon': icon}">
            <div class="modal-icon" v-if="icon"><i class="icon" :class="icon"></i></div>
            <div class="modal-title">{{ title }}</div>
            <div class="modal-subtitle" v-if="message">{{ message }}</div>
        </div>
    </Dialog>

</template>

<script>
    
    export default {
        data() {
            return {
            }
        },
        components: {},
        
        methods: {

            transmit(eventName, event){
                this.$emit(eventName, event);
            },

            updateVisible(v){
                this.$emit('update:visible', v);
            }
        },
        props: ['title', 'message', 'buttons', 'visible', 'icon']
    }

</script>
