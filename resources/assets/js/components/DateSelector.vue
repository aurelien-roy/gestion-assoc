<template>
    <div>
        <EditableText :value="getDay" type="number" :maxlength="2" placeholder="xx" :suggestions="suggestions.day"
                      @input="dayUpdated($event)"></EditableText>
        -
        <EditableText :value="getMonth" type="number" :maxlength="2" placeholder="xx" :suggestions="suggestions.month"
                      @input="monthUpdated($event)"></EditableText>
        -
        <EditableText :value="getYear" type="number" :maxlength="4" placeholder="xxxx" :suggestions="suggestions.year"
                      @input="yearUpdated($event)"></EditableText>
    </div>
</template>

<script>

    import EditableText from './EditableText'

    export default{
        data(){
            return {
                date: new Date(),
                isInvalid: {day: true, month: true, year: true},
                daySaved: 0,
                suggestions: {
                    day: this.getArray(1, 31).concat(this.getArray(1, 9, true)),
                    month: this.getArray(1, 12).concat(this.getArray(1, 9, true)),
                    year: this.getArray(new Date().getFullYear() + 3, new Date().getFullYear() - 100).concat(this.getArray(1, 99))
                }
            }
        },

        components: {EditableText},

        props: ['value'],

        methods: {

            getArray(a, b, zeroBefore = false){
                let arr = []
                if (a <= b) {
                    for (let i = a; i <= b; i++) {
                        let val = i.toString()
                        zeroBefore ? arr.push('0' + val) : arr.push(val)
                    }
                }
                else {
                    for (let i = a; i >= b; i--) {
                        let val = i.toString()
                        zeroBefore ? arr.push('0' + val) : arr.push(val)
                    }
                }
                return arr
            },

            isValidDate(y, m, d){
                let date = new Date(y, m, d)
                return date && (date.getMonth() == m)
            },

            dayUpdated(event){
                let day = parseInt(event)
                this.daySaved = 0
                if (this.isValidDate(this.date.getFullYear(), this.date.getMonth(), day)) {
                    this.date.setDate(day)
                    this.isInvalid.day = false
                    this.dateUpdated()
                }
                else if (day >= 28 && day <= 31) {
                    console.log("Jour invalide pour le mois actuel : sauvegarde")
                    this.daySaved = day
                    this.isInvalid.day = true
                }
                else {
                    console.log("Jour invalide")
                    this.isInvalid.day = true
                }
            },

            monthUpdated(event){
                let month = parseInt(event) - 1
                //Si un jour était invalide pour le mois précédent
                if (this.daySaved != 0 && this.isValidDate(this.date.getFullYear(), month, this.daySaved)) {
                    this.date.setMonth(month)
                    this.date.setData(this.daySaved)
                    this.daySaved = 0
                    this.isInvalid.month = false
                    this.isInvalid.day = false
                    this.dateUpdated()
                }
                else if (this.daySaved == 0 && this.isValidDate(this.date.getFullYear(), month, this.date.getDate())) {
                    this.date.setMonth(month)
                    this.isInvalid.month = false
                    this.dateUpdated()
                }
                else {
                    console.log("Mois invalide")
                    this.isInvalid.month = true
                }
            },

            yearUpdated(event){
                let year = parseInt(event)
                if (year <= new Date().getFullYear() - 2000)
                    year += 2000
                else if (year <= 99)
                    year += 1900

                if (this.isValidDate(year, this.date.getMonth(), this.date.getDate())) {
                    this.date.setFullYear(year)
                    this.isInvalid.year = false
                    this.dateUpdated()
                }
                else {
                    console.log("Année invalide")
                    this.isInvalid.year = true
                }
            },

            dateUpdated(){
                if (!this.isInvalid.day && !this.isInvalid.month && !this.isInvalid.year) {
                    this.$emit('input', this.date)
                }
            }
        },

        computed: {
            getDay(){
                let day = this.date.getDate().toString()
                return this.isInvalid.day ? "" : (day.length === 1) ? '0' + day : day
            },

            getMonth(){
                let month = (this.date.getMonth() + 1).toString()
                return this.isInvalid.month ? "" : (month.length === 1) ? '0' + month : month
            },

            getYear(){
                return this.isInvalid.year ? "" : this.date.getFullYear().toString()
            }
        },

        watch: {
            value(newDate){
                if (newDate != null) {
                    this.date = newDate
                    this.isInvalid = {day: false, month: false, year: false}
                }
                else
                    this.isInvalid = {day: true, month: true, year: true}

                this.daySaved = 0
                console.log("Value changed")
            }
        },

        beforeMount(){
            if (this.value != null) {
                this.date = this.value
                this.isInvalid = {day: false, month: false, year: false}
            }
        }

    }
</script>