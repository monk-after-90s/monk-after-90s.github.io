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
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>


<style scoped>
.layout {
  height: 100%;
}


.header {
  background-color: lightcyan;
}

.main {
  background-color: lightseagreen;
}
</style>