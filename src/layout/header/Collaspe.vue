<script setup lang="ts">
import {ref, computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
let isCollapse = computed(() => {
  return store.getters.getCollapse
})

function changeCollapse() {
  store.commit('setCollapse', !store.getters.getCollapse)
}
</script>

<template>
  <el-icon @click="changeCollapse">
    <Expand v-show="isCollapse"/>
    <Fold v-show="!isCollapse"/>
  </el-icon>
</template>

<style scoped>
.el-icon {
  font-size: 22px;
  margin-right: 10px;
}
</style>