<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu :default-active="route.path" background-color="#001529" text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部内容 -->
    <div class="layout_tabber">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabbar from '@/layout/tabbar/index.vue'
import Main from '@/layout/main/index.vue'
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user';
import { useRoute } from 'vue-router'
const route = useRoute()
let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    background: #001529;
    width: 260px;
    height: 100vh;
    color: #fff;
    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabber {
    position: fixed;
    top: 0;
    left: 260px;
    width: calc(100% - 260px);
    height: 50px;
  }
  .layout_main {
    position: absolute;
    left: 260px;
    top: 50px;
    width: calc(100% - 260px);
    height: calc(100vh - 50px);
    padding: 20px;
    overflow: auto;
  }
}
</style>
