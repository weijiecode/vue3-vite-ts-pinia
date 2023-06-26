<template>
  <div>
    <el-card class="box-card">
        <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTradeMark"
      v-has="`btn.Trademark.add`"
    >
      添加品牌
    </el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const addTradeMark = () => {
    
}
</script>

<style scoped></style>
