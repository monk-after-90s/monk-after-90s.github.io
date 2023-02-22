<script lang="ts" setup>
import { CirclePlus, List, Search, Edit, More, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import axios from 'axios'

let Data = reactive({
  // =============查询区域==============
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
  majorSelected: ref(''),
  // =============表格区域==============
  students: reactive([]),
  //=============分页区域===============
  currentPage: ref(1),
  pageSize: ref(17),
  total: ref(0)
})
//分页中修改pageSize
const handleSizeChange = (size: any) => {
  //修改每页的记录条数
  Data.pageSize = size
  getStudents()
}
//分页中修改currentSize
function handleCurrentChange(page: any) {
  Data.currentPage = page
  getStudents()
}

const getStudents = () => {
  axios.get("http://192.168.8.112:8000/api/v1/students/",
    { params: { page: Data.currentPage, size: Data.pageSize } }).then((res) => {
      if (res.status === 200) {
        Data.students = res.data.results
        Data.total = res.data.count
        ElMessage({
          message: '数据加载成功！',
          type: 'success',
        })
      }
    }).catch((error) => {
      console.log(error)
    })
}

const autoRun = () => {
  getStudents()
}
autoRun()
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

  <el-table border style="width: 100%" :data="Data.students" stripe
    :header-cell-style="{ backgroundColor: '#409EFF', color: '#FFF', fontSize: '14px' }">
    <el-table-column label="序号" width="60px" type="index" align="center" />
    <el-table-column prop="sno" label="学号" width="80px" align="center" />
    <el-table-column prop="name" label="姓名" width="80px" align="center" />
    <el-table-column prop="gender" label="性别" width="55px" align="center" />
    <el-table-column prop="birthday" label="出生日期" width="100px" align="center" />
    <el-table-column prop="major.faculty.name" label="院系" align="center" />
    <el-table-column prop="major.name" label="专业" align="center" />
    <el-table-column prop="mobile" label="电话" align="center" />
    <el-table-column prop="email" label="邮箱" align="center" />
    <el-table-column prop="address" label="地址" align="center" />
    <el-table-column label="操作" align="center">
      <el-button type="primary" :icon="More" circle size="small" />
      <el-button type="warning" :icon="Edit" circle size="small" />
      <el-button type="danger" :icon="Delete" circle size="small" />
    </el-table-column>
  </el-table>

  <el-pagination style="margin-top: 20px;" background v-model:current-page="Data.currentPage"
    v-model:page-size="Data.pageSize" :page-sizes="[10, 12, 15, 20, 25, 30, 32, 35, 40]"
    layout="total, sizes, prev, pager, next, jumper" :total="Data.total" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<style scoped></style>