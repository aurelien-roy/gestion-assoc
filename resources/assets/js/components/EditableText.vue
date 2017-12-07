<template>
    <div ref="wrapper" class="relative editable">
        <h1 ref="h1" v-if="title" :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit($event)" v-html="htmlTypedValue"></h1>
        <p ref="p" v-else :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit($event)" v-html="htmlTypedValue"></p>
        <input v-if="type === 'number'" autocomplete="off" ref="field" type="text"
               :class="{ghost: !edit_mode, error: isError}" v-model="typedValue" @keyup.enter="doneEdit" @input="resize"
               @blur.prevent="focusOut" @focus="enterEdit($event)" :placeholder="placeholder" :maxlength="maxlength"/>
        <input v-else autocomplete="off" ref="field" type="text" :class="{ghost: !edit_mode, error: isError}"
               v-model="typedValue" @keyup.enter="doneEdit" @input="resize" @blur.prevent="focusOut"
               @focus="enterEdit($event)" :placeholder="placeholder"/>
        <ul class="suggestions absolute" v-if="edit_mode && suggests">
            <li v-for="s in displayedSuggestions" @mousedown.prevent="acceptSuggestion(s, $event)">{{ s }}</li>
        </ul>
    </div>

</template>
<style>

</style>
<script>

    import { times_5mn_interval, days } from '../helpers/enum'
    import { Time } from '../helpers/math'
    
    export default {
        data() {
            return {
                edit_mode: false,
                typedValue: '',
                objectValue: null,
                enter_edit_complete: true,
                d_suggests: false,

                fn: {
                    isValidSuggestion : null,
                    completeInput: null,
                    toObject: null,
                },

                types: {
                    default: {
                        isValidSuggestion: (s, typed) => s.toLocaleLowerCase().startsWith(typed.toLocaleLowerCase()),

                        completeInput(input, suggestions){
                            // Par défaut, si l'utilisateur quitte le champ sans avoir fini de taper,
                            // on complète avec la première valeur de la liste des suggestions

                            return suggestions.find((s) => this.isValidSuggestion(s, input));
                        },

                        toObject: (s) => s,
                        toInputString: (s) => s === null || s === undefined ? '' : s
                    },

                    number: {
                        isValidSuggestion: (s, typed) => s.startsWith(typed)
                    },

                    time: {

                        isValidSuggestion(s, typed) {
                            // Plus flexible que pour le type default.
                            // Par exemple, taper '9h' proposera les suggestions '09:00', '09:05', etc... même si toutes ces suggestions ne commencent pas par la chaine "9h".

                            let compareWithPrefixedZero = (a, b) => (a.startsWith(b) || a.startsWith('0' + b));

                            if(!typed.length) return true;

                            typed = typed.replace('h', ':').replace('H', ':');

                            let valid = compareWithPrefixedZero(s, typed);

                            if(!valid && typed.indexOf(':') === -1){
                                for(let i = 0; i < typed.length-1 && !valid; i++){
                                    valid = compareWithPrefixedZero(s, typed.substr(0, i+1) + ':' + typed.substr(i+1));
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

                        toObject(i){
                            return i.length ? new Time(i) : null;
                        },

                        toInputString(o){
                          return o === null || o === undefined ? '' : o.toInputString();
                        },

                        suggestions: times_5mn_interval
                    },

                    day: {
                        suggestions: days,

                        toObject(i){
                            return i.length ? days.indexOf(i) : null
                        },

                        toInputString(o){
                            return o === null || o === undefined ? '' : days[o];
                        }
                    }
                }
            }
        },
        components: {},
        
        methods: {
            enterEdit(e){
                if(!this.edit_mode && this.enter_edit_complete) {

                    this.edit_mode = true;
                    this.enter_edit_complete = false;

                    this.$nextTick(() => {
                        this.resize();
                        if (this.typedValue.length) {
                            this.$refs.field.select();
                        } else {
                            this.$refs.field.focus();
                        }

                        this.enter_edit_complete = true;

                    });
                }

            },

            doneEdit(){

                if(this.edit_mode) {
                    if (this.typedValue !== this.value) {

                        if (this.typedValue.length) {
                            if (this.suggests && this.matchingSuggestions.indexOf(this.typedValue) === -1) {
                                this.typedValue = this.completeInput(this.typedValue, this.matchingSuggestions);
                            }
                        }

                        this.$emit('input', this.toObject(this.typedValue));
                    }

                    this.$refs.field.blur();

                    this.edit_mode = false;
                }
            },

            resize(){
                this.$nextTick(() => {
                    let ref = this.title ? this.$refs.h1 : this.$refs.p;
                    this.$refs.field.style.width = (ref.offsetWidth) + 'px';
                    this.$refs.field.style.height = (ref.offsetHeight) + 'px';
                });
            },

            acceptSuggestion(text, event){
                this.typedValue = text;
                this.doneEdit();

                let found = false;
                let parentExplored = false;
                let next = this.$refs.wrapper;

                while (!found && next !== null) {

                    if (next.nextElementSibling === null) {
                        if(!parentExplored){
                            next = next.parentElement;
                            parentExplored = true;
                            if(next === null) break;

                        }else break;
                    }

                    next = next.nextElementSibling;

                    if(next !== null) {

                        while (next.classList.contains('editable') || next.classList.contains('contains-input')) {
                            next = next.firstElementChild;
                        }

                        if (next.tagName.toLowerCase() === 'input') {
                            found = true;
                            next.select();
                            break;
                        }
                    }
                }
            },

            focusOut(){
                this.$nextTick(() => {
                   this.doneEdit();
                });
            },

            select(){
                this.$refs.field.select();
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

            suggests: {

                get: function () {
                    let temp = this.d_suggests;
                    /*console.log(this.type);
                     if (this.type === "time")
                     temp.splice(0, 1);*/
                    return temp;
                },
                set: function (v) {
                    this.d_suggests = v;
                }
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
                s = s.filter((s) => this.isValidSuggestion(s, this.typedValue));

                return s;

            },

            isError(){
                return this.suggests && !this.matchingSuggestions.length;
            },

            isValidSuggestion(){
                return this.types[this.type].hasOwnProperty('isValidSuggestion') ? this.types[this.type].isValidSuggestion : this.types['default'].isValidSuggestion
            },

            completeInput(){
                return this.types[this.type].hasOwnProperty('completeInput') ? this.types[this.type].completeInput : this.types['default'].completeInput
            },

            toObject(){
                return this.types[this.type].hasOwnProperty('toObject') ? this.types[this.type].toObject : this.types['default'].toObject
            },

            toInputString(){
                return this.types[this.type].hasOwnProperty('toInputString') ? this.types[this.type].toInputString : this.types['default'].toInputString
            },
        },
        
        watch: {
            value(v){
                //console.log(v)
                let str = this.toInputString(v);

                if(str !== this.typedValue){
                    this.objectValue = v;
                    this.typedValue = str;
                }
            },

            typedValue(v){
                if (this.type === 'number' && !this.suggests && v.length === this.maxlength)
                    this.acceptSuggestion(v)
            }
        },
        
        beforeMount() {
            if(this.value !== null) {
                this.objectValue = this.value;
                this.typedValue = this.toInputString(this.value);
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

            nobackground: {
              type: Boolean,
              default: false
            },

            value: {},

            placeholder: {
                type: String
            },

            suggestions:{
                type: Array
            },

            type: {
                type: String,
                default: 'default'
            },

            maxlength: {
                type: Number
            }
        }
    }

</script>
