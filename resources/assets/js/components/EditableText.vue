<template>
    <div ref="wrapper" class="relative editable">
        <h1 ref="h1" v-if="title" :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit" v-html="htmlTypedValue"></h1>
        <p ref="p" v-else :class="{ ghost: edit_mode, placeholder: empty, error: isError }" @click="enterEdit" v-html="htmlTypedValue"></p>
        <input autocomplete="off" ref="field" type="text" :class="{ghost: !edit_mode, error: isError}" v-model="typedValue" @keyup.enter="doneEdit" @input="resize" @blur.prevent="focusOut" @focus="enterEdit" :placeholder="placeholder" />
        <ul class="suggestions absolute" v-if="edit_mode && suggestions">
            <li v-for="s in displayedSuggestions" @mousedown="acceptSuggestion(s)">{{ s }}</li>
        </ul>
    </div>

</template>
<style>

</style>
<script>
    
    export default {
        data() {
            return {
                edit_mode: false,
                typedValue: '',
                enter_edit_complete: false,
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
                this.$emit('input', this.typedValue);
                this.edit_mode = false;
            },

            resize(){
                this.$nextTick(() => {
                    let ref = this.title ? this.$refs.h1 : this.$refs.p;
                    this.$refs.field.style.width = (ref.offsetWidth + 2) + 'px';
                });
            },

            acceptSuggestion(text){
                this.typedValue = text;
                this.$refs.field.blur();
                this.doneEdit();
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
                if(!this.suggestions) return [];

                let s;

                if(this.enter_edit_complete && this.edit_mode && (this.$refs.field.selectionStart !== 0 || this.$refs.field.selectionEnd !== this.typedValue.length)) {
                    s = this.matchingSuggestions;
                }else{
                    s = this.suggestions;
                }

                if(s.length === 1){
                    this.acceptSuggestion(s[0]);
                }

                return s;
            },

            matchingSuggestions(){
                if(!this.suggestions) return [];

                let s = this.suggestions;

                s = s.filter((s) => {
                    return s.toLocaleLowerCase().startsWith(this.typedValue.toLocaleLowerCase())
                });

                return s;

            },

            isError(){
                return this.suggestions && !this.matchingSuggestions.length;
            }
        },
        
        watch: {},
        
        mounted() {
            if(this.value) {
                this.typedValue = this.value;
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
            }
        }
    }

</script>
