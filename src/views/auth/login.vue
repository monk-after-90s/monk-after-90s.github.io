<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import Api from "../../api"
import {ElMessage} from 'element-plus'
import router from "../../router"
import {useJWT} from "../../pinia-store"

let jwtStore = useJWT()
const ruleFormRef = ref<FormInstance>()
let submitDisabled = ref(false)

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    submitDisabled.value = true
    callback(new Error('请输入密码'))
  } else {
    submitDisabled.value = false
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  password: [{validator: validatePass, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      Api.auth.login(ruleForm).then(res => {
        if (res.status === 200 && res.data.code === 701) {
          ElMessage({
            message: res.data.error,
            type: 'error',
          })
        } else if (res.status === 200 && res.data.code === 700) {
          //存储token
          jwtStore.setJWT(res.data.data)
          ElMessage({
            message: "登陆成功",
            type: 'success',
          })
          router.push({name: 'Layout'})
        }
      })
    } else {
      return false
    }
  })
}


</script>
<template>
  <div class="from-wrapper">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        style="margin-top: 25vh"
    >
      <el-form-item label="用户名:">
        <el-input v-model="ruleForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="submitDisabled">登陆
        </el-button>
        <router-link :to="{name:'Signup'}" style="margin-left: 50px">
          <el-button type="primary">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.from-wrapper {
  display: flex;
  justify-content: center;
  align-items: center
}
</style>