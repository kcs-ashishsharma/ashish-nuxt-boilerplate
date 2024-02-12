<template>
<div class="sidebar">
    <div class="brand-logo">
        <BrandLogo />
    </div>
    <div class="menu">
        <nuxt-link to="/" :class="{ active: isLinkActive('index') }">Dashboard</nuxt-link>
        <nuxt-link to="/users" :class="{ active: isLinkActive('users') }">Users</nuxt-link>
        <nuxt-link to="auth/login" :class="{ active: isLinkActive('/logout') }" @click="logout">Logout</nuxt-link>
    </div>
</div>
</template>

<script setup>
import { AuthCookie } from "~/lib/auth";
const cookie = useCookie(AuthCookie);
const route = useRoute();
console.log(route.name);
const isLinkActive = (link) => {
    return route.name.includes(link);
}

const logout = () => {
    cookie.value = "";
    navigateTo("/auth/login");
};
</script>

<style lang="scss" scoped>
.user-profile{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 8px;
}
.avatar {
  vertical-align: middle;
  width: 100%;
  height: 150px;
  object-fit:contain;
}
</style>
