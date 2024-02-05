<template lang="">
<div class="sidebar">
    <div class="brand-logo">
        <BrandLogo />
    </div>
    <div class="menu">
        <nuxt-link to="/">Dashboard</nuxt-link>
        <nuxt-link to="about">Users</nuxt-link>
        <nuxt-link to="auth/login">Logout</nuxt-link>
        <!-- <nuxt-link to="contact">Contact</nuxt-link>
        <nuxt-link to="services">About</nuxt-link> -->
    </div>
</div>
</template>

<script>
const show = ref(false);
export default {

}
</script>

<style lang="">

</style>
