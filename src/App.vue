<template>
  <div class="box">
    <el-button type="primary" :icon="Plus">测试</el-button>
    <button @click="state.count++">count{{ state.count }}</button>
    <!-- <el-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <!-- <svg>
      <use xlink:href="#icon-phone" fill="yellow"></use>
    </svg> -->
    <svg-icon name="phone" fill="#efefef" width="50px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { reactive, watch, onMounted } from 'vue'
import request from '@/utils/request'
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456',
    },
  }).then((res) => {
    console.log(res)
  })
})
console.log(import.meta.env)
var a = 100
console.log(a)
const state = reactive({
  count: 0,
})
watch(
  () => state.count,
  (count, countPre) => {
    console.log(count, countPre)
  },
)
</script>

<style scoped lang="scss">
.box {
  background-color: blue;
}
</style>
