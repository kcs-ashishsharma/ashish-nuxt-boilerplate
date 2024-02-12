<template>
    <div class="card-wrapper">
        <div class="custom-card users-card">
        <form autocomplete="off" @submit.prevent="submitForm">
            <div class="create-form">
                <div class="input-field">
                    <label for="fName" class="input-label">
                        First Name<spna class="error">*</spna>
                    </label>
                    <input
                        v-model="formData.fname"
                        type="text"
                        name="fname"
                        :class="$v.fname.$error ? 'error-input' : 'valid-input'"
                        @change="$v.fname.$touch"
                        autocomplete="off"
                    />
                    <span class="error-message" v-if="$v.fname.$error">{{$v.fname.$errors[0].$message}}</span>
                </div>
                <div class="input-field">
                    <label for="lname" class="input-label">Last Name<spna class="error">*</spna></label>
                    <input
                        v-model="formData.lname"
                        type="text"
                        name="lname"
                        :class="$v.lname.$error ? 'error-input' : 'valid-input'"
                        @change="$v.lname.$touch"
                        autocomplete="off"
                    />
                    <span class="error-message" v-if="$v.lname.$error">{{$v.lname.$errors[0].$message}}</span>
                </div>
                <div class="input-field">
                    <label for="username" class="input-label">Email<spna class="error">*</spna>
                    </label>
                    <input
                        v-model="formData.email"
                        type="text"
                        name="email"
                        :class="$v.email.$error ? 'error-input' : 'valid-input'"
                        @change="$v.email.$touch"
                        autocomplete="off"
                        :readonly="isEditPage"
                        :disabled="isEditPage"
                    />
                    <span class="error-message" v-if="$v.email.$error">{{$v.email.$errors[0].$message}}</span>
                    <span class="error-message" v-if="!$v.email.$error && wrongEmailError">
                        {{ wrongEmailError }}
                    </span>
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
            </div>
            <div class="sign-up-cerate-account">
                <div class="custom_button_warpper">
                    <NuxtLink to="/users" class="btn btn-dark custom_button_link">Back to list</NuxtLink>
                </div>
                <div class="submit">
                    <button class="btn btn-success custom_button" type="submit">Submit</button>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import type { Users } from "~/dataTypes";
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const route = useRoute()
const wrongEmailError = ref("");
interface Props {
  user?: any,
  activeForm: string
}
const props = defineProps<Props>();
const user = computed(() => {
  return props.user[0]
});

const isEditPage = props.activeForm === "edit";

const formData = reactive({
    fname: isEditPage ? user.value?.fname : "",
    lname: isEditPage ? user.value?.lname : "",
    address: isEditPage ? user.value?.address : "",
    gender: isEditPage ? user.value?.gender : "" ,
    age: isEditPage ? user.value?.age : "",
    email: isEditPage ? user.value?.email : "",
    password: isEditPage ? user.value?.password : "admin"
});
const userList = ref<Array<Users>>([]);
const URL = isEditPage ?  `/${route.params.user}` : ''; 
const method = isEditPage ?  `put` : 'post';   
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
        if (userList.value.length > 0 && !isEditPage) {
            wrongEmailError.value = "Email is already exists";
        } else {
            wrongEmailError.value = "";
            await $fetch(`${runtimeConfig.public.API_BASE_URL}/users${URL}`, {
                method,
                body: { ...formData },
            });
            router.push("/users");
        }
    }
};
</script>
<style lag="scss" scoped>
.input-field{
    flex: 1 0 500px; 
}
.page-title{
    padding: 10px;
}
</style>

