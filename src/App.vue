<script setup lang="ts">
</script>

<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="{name:'Index'}">首页</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="{name:'Tv'}">电视剧</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link :to="{name:'Movie'}">电影</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link :to="{name:'Sport'}">体育</router-link>
    </el-menu-item>
  </el-menu>
  <router-view/>
</template>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
