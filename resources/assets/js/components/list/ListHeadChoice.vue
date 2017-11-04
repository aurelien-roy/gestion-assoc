<template>
    <div>
        <div class="row list-header">

            <div class="primary btn" href="#" @click.prevent="action('create')"><i class="icon create"></i>Créer</div>
            <div class="btn" @click.prevent="action('duplicate')" title="Dupliquer"><i class="icon duplicate"></i></div>
            <div class="btn" @click.prevent="action('delete')" title="Supprimer"><i class="icon delete"></i></div>

            <div class="auto row">

                <div class="search">
                    <i class="icon search"></i>
                    <input type="text" class="h100" placeholder="Rechercher" v-model="value.search"/>
                </div>
            </div>
        </div>

        <div class="list-header secondary">
            <strong>Tri par</strong>
            <select name="sort_by" v-model="value.sortBy">
                <option v-for="c in choices" :value="c">{{ c }}</option>
            </select>
            <div class="btn-links">
                <a href="#" class="btn-link">FILTRER</a>
                <a href="#" class="btn-link">OPTIONS</a>
            </div>
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
                type: Object
            }
        }
    }

</script>
