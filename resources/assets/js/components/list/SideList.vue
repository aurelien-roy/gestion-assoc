<template>
    <div @keyup.down="selectNext($event)" @keyup.up="selectPrev($event)" tabindex="0">
        <ListHeadChoice :choices="sorts" v-model="sortBy" class="sticky" @create="replayEvent('create', $event)" @delete="replayEvent('delete', $event)"></ListHeadChoice>

        <transition-group tag="ul" name="flip-list" class="list">
            <component :is="component" v-for="i in orderedItems" :item="i" @click.native="selectItem(i, $event)" :class="[{dark: isSelected(i)}]" :key="i.virtualId"></component>
        </transition-group>

    </div>
</template>
<style>

</style>
<script>

    import ListHeadChoice from './ListHeadChoice'
    
    export default {
        data() {
            return {
                selection: [],
                sortBy: 'Nom',
            }
        },
        components: { ListHeadChoice },
        
        methods: {

            selectItem(item, e){

                if(!e.metaKey) {
                    this.selection.length = 0;
                    this.selection.push(item);
                }else{
                    if(this.isSelected(item)){
                        this.selection = this.selection.filter(s => s !== item);
                    }else{
                        this.selection.push(item);
                    }
                }

                this.$emit('input', this.selection);

            },

            selectNext(event){
                // Sélection de l'élément suivant
                if(this.selection.length !== 0){

                    // On cherche le dernier élément sélectionné
                    for(let i = this.orderedItems.length-1; i >= 0; i--){
                        if(this.selection.indexOf(this.orderedItems[i]) !== -1){
                            // Si il y a un élément après, on le sélectionne
                            if(i < this.orderedItems.length-1){
                                this.selectItem(this.orderedItems[i+1], event);
                            }
                        }
                    }
                }
            },

            selectPrev(event){
                // Sélection de l'élément précédent
                if(this.selection.length !== 0){

                    // On cherche le premier élément sélectionné
                    for(let i = 0; i < this.orderedItems.length; i++){
                        if(this.selection.indexOf(this.orderedItems[i]) !== -1){

                            // Si il y a un élément avant, on le sélectionne
                            if(i > 0){
                                this.selectItem(this.orderedItems[i-1], event);
                            }
                        }
                    }
                }

            },

            isSelected(item){
                return this.selection.indexOf(item) !== -1;
            },

            replayEvent(eventName, event){
                if(eventName === 'create'){
                    this.selection = []
                }

                this.$emit(eventName, event);
            }

        },
        
        computed: {
            orderedItems(){
                let items = this.items;

                if(items === null || items === undefined){
                    items = [];
                }
                /*if(this.search !== ''){
                    let s = this.search.toLocaleLowerCase();
                    items = items.filter(a =>
                      a.name.toLocaleLowerCase().includes(s) || a.teacher.toLocaleLowerCase().includes(s)
                    );
                }*/

                items.sort(this.sorting[this.sortBy]);

                return items;
            },

            sorts(){
                let arr = [];
                for(let s in this.sorting){
                    if(this.sorting.hasOwnProperty(s)){
                        arr.push(s);
                    }
                }

                return arr;
            }

        },

        props: {
            items: {
            },

            value: {
                type: Array
            },

            component: {
                type: String
            },

            sorting: {
                type: Object
            }
        }
    }

</script>
