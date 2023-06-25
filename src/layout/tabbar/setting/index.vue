<template>
  <el-button size="small" icon="Refresh" circle @click="toRefsh"></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const LayOutSettingStore = useLayOutSettingStore()
const toRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = () => {
  userStore.userLogout()
  router.push({
    path: '/login',
    query: {
      redirect: route.path
    }
  })
}
</script>

<style scoped></style>
