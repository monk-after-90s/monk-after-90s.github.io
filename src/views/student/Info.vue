<script lang="ts" setup>
import {CirclePlus, List, Search, Edit, More, Delete} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {fa, tr} from 'element-plus/es/locale';
import {ref, reactive, getCurrentInstance} from 'vue'

const Api = getCurrentInstance()?.proxy?.api

let Data = reactive({
  // =============查询区域==============
  q_str: ref(''),
  facultyOptions: reactive([{id: 0, name: ''}]),
  facultySelected: ref(''),
  majorOptions: reactive([
    {
      id: 0,
      name: ''
    }
  ]),
  majorSelected: ref(''),
  // =============表格区域==============
  students: reactive([]),
  //=============分页区域===============
  currentPage: ref(1),
  pageSize: ref(17),
  total: ref(0),
  dialogFromVisible: ref(false),
  layerTitle: ref(''),
  studentForm: reactive({
    sno: ref(''),
    name: ref(''),
    gender: ref(''),
    birthday: ref(''),
    faculty: ref(''),
    major: ref(''),
    mobile: ref(''),
    email: ref(''),
    address: ref('')
  }),
  isView: ref(false),
  isEdit: ref(false),
  layerFacultyMajor: reactive([]),
  layerMajorSelected: ref("")
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

const getFaculties = () => {
  Api.faculties.getAll().then(res => {
    if (res && res.data) {
      Data.facultyOptions = res.data.results
    }
  })
}

const getMajors = () => {
  Api.majors.getAll({faculty: Data.facultySelected}).then((res) => {
    Data.majorOptions = res.data.results
  })
}
const getStudents = () => {
  Api.students.getAll(
      {
        page: Data.currentPage,
        size: Data.pageSize,
        search: Data.q_str,
        faculty: Data.facultySelected,
        major: Data.majorSelected
      }
  ).then((res) => {
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
const listAllStudents = () => {
  Data.q_str = ''
  Data.facultySelected = ''
  Data.majorSelected = ''
  getStudents()
}
const addStudent = () => {
  Data.isView = false
  Data.isEdit = false

  Data.dialogFromVisible = true
  Data.layerTitle = "【添加学生】"
}
const viewStudent = (row: any) => {
  Data.isView = true
  Data.isEdit = false

  Data.dialogFromVisible = true
  Data.layerTitle = "【查看学生信息】"
  Data.studentForm = JSON.parse(JSON.stringify(row))
  Data.layerMajorSelected = row.major.id
}
const editStudent = (row: any) => {
  Data.isView = false
  Data.isEdit = true

  Data.dialogFromVisible = true
  Data.layerTitle = "【编辑学生信息】"

  Data.studentForm = JSON.parse(JSON.stringify(row))

  Data.layerMajorSelected = row.major.id
}

const closeLayer = () => {
  Data.dialogFromVisible = false
  Data.isView = false
  Data.isEdit = false

  Data.studentForm.sno = ""
  Data.studentForm.name = ""
  Data.studentForm.gender = ""
  Data.studentForm.birthday = ""
  Data.studentForm.faculty = ""
  Data.studentForm.major = ""
  Data.studentForm.mobile = ""
  Data.studentForm.email = ""
  Data.studentForm.address = ""
  Data.layerMajorSelected = ""
}
const getTreeMajor = async () => {
  let allFaculties: any = []
  let allMajors: any = []
  await Api.faculties.getAll().then((res: any) => {
    allFaculties = res.data.results
  })
  await Api.majors.getAll().then((res: any) => {
    allMajors = res.data.results
  })

  for (let faculty of allFaculties) {
    //添加院系
    let faculty_select = {
      value: `${faculty.id}-${faculty.name}`,
      label: faculty.name,
      children: []//1060 5g 590gme三风扇 收据 要报销
    }
    //添加专业
    for (let major of allMajors) {
      if (major.faculty.id === faculty.id) {
        let majorSelect = {value: major.id, label: major.name}
        faculty_select.children.push(majorSelect)
      }
    }
    Data.layerFacultyMajor.push(faculty_select)
  }
}
const autoRun = () => {
  getStudents()
  getFaculties()
  getTreeMajor()
}
autoRun()
</script>

<template>
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="查询条件">
      <el-input placeholder="请输入查询条件:" v-model="Data.q_str"/>
    </el-form-item>
    <el-form-item label="院系:">
      <el-select placeholder="请选择院系" v-model="Data.facultySelected" clearable filterable @change="getMajors">
        <el-option v-for="item in Data.facultyOptions" :key="item.id" :value="item.id" :label="item.name"/>
      </el-select>
    </el-form-item>
    <el-form-item label="专业:">
      <el-select placeholder="请选择专业" v-model="Data.majorSelected" clearable filterable>
        <el-option v-for="item in Data.majorOptions" :key="item.id" :value="item.id" :label="item.name"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getStudents">
        <el-icon>
          <Search/>
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button type="primary" @click="listAllStudents">
        <el-icon>
          <List/>
        </el-icon>
        <span>全部</span>
      </el-button>
      <el-button type="primary" @click="addStudent">
        <el-icon>
          <CirclePlus/>
        </el-icon>
        <span>添加</span></el-button>
    </el-form-item>
  </el-form>

  <el-table border style="width: 100%" :data="Data.students" stripe
            :header-cell-style="{ backgroundColor: '#409EFF', color: '#FFF', fontSize: '14px' }">
    <el-table-column label="序号" width="60px" type="index" align="center" show-overflow-tooltip/>
    <el-table-column prop="sno" label="学号" width="80px" align="center" show-overflow-tooltip/>
    <el-table-column prop="name" label="姓名" width="80px" align="center" show-overflow-tooltip/>
    <el-table-column prop="gender" label="性别" width="55px" align="center" show-overflow-tooltip/>
    <el-table-column prop="birthday" label="出生日期" width="100px" align="center" show-overflow-tooltip/>
    <el-table-column prop="major.faculty.name" label="院系" align="center" show-overflow-tooltip/>
    <el-table-column prop="major.name" label="专业" align="center" show-overflow-tooltip/>
    <el-table-column prop="mobile" label="电话" align="center" show-overflow-tooltip/>
    <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip/>
    <el-table-column prop="address" label="地址" align="center" show-overflow-tooltip/>
    <el-table-column label="操作" align="center" show-overflow-tooltip>
      <template #default="scope">
        <el-button type="primary" :icon="More" circle size="small" @click="viewStudent(scope.row)"/>
        <el-button type="warning" :icon="Edit" circle size="small" @click="editStudent(scope.row)"/>
        <el-button type="danger" :icon="Delete" circle size="small"/>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="margin-top: 20px;" background v-model:current-page="Data.currentPage"
                 v-model:page-size="Data.pageSize" :page-sizes="[10, 12, 15, 20, 25, 30, 32, 35, 40]"
                 layout="total, sizes, prev, pager, next, jumper" :total="Data.total" @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"/>

  <!-- 弹出层 -->
  <el-dialog v-model="Data.dialogFromVisible" width="40%" @close="closeLayer">
    <template #title>
      <div style="font-size: 18px;color:#409eff;font-weight: bold;text-align: left">{{ Data.layerTitle }}</div>
    </template>
    <el-form inline label-width="100px" v-model="Data.studentForm">
      <el-form-item label="学号:">
        <el-input v-model="Data.studentForm.sno" suffix-icon="Edit" placeholder="请输入"
                  :disabled="Data.isEdit || Data.isView"/>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="Data.studentForm.name" suffix-icon="Edit" placeholder="请输入" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select placeholder="请选择" v-model="Data.studentForm.gender" :disabled="Data.isView">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期:">
        <el-date-picker type="date" placeholder="请选择日期" v-model="Data.studentForm.birthday"
                        :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="学院/专业:">
        <el-cascader
            :disabled="Data.isView"
            v-model="Data.layerMajorSelected"
            placeholder="选择专业"
            :options="Data.layerFacultyMajor"
            filterable
            style="width: 15vw"
        />
      </el-form-item>
      <el-form-item label="电话:">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.mobile" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.email" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="家庭住址:">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.address" :disabled="Data.isView"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Data.dialogFromVisible = false">取消</el-button>
        <el-button type="primary" v-show="!Data.isView">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>