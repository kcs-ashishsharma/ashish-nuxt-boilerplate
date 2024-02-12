<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="page-title-box d-flex flex-row justify-content-between">
            <PageTitle :title="`${showForm === 'edit' ? 'Edit' : 'Create'} User`" />
            <div class="page-title-right">
                <Breadcrumb :pageName="`${showForm === 'edit' ? 'Edit' : 'Create'} User`"/>
            </div>
        </div>
      </div>
    </div>
    <div class="card">
    <!-- <div class="card-header"><PageTitle :title="`${isEditPage ? 'Edit' : 'Create'} User`" /></div> -->
      <div class="card-body">
        <UsersForm :user="userList" :activeForm="showForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type  { Users } from "~/dataTypes"; 
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const userList = ref<Array<Users>>([]);
  if(route.params.user !== "create"){
    userList.value = await $fetch(`${runtimeConfig.public.API_BASE_URL}/users?id=${route.params.user}`);
  }
const showForm = userList.value.length > 0 ? 'edit' : 'add'; 
console.log(userList.value.length);

</script>
