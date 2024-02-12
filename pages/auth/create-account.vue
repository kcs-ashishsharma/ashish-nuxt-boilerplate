<template>
    <div class="login-wrapper">
        <div class="register-card">
            <div class="brand-logo">
                <div class="brand">
                    <img src="/nuxt-logo.png" />
                </div>
                <div class="title">Create a Nuxt Boilerplate Account</div>
                <div class="sub-title">Enter Your Basic Information</div>
            </div>
            <form autocomplete="off" @submit.prevent="submitForm">
                <div class="create-form">
                    <div class="input-field">
                        <label for="fName" class="input-label"
                            >First Name<spna class="error">*</spna></label
                        >
                        <input
                            v-model="formData.fname"
                            type="text"
                            name="fname"
                            :class="
                                $v.fname.$error ? 'error-input' : 'valid-input'
                            "
                            @change="$v.fname.$touch"
                            autocomplete="off"
                        />
                        <span class="error-message" v-if="$v.fname.$error">{{
                            $v.fname.$errors[0].$message
                        }}</span>
                    </div>
                    <div class="input-field">
                        <label for="lname" class="input-label"
                            >Last Name<spna class="error">*</spna></label
                        >
                        <input
                            v-model="formData.lname"
                            type="text"
                            name="lname"
                            :class="
                                $v.lname.$error ? 'error-input' : 'valid-input'
                            "
                            @change="$v.lname.$touch"
                            autocomplete="off"
                        />
                        <span class="error-message" v-if="$v.lname.$error">{{
                            $v.lname.$errors[0].$message
                        }}</span>
                    </div>
                    <div class="input-field">
                        <label for="username" class="input-label"
                            >Email<spna class="error">*</spna></label
                        >
                        <input
                            v-model="formData.email"
                            type="text"
                            name="email"
                            :class="
                                $v.email.$error ? 'error-input' : 'valid-input'
                            "
                            @change="$v.email.$touch"
                            autocomplete="off"
                        />
                        <span class="error-message" v-if="$v.email.$error">{{
                            $v.email.$errors[0].$message
                        }}</span>
                        <span
                            class="error-message"
                            v-if="!$v.email.$error && wrongEmailError"
                            >{{ wrongEmailError }}</span
                        >
                    </div>
                    <div class="input-field">
                        <label for="address" class="input-label">Address</label>
                        <input
                            v-model="formData.address"
                            type="text"
                            name="address"
                            autocomplete="off"
                        />
                    </div>
                    <div class="input-field">
                        <label for="gender" class="input-label">Gender</label>
                        <select
                            v-model="formData.gender"
                            type="text"
                            id="gender"
                            name="gender"
                            autocomplete="off"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="input-field">
                        <label for="age" class="input-label">Age</label>
                        <input
                            v-model="formData.age"
                            type="text"
                            name="age"
                            autocomplete="off"
                        />
                    </div>

                    <div class="input-field">
                        <label for="password" class="input-label"
                            >Password<spna class="error">*</spna></label
                        >
                        <input
                            v-model="formData.password"
                            type="password"
                            name="password"
                            :class="
                                $v.password.$error
                                    ? 'error-input'
                                    : 'valid-input'
                            "
                            @change="$v.password.$touch"
                            autocomplete="off"
                        />
                        <span class="error-message" v-if="$v.password.$error">{{
                            $v.password.$errors[0].$message
                        }}</span>
                        <span
                            class="error-message"
                            v-if="!$v.password.$error && wrongPasswordError"
                            >{{ wrongPasswordError }}</span
                        >
                    </div>
                    <div class="input-field">
                        <label for="confirmPassword" class="input-label"
                            >Confirm Password<spna class="error">*</spna></label
                        >
                        <input
                            v-model="formData.confirmPassword"
                            type="password"
                            name="confirmPassword"
                            :class="
                                $v.confirmPassword.$error
                                    ? 'error-input'
                                    : 'valid-input'
                            "
                            @change="$v.confirmPassword.$touch"
                            autocomplete="off"
                        />
                        <span
                            class="error-message"
                            v-if="$v.confirmPassword.$error"
                            >{{ $v.confirmPassword.$errors[0].$message }}</span
                        >
                    </div>
                </div>
                <div class="sign-in-cerate-account">
                    <div class="sign-button">
                        <button type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
            <span class="alredy-account">
                Already have an account ? <NuxtLink to="/auth/login">Login</NuxtLink>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import type { Users } from "~/dataTypes";
const runtimeConfig = useRuntimeConfig();
const route = useRouter();
const wrongEmailError = ref("");
const wrongPasswordError = ref("");
const formData = reactive({
    fname: "",
    lname: "",
    address: "",
    gender: "",
    age: "",
    password: "",
    email: "",
    confirmPassword: null,
});
const userList = ref<Array<Users>>([]);
const rules = computed(() => {
    return {
        fname: {
            required: helpers.withMessage("First Name is required.", required),
        },
        lname: {
            required: helpers.withMessage("Last Name is required.", required),
        },
        email: {
            required: helpers.withMessage("Email is required.", required),
            email: helpers.withMessage("Email is invalid.", email),
        },
        password: {
            required: helpers.withMessage("Password is required.", required),
        },
        confirmPassword: {
            required: helpers.withMessage(
                "Password confirmation field is required",
                required
            ),
            sameAs: helpers.withMessage(
                "Passwords don't match",
                sameAs(formData.password)
            ),
        },
    };
});
const $v = useVuelidate(rules, formData);
definePageMeta({
    layout: false,
});
const submitForm = async () => {
    $v.value.$validate();
    if ($v.value.$errors.length === 0) {
        userList.value = await $fetch(
            `${runtimeConfig.public.API_BASE_URL}/users?email=${formData.email}`
        );
        if (userList.value.length > 0) {
            wrongEmailError.value = "Email is already exists";
        } else {
            wrongEmailError.value = "";
            delete formData?.confirmPassword;
            await $fetch(`${runtimeConfig.public.API_BASE_URL}/users`, {
                method: "post",
                body: { ...formData },
            });
            route.push("/");
        }
    }
};
</script>
<style lang="scss" scoped>
.sign-in-cerate-account {
    justify-content: flex-end !important;
    margin-top: 20px;
}
.alredy-account{
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 20px;
    font-size: 20px;
    padding: 0 15px;
    a{
       font-weight: 700;
       text-decoration: none;
    }
}
.input-field{
    width: 295px;
}
</style>
