<template>
    <li :key="item.id">
        <div class="list-thumbnail square yellow-sheet white-text colorful">P{{ item.num }}</div>
        <p><span class="title">{{ item.name }}</span></p>
        <p class="details">Todo</p>
    </li>
</template>
<style>

</style>
<script>
    
    export default {
        data() {
            return {
            }
        },

        props: ['item']
    }

</script>
