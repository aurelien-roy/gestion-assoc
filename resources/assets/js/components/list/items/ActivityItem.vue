<template>
    <li :class="[item.color + '-sheet']" class="bordered invert" :key="item.id" >
        <p><span class="title">{{ item.name }}</span><span class="second">{{ item.level }}</span></p>
        <p class="details">{{ date }} ◦ {{ item.teacher }}</p>
    </li>
</template>
<style>

</style>
<script>

    import { days } from '../../../helpers/enum'
    
    export default {
        data() {
            return {
                days: days
            }
        },

        computed: {

            date(){
                let date = "";
                //Une seule date : affichage plus long
                if (this.item.schedules.length === 1) {
                    date += days[this.item.schedules[0].day] + " à ";
                    date += this.item.schedules[0].time_begin.toString();
                }
                // Plusieurs dates : affichage court
                else if (this.item.schedules.length > 1) {
                    let daysTab = [];
                    for (let i = 0; i < this.item.schedules.length; i++) {
                        if (daysTab[daysTab.length - 1] != this.item.schedules[i].day)
                            daysTab.push(this.item.schedules[i].day)
                    }

                    for (let i = 0; i < daysTab.length - 1; i++)
                        date += days[daysTab[i]] + " et ";
                    date += days[daysTab[daysTab.length - 1]];
                }

                return date;
            },

            /*time(){
                let s = '';
                if(this.item.time_begin){
                    s += ' ' + this.item.time_begin.toString();

                    if(this.item.time_end){
                        s += ' - ' + this.item.time_end.toString();
                    }
                }

                return s;
             }*/
        },

        props: ['item']
    }

</script>
