<template>
    <ol class="breadcrumb m-0">
        <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
        <li class="breadcrumb-item active">{{ pageName }}</li>
    </ol>
</template>
<script setup lang="ts">
interface Props {
    pageName: string;  
}
defineProps<Props>();

</script>
<style lang="">
    
</style>