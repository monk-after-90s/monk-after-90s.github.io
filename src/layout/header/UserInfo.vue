<script setup lang="ts">
import router from "../../router"
import {ElMessage} from "element-plus"
import useGlobalProperties from "../../utils/globalVar"

const globalProperties = useGlobalProperties()
const jwtStore = globalProperties.jwtStore
const logout = () => {
  jwtStore.delJWT()
  ElMessage.warning('已退出登陆')
  router.push({name: 'Login'})
}
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon style="margin-right: 10px"><User/></el-icon>
      <span>{{ jwtStore.getState.username }}</span>
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!--        <el-dropdown-item>用户信息</el-dropdown-item>-->
        <!--        <el-dropdown-item>更改密码</el-dropdown-item>-->
        <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>