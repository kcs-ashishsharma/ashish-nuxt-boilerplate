<template>
<NuxtLayout name="404">
    <div class="not-found-component">
        <div class="not-found-wrapper">
            <img src="/404-error-img.png" />
            <h1 class="opps-text">Oops! the page not found.</h1>
            <button type="submit" class="back-to-home" @click="this.$router.push('/')">Go Home</button>
        </div>
    </div>
</NuxtLayout>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.not-found-component {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-family: "Inter", sans-serif;
}
.not-found-wrapper{
  text-align: center;
}
.opps-text{
  font-size: 56px;
  font-weight: 700;
}
.back-to-home{
  background-color: #04AA6D;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  height: 47px;
  width: 106px;
  border: 1px solid white;
  font-size: "15px";
  font-weight: 500
}
</style>
