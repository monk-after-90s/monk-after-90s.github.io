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
  <el-icon>
    <component class="icons" :is='isCollapse?"Expand":"Fold"' @click="changeCollapse"></component>
  </el-icon>
</template>

<style scoped>
.el-icon {
  font-size: 22px;
  margin-right: 10px;
}
</style>