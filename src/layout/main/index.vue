<template>
  <!-- <Transition name="bounce">
    <router-view></router-view>
  </Transition> -->
  <router-view v-slot="{ Component }">
    <transition name="bounce">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
const LayOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
//监听仓库内部的刷新是否发生变化
watch(
  () => LayOutSettingStore.refsh,
  () => {
    console.log('refrsh')
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
