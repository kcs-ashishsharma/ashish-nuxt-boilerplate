<template>
<div class="login-wrapper">
    <div class="login-card">
        <div class="brand-logo">
            <img src="/nuxt-logo.png">
            Nuxt Boilerplate
        </div>
        <div class="username-field">
            <label for="username">Username</label>
            <input type="text" name="username" placeholder="" />
        </div>

        <div class="password-field">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="" />
        </div>
        <div class="remeber-forgot-pass-wrapper">
            <div class="remeber-this-device">
                <input type="checkbox" id="remeber-this-device" name="remeber-this-device">
                <label for="remeber-this-device">Remeber this Device</label>
           </div>
            <div class="forgot-password">
               Forgot Password ?
            </div>
        </div>
        <div class="sign-button">
            <button type="submit" @click="this.$router.push('/')">Sign In</button>
        </div>
        <!-- <div class="new-modernize-create-new-account">
            New to Rysun <a>Create an account</a>
        </div> -->

    </div>
</div>
</template>

<script setup>

definePageMeta({
    layout: false,
});
</script>

<style>

</style>
