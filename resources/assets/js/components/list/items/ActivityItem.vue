<template>
    <li :class="[item.color + '-sheet']" :key="item.id" >
        <p><span class="title">{{ item.name }}</span><span class="second">{{ item.level }}</span></p>
        <p class="details">{{ days[item.day] }} {{ item.time_begin }}h - {{ item.time_end }}h ◦ {{ item.teacher }}</p>
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
        components: {},
        
        methods: {},
        
        computed: {},
        
        watch: {},
        
        mounted() {
            
        },

        props: ['item']
    }

</script>
