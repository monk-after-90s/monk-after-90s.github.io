<script setup lang="ts">
import Header from "./header/header.vue"
import Menu from "./menu/Menu.vue"
</script>

<template>
  <el-container class="layout">
    <el-aside class="aside" width=auto>
      <Menu/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header/>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped>
.aside {
  height: 100vh;
}

.layout {
  height: 100%;
}


.header {
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main {
  background-color: lightseagreen;
}
</style>