<script setup lang="ts">
const userList = ref<any>([]);
const route = useRouter();
const isLoading = ref<boolean>(true);
const runtimeConfig = useRuntimeConfig();
const deleteUser = async (id:Number) => {
    isLoading.value = false;
    if (confirm("Confirm to Delete Record!")) {
        await $fetch(`${runtimeConfig.public.API_BASE_URL}/users/${id}`,{method: "delete"}).then(() => {
            // const index = userList.value.findIndex(row => row.id === id);
            // if (index !== -1) {
            //     userList.value.splice(index, 1);
            // }
            return getUsers();
        });
    } 
};

const getUsers = async () =>{
    await $fetch(`${runtimeConfig.public.API_BASE_URL}/users`).then((result) => {
        isLoading.value = false; 
        userList.value = result;
    });
}


onBeforeMount(async() => {
  await getUsers();
  new DataTable('#myTable',{
    responsive: true,
    columnDefs: [
        { targets: [0, 7, 8], orderable: false, searchable: false }, // Disable sorting for the third column (index 2)
        { width: "5%", targets: [0, 7, 8] }
    ]
  });
});

const redirectAddUser = () => {
    route.push('/users/create');
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex flex-row justify-content-between">
                    <PageTitle :title="'Users'" />
                    <div class="page-title-right">
                       <Breadcrumb :pageName="'User'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="card-title">
                    <div class="row">
                        <div class="col-12">
                            <button class="add-new-user float-end" @click="redirectAddUser">Add New User</button>
                        </div>
                    </div>
                </div>
                <div class="row table-responsive">
                    <div class="col-12">
                        <div v-if="isLoading" class="loading">
                            <h1>loading</h1>
                        </div>
                        <div class="dataTable" v-else>
                        <UsersTableStructure 
                        :userList="userList" 
                        @deleteUser="deleteUser" />
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>


<style lang="scss" scoped>
.title-user-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.add-new-user {
    height: 45px;
    background-color: $button;
    border: 1px solid $border;
    border-radius: 5px;
    width: 150px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
}
</style>
