<template>
    <div>
        <EditableText v-for="(num, i) in number" :key="i" :value="num" type="number" :maxlength="2" placeholder="xx"
                      @input="numUpdated(i, $event)"></EditableText>
    </div>
</template>

<script>

    import EditableText from './EditableText'

    export default{
        data(){
            return {
                number: ['', '', '', '', '']
            }
        },

        components: {EditableText},

        props: ['value'],

        methods: {
            numUpdated(i, num){
                this.number[i] = num
                if (this.number[0] && this.number[1] && this.number[2] && this.number[3] && this.number[4])
                    this.$emit('input', this.number.join(''))
            }
        },

        watch: {
            value(newNumber){
                if (newNumber != null) {
                    this.number = newNumber.match(/.{2}/g)
                }
                else {
                    this.number = ['', '', '', '', '']
                }
                console.log("Value changed")
            }
        },

        beforeMount(){
            if (this.value != null) {
                this.number = this.value.match(/.{2}/g)
            }
        }

    }
</script>