<template>
    <div ref="wrapper" class="relative editable">
        <h1 ref="h1" v-if="title" :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit" v-html="htmlTypedValue"></h1>
        <p ref="p" v-else :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit" v-html="htmlTypedValue"></p>
        <input autocomplete="off" ref="field" type="text" :class="{ghost: !edit_mode, error: isError}" v-model="typedValue" @keyup.enter="doneEdit" @input="resize" @blur.prevent="focusOut" @focus="enterEdit" :placeholder="placeholder" />
        <ul class="suggestions absolute" v-if="edit_mode && suggests">
            <li v-for="s in displayedSuggestions" @mousedown.prevent="acceptSuggestion(s, $event)">{{ s }}</li>
        </ul>
    </div>

</template>
<style>

</style>
<script>

    import { times_5mn_interval } from '../helpers/enum'
    
    export default {
        data() {
            return {
                edit_mode: false,
                typedValue: '',
                enter_edit_complete: false,
                suggests: false,

                types: {
                    default: {
                        isValidSuggestion: (s, typed) => s.toLocaleLowerCase().startsWith(typed.toLocaleLowerCase()),

                        completeInput(input, suggestions){
                            // Par défaut, si l'utilisateur quitte le champ sans avoir fini de taper,
                            // on complète avec la première valeur de la liste des suggestions

                            return suggestions.find((s) => this.isValidSuggestion(s, input));
                        }
                    },

                    time: {

                        compareWithPrefixedZero: (a, b) => (a.startsWith(b) || a.startsWith('0' + b)),

                        isValidSuggestion(s, typed) {
                            // Plus flexible que pour le type default.
                            // Par exemple, taper '9h' proposera les suggestions '09:00', '09:05', etc... même si toutes ces suggestions ne commencent pas par la chaine "9h".

                            if(!typed.length) return true;

                            typed = typed.replace('h', ':').replace('H', ':');

                            let valid = this.compareWithPrefixedZero(s, typed);

                            if(!valid && typed.indexOf(':') === -1){
                                for(let i = 0; i < typed.length-1 && !valid; i++){
                                    valid = this.compareWithPrefixedZero(s, typed.substr(0, i+1) + ':' + typed.substr(i+1));
                                }
                            }

                            return valid;
                        },

                        completeInput(input, suggestions){
                            // Exactement comme le profil défaut sauf :
                            // Si on tape un entier, coplète par l'heure qui tombe pile.

                            if(/^\d{1,2}$/.exec(input)){
                                return (input.length === 1 ? '0' : '') + input + ':00';
                            }else{
                                return suggestions.find((s) => this.isValidSuggestion(s, input));
                            }
                        },

                        suggestions: times_5mn_interval
                    },
                }
            }
        },
        components: {},
        
        methods: {
            enterEdit(){
                this.edit_mode = true;
                this.enter_edit_complete = false;

                this.$nextTick(() => {
                    this.resize();
                    if(this.typedValue.length) {
                        this.$refs.field.select();
                    }else{
                        this.$refs.field.focus();
                    }

                    this.enter_edit_complete = true;

                });

            },

            doneEdit(){
                if(this.typedValue !== this.value) {

                    if(this.typedValue.length) {
                        this.typedValue = this.types[this.type].completeInput(this.typedValue, this.matchingSuggestions);
                    }

                    this.$emit('input', this.typedValue);
                }

                this.$refs.field.blur();

                this.edit_mode = false;
            },

            resize(){
                this.$nextTick(() => {
                    let ref = this.title ? this.$refs.h1 : this.$refs.p;
                    this.$refs.field.style.width = (ref.offsetWidth + 2) + 'px';
                });
            },

            acceptSuggestion(text, event){
                this.typedValue = text;
                this.doneEdit();

                let next = this.$refs.wrapper;

                while (next = next.nextElementSibling) {
                    if (next === null)
                        break;

                    if(next.classList.contains('editable')){
                        next = next.firstChild;
                    }

                    if (next.tagName.toLowerCase() === 'input') {
                        console.log('found');
                        console.log(next);
                        next.select();
                        break;
                    }
                }
            },

            focusOut(){
                this.$nextTick(() => {
                   this.doneEdit();
                });
            }
        },
        
        computed: {
            htmlTypedValue(){
                let ph = this.placeholder;
                if(!this.empty) {
                    return this.typedValue.replace(/\s/g, '&nbsp;');
                }else{
                    return ph;
                }
            },

            empty(){
                return this.typedValue.length === 0;
            },

            displayedSuggestions(){
                if(!this.suggests) return [];

                let s;

                if(this.enter_edit_complete && this.edit_mode && (this.$refs.field.selectionStart !== 0 || this.$refs.field.selectionEnd !== this.typedValue.length)) {
                    s = this.matchingSuggestions;
                }else{
                    s = this.suggests;
                }

                if(s.length === 1){
                    this.acceptSuggestion(s[0]);
                }

                return s;
            },

            matchingSuggestions(){
                if(!this.suggests) return [];

                let s = this.suggests;


                s = s.filter((s) => {
                    return this.types[this.type].isValidSuggestion(s, this.typedValue)
                });

                return s;

            },

            isError(){
                return this.suggests && !this.matchingSuggestions.length;
            }
        },
        
        watch: {
            value(v){
                this.typedValue = v;
            }
        },
        
        beforeMount() {
            if(this.value) {
                this.typedValue = this.value;
            }

            if(this.suggestions){
                this.suggests = this.suggestions;
            }else if(this.types[this.type].hasOwnProperty('suggestions')){
                this.suggests = this.types[this.type].suggestions;
            }
        },

        props: {
            title: {
                type: Boolean,
                default: false
            },

            value: {
                type: String
            },

            placeholder: {
                type: String
            },

            suggestions:{
                type: Array
            },

            type: {
                type: String,
                default: 'default'
            }
        }
    }

</script>
