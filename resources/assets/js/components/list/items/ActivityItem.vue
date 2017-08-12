<template>
    <li :class="[item.color + '-sheet']" :key="item.id" >
        <p><span class="title">{{ item.name }}</span><span class="second">{{ item.level }}</span></p>
        <p class="details">{{ days[item.day] }}{{ time }} ◦ {{ item.teacher }}</p>
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
            time(){
                let s = '';
                if(this.item.time_begin){
                    s += ' ' + this.item.time_begin.toString();

                    if(this.item.time_end){
                        s += ' - ' + this.item.time_end.toString();
                    }
                }

                return s;
            }
        },

        props: ['item']
    }

</script>
