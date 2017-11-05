<template>
    <li class="gray-sheet bordered" :key="item.id" >
        <p><span class="title">{{ item.firstname }} {{ item.lastname }}</span></p>
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
        },

        props: ['item']
    }

</script>
