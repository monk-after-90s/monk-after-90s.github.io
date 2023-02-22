<script setup lang="ts">
import {ref, Ref, watch} from 'vue'
import {useRoute, RouteLocationMatched} from 'vue-router'

const tabs: Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()

const getBredCum = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  if (matched[0].path != "/dashboard") {
    matched = [{path: "/dashboard", meta: {title: '首页'}} as any].concat(matched)
  }

  tabs.value = matched
}
getBredCum()
watch(() => route.path, getBredCum)
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="tab in tabs">{{ tab.meta.title }}</el-breadcrumb-item>
    <!--    <el-breadcrumb-item>基数数据</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>院系管理</el-breadcrumb-item>-->
  </el-breadcrumb>
</template>

<style scoped>

</style>