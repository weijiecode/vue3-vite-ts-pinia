<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTradeMark"
      >
        添加品牌
      </el-button>
      <el-table style="margin: 10px 0" border :data="tradeMarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img
              :src="row.logoUrl"
              alt="图片丢失了~"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定删除${row.tmName}`"
              width="250px"
              icon="delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasTradeMark"
        @size-change="sizeChange"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="添加">
      <el-form :model="trademarkParams" style="width: 80%">
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="confirm">新增</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type {
  Records,
  TrademarkResponseData,
  Trademark,
} from '@/api/product/tradmark/type'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
} from '@/api/product/tradmark'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

let pageNum = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let tradeMarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage({
        type: 'error',
        message: '图片大小于4M',
      })
      return false
    } else {
      return true
    }
  } else {
    ElMessage({
      type: 'error',
      message: '图片只能jpg\png\gif的格式!',
    })
    return false
  }
}

const removeTradeMark = async (id: any) => {
  let res = await reqDeleteTrademark(id)
  console.log(res)
  if(res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasTradeMark(tradeMarkArr.value.length>1?pageNum.value:pageNum.value-1)
  }
}

const addTradeMark = () => {
  dialogFormVisible.value = true
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0
}

const sizeChange = () => {
  getHasTradeMark()
}

const confirm = async () => {
  console.log(trademarkParams)
  const result: any = await reqAddOrUpdateTrademark(trademarkParams)
  console.log(result)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '添加品牌成功',
    })
    getHasTradeMark(trademarkParams.id?pageNum.value:1)
  } else {
    ElMessage({
      type: 'error',
      message: '添加品牌失败',
    })
  }
}

const updateTradeMark = (item: Trademark) => {
  dialogFormVisible.value = true
  Object.assign(trademarkParams, item)
  // trademarkParams.logoUrl = item.logoUrl
  // trademarkParams.tmName = item.tmName
  // trademarkParams.id = item.id
}

const getHasTradeMark = async (pager = 1) => {
  pageNum.value = pager
  let res: TrademarkResponseData = await reqHasTrademark(
    pageNum.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    tradeMarkArr.value = res.data.records
  }
}
onMounted(() => {
  getHasTradeMark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
