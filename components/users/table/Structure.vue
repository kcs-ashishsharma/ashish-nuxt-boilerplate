
<script setup lang="ts">
interface Props {
    userList: Array<any>;  
}
defineProps<Props>();
defineEmits(['deleteUser'])
</script>

<template>
    <table class="table table-bordered display" id="myTable">
        <thead>
        <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th class="age">Age</th>
            <th class="action">Edit</th>
            <th class="action">Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in userList" :key="index" :row="item">
            <td>
                <img src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg"/>
            </td>
            <td>{{item.fname}}</td>
            <td>{{item.lname}}</td>
            <td>{{item.email}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.address}}</td>
            <td class="age">{{item.age}}</td>
            <td class="action">
                <button type="button" class="edit btn btn-success" @click="this.$router.push(`users/${item.id}`)">Edit</button>
            </td>
            <td class="action">
                <button class="btn btn-danger" @click="$emit('deleteUser', item.id)">Delete</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>


<style lang="css" scoped>
.container {
    width: 100%;
}
img{
    height: 60px;
    
}
</style>
