<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import Api from "../../api"
import {ElMessage} from 'element-plus'
import router from "../../router"
import {useJWT} from "../../pinia-store"

const ruleFormRef = ref<FormInstance>()
let signupDisabled = ref(false)

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      //校验重输密码输入框
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    signupDisabled.value = true
    callback(new Error('请重新输入密码'))
  } else if (value !== ruleForm.password) {
    signupDisabled.value = true
    callback(new Error("两个密码不一致"))
  } else {
    signupDisabled.value = false
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
  checkPass: '',
})

const rules = reactive({
  password: [{validator: validatePass, trigger: 'blur'}],
  checkPass: [{validator: validatePass2, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let jwtStore = useJWT()
      //校验成功
      Api.auth.signup(ruleForm).then(res => {
        if (res.status === 200 && res.data.code === 702) {
          ElMessage({
            message: res.data.error,
            type: 'error',
          })
        } else if (res.status === 200 && res.data.code === 200) {
          //存储token
          jwtStore.setJWT(res.data.data.access)
          ElMessage({
            message: res.data.msg,
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="signupDisabled"
        >注册用户
        </el-button>
        <router-link :to="{name:'Login'}">
          <el-button type="primary">已有用户去登陆</el-button>
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