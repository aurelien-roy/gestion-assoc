<template>
    <div class="row sort-by list-header">
        <p class="title">{{ title }} :</p>
        <p class="types auto">
            <a v-for="c in choices" href="#" @click.prevent="choose(c)" :class="{selected: value === c}">{{ c }}</a>
        </p>
    </div>
</template>
<style lang="scss">

    .sort-by{
        height: 36px;
        padding: 0px 16px;
        font-size: 0.875rem;
        line-height: 36px;
        display: flex;

        background: rgba(234, 234, 234, 0.95);

        p{
            display: inline-block;

            &.title{
                 padding-right: 16px;
            }

            &.types{
                 text-align: right;
                 font-family: 'Lato', sans-serif;
                 font-weight: 300;
                 font-size: 1rem;

                a{
                    margin-left: 25px;

                    &.selected{
                         font-weight: 700;
                    }
                }
            }
        }
    }


</style>
<script>
    
    export default {
        data() {
            return {
            }
        },
        components: {},
        
        methods: {
            choose(c){
                this.$emit('input', c);
            }
        },
        
        computed: {},
        
        watch: {},
        
        mounted() {},

        props: {
            title: {
                type: String
            },

            choices: {
                type: Array
            },

            value: {
                type: String
            }
        }
    }

</script>
