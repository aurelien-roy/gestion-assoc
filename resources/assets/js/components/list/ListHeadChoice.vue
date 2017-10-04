<template>
    <div class="row list-header">

        <div class="primary btn" href="#" @click.prevent="action('create')"><i class="icon create"></i>Créer</div>
        <div class="btn" @click.prevent="action('duplicate')" title="Dupliquer"><i class="icon duplicate"></i></div>
        <div class="btn" @click.prevent="action('delete')" title="Supprimer"><i class="icon delete"></i></div>

        <div class="auto separator row">

            <div class="list-header-label"><i class="icon sort-by"></i><p>Tri</p></div>
            <p class="types auto">
                <a v-for="c in choices" href="#" @click.prevent="choose(c)" :class="{selected: value === c}" :title="'Trier par ' + c">{{ c }}</a>
            </p>
        </div>
    </div>
</template>

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
            },

            action(actionName){
                this.$emit(actionName);
            }
        },
        
        computed: {},
        
        watch: {},
        
        mounted() {},

        props: {
            choices: {
                type: Array
            },

            value: {
                type: String
            }
        }
    }

</script>
