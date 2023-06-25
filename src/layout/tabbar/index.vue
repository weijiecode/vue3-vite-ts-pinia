<template>
  <div class="tabbar">
    <div class="toolbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="toolbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    white,
    rgb(238, 238, 238),
    rgb(255, 255, 255)
  );
  .toolbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .toolbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
