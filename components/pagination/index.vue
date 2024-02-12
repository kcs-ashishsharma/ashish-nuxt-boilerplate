
<template>
    <div>
        <h1>Pagination {{ count }}</h1>
        <button class="btn btn-primary" @click="$emit('updateCount','plus')">+ Click</button>
        <button class="btn btn-primary" @click="$emit('updateCount','minus')"> - Click</button>
    </div>
</template>
<script setup lang="ts">
interface Props {
    count: Number;    
}
    defineProps<Props>();
    defineEmits(['updateCount'])
</script>
<style lang="">

</style>