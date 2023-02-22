<script lang="ts" setup>
import { CirclePlus, List, Search } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue'

let Data = reactive({
  q_str: ref(''),
  facultyOptions: reactive([
    {
      value: 1, label: '计算机学院'
    },
    {
      value: 2, label: '语言学院'
    },
    {
      value: 3, label: '哲学学院'
    }
  ]),
  facultySelected: ref(''),
  majorOptions: reactive([
    {
      value: 1, label: '计算机应用'
    },
    {
      value: 2, label: '刑法'
    },
    {
      value: 3, label: '汉语研究'
    }
  ]),
  majorSelected: ref('')
})
</script>

<template>
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="查询条件">
      <el-input placeholder="请输入查询条件:" v-model="Data.q_str" />
    </el-form-item>
    <el-form-item label="院系:">
      <el-select placeholder="请选择院系" v-model="Data.facultySelected">
        <el-option v-for="item in Data.facultyOptions" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="专业:">
      <el-select placeholder="请选择专业" v-model="Data.majorSelected">
        <el-option v-for="item in Data.majorOptions" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        <el-icon>
          <Search />
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button type="primary">
        <el-icon>
          <List />
        </el-icon>
        <span>全部</span>
      </el-button>
      <el-button type="primary">
        <el-icon>
          <CirclePlus />
        </el-icon>
        <span>添加</span></el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>