<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'


const queryStudent = () => {
  ElMessageBox.alert('这是一个消息提示框', '标题', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确定',
  })
}
</script>
<template>
  <h1>Demo中的标题1</h1>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary" @click="queryStudent">查询</el-button>
    <el-button type="success">添加</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>
<style scoped>
h1 {
  color: blue;
}
</style>