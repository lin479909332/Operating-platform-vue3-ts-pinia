<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来带甄选管理平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
// 引入用户仓库
import useUserStore from '@/store/modules/user'
// 引入路由
import { useRouter } from 'vue-router'
// 引入获取时间的函数
import { getTime } from '@/utils/time'
let useStore = useUserStore()
// 获取整个表单组件
const loginForms = ref()
// 收集账号密码
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 按钮的加载效果
let loading = ref(false)
// 创建路由器
let $router = useRouter()
// 登录按钮
const login = async () => {
  //保证全部表单相校验通过再发请求
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}
// 用户名校验
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 20) {
    callback()
  } else {
    callback(new Error('用户名需在5-20位之间'))
    console.log(rule)
  }
}
// 密码校验
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 20) {
    callback()
  } else {
    callback(new Error('密码需在6-20位之间'))
    console.log(rule)
  }
}
// 校验规则
const rules = {
  username: [
    // {
    //   required: true,
    //   min: 5,
    //   max: 20,
    //   message: '用户名需在5-20位之间',
    //   trigger: 'change',
    // },
    { validator: validatorUserName, trigger: 'change' },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 20,
    //   message: '密码需在6-20位之间',
    //   trigger: 'change',
    // },
    { validator: validatorPassword, trigger: 'change' },
  ],
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 60px;

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
