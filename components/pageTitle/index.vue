<template lang="">
   <h4 class="page-title">{{title}}</h4>  
</template>
<script setup lang="ts">
interface Props{
    title: string;
}
defineProps<Props>();
</script>
<style lang="scss" scoped>

</style>