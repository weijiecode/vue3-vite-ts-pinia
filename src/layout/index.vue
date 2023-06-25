<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayOutSettingStore.fold"
          :default-active="route.path"
          background-color="#001529"
          text-color="white"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部内容 -->
    <div
      class="layout_tabber"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabbar from '@/layout/tabbar/index.vue'
import Main from '@/layout/main/index.vue'
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
const LayOutSettingStore = useLayOutSettingStore()
console.log(LayOutSettingStore.fold)
const route = useRoute()
let userStore = useUserStore()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
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
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: 50px;
    }
  }
  .layout_tabber {
    position: fixed;
    top: 0;
    left: 260px;
    width: calc(100% - 260px);
    height: 50px;
    transition: all 0.3s;

    &.fold {
      left: 50px;
      width: calc(100% - 50px);
    }
  }
  .layout_main {
    position: absolute;
    left: 260px;
    top: 50px;
    width: calc(100% - 260px);
    height: calc(100vh - 50px);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: 50px;
      width: calc(100% - 50px);
    }
  }
}
</style>
