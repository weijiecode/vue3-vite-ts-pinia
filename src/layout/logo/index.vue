<template>
  <div class="logo">
    <img src="../../../public/logo.png" alt="">
    <p>vue3+ts</p>
  </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'Logo'
}
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
    width: 30px;
    height: 30px;
    margin-left: -10px;
    border-radius: 10px;
  }
  p {
    font-size: 20px;
  }
}
</style>