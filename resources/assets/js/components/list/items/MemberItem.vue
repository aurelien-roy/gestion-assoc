<template>
    <li class="red-sheet bordered invert small" :key="item.id" >
        <p class="single title">{{ item.firstname }} {{ item.lastname }}</p>
    </li>
</template>
<style scoped>

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
