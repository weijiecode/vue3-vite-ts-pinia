<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="ruleFormRef" class="login_form" :model="loginForm" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎使用</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              show-password
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
              prop="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              @click="login(ruleFormRef)"
              type="primary"
              size="default"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessage } from 'element-plus'
import { getTime } from '@/utils/time'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

let router = useRouter()
let useStore = useUserStore()
let loading = ref(false)

let loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    {
      min: 5,
      max: 10,
      message: '账号长度为 6 至 10',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 10,
      message: '密码长度为 6 至 15',
      trigger: 'change',
    },
  ],
})

let login = async (formEl: FormInstance | undefined) => {
    console.log(formEl)
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        await useStore.userLogin(loginForm)
        loading.value = false
        router.push('/')
        ElNotification({
          type: 'success',
          message: '欢迎回来',
          title: `HI,${getTime()}好`,
        })
      } catch (error) {
        loading.value = false
        ElMessage({
          type: 'error',
          message: (error as Error).message,
        })
      }
    } else {
      console.log('error!')
    }
  })
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: #fff;
    font-size: 40px;
  }
  h2 {
    color: #fff;
    font-size: 20px;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
