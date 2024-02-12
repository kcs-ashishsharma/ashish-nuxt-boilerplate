<script lang="ts" setup>
import {
    useVuelidate
} from '@vuelidate/core';
import {
    required,
    email,
    helpers
} from '@vuelidate/validators';
import { encodeJwt, AuthCookie } from "~/lib/auth";
import type  { Users } from "~/dataTypes";    
const runtimeConfig = useRuntimeConfig();
const route = useRouter();
const wrongEmailError = ref('');
const wrongPasswordError = ref('');
const setCookie = useCookie(AuthCookie);
const formData = reactive({
    password: '',
    email: '',
});
const userList = ref<Array<Users>>([]);
const rules = {
    password: {
        required: helpers.withMessage("Password is required.", required)
    },
    email: {
        required: helpers.withMessage("Email is required.", required),
        email: helpers.withMessage("Email is invalid.", email)
    },
}
const $v = useVuelidate(rules, formData);

const submitForm = async () => {
    if ($v.value.$errors.length === 0) {
        userList.value = await $fetch(`${runtimeConfig.public.API_BASE_URL}/users?email=${formData.email}`);
        if (userList.value.length > 0) {
            wrongEmailError.value = "";
            if (userList?.value[0].password !== formData.password) {
                wrongPasswordError.value = "Wrong password. Try again or click Forgot password to reset it.";
            }else {
                setCookie.value = await encodeJwt({ ...userList.value }, "123456789", "1d");
                route.push('/');
             }
        }else{
            wrongEmailError.value = "Couldn’t find your account";
        }
    }
};
</script>
<template>
    <div class="login-wrapper">
    <div class="login-card">
        <div class="brand-logo">
            <div class="brand">
                <img src="/nuxt-logo.png">
            </div>
            <div class="title">Sign in</div>
            <div class="sub-title">
                to continue to Nuxt Boilerplate
            </div>
        </div>
        <form @submit.prevent="submitForm">
            <div class="username-field">
                <label for="username" class="input-label">Email<spna class="error">*</spna></label>
                <input v-model="formData.email" type="text" name="email" :class="$v.email.$error ? 'error-input' : 'valid-input'" @change="$v.email.$touch" autocomplete="off" />
                <span class="error-message" v-if="$v.email.$error">{{ $v.email.$errors[0].$message }}</span>
                <span class="error-message" v-if="!$v.email.$error && wrongEmailError">{{ wrongEmailError }}</span>
            </div>

            <div class="password-field">
                <label for="password" class="input-label">Password<spna class="error">*</spna></label>
                <input v-model="formData.password" type="password" name="password" :class="$v.password.$error ? 'error-input' : 'valid-input'" @change="$v.password.$touch" autocomplete="off"/>
                <span class="error-message" v-if="$v.password.$error">{{ $v.password.$errors[0].$message }}</span>
                <span class="error-message" v-if="!$v.password.$error && wrongPasswordError">{{ wrongPasswordError }}</span>
            </div>
        
            <div class="sign-in-cerate-account">
                 <div class="remeber-forgot-pass-wrapper">
                    <div class="forgot-password">
                       <nuxt-link to="/auth/forgot-password">Forgot Password?</nuxt-link> 
                    </div>
                </div>
                
                <div class="sign-button">
                    <button type="submit">Sign In</button>
                </div>
            </div>   
        </form>
    </div>
</div>
</template>