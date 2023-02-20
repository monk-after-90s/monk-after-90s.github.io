<script setup lang="ts">

</script>

<template>
  <div class="outer">
    <div class="inner">
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
      <div class="content">体育</div>
    </div>
  </div>
</template>

<style scoped>
.outer {
  width: 100%;
}

.inner {
  width: 100%;
  margin: 0 auto;
}

.content {
  width: auto;
  height: 500px;
  background-color: lightblue;
  line-height: 500px;
  font-size: 100px;
  text-align: center;
}
</style>