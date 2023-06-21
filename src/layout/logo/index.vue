<template>
  <div class="logo">
    <img src="../../../public/logo.png" alt="">
    <p>vue3+ts</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  p {
    font-size: 20px;
  }
}
</style>