<script lang="ts" setup>
import {CirclePlus, List, Search, Edit, More, Delete} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {ref, reactive, getCurrentInstance} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessageBox} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import request from '../../utils/request'

let {proxy: {api}} = getCurrentInstance() as any
const validateSNoExists = (rule: any, value: any, callback: any) => {
  // 如果是修改，忽略校验
  if (Data.isEdit) callback();
  // 连接Student接口
  api.students.getAll({sno: value}).then((res: { data: { count: number; }; }) => {
    // 判断是否存在
    if (res.data.count > 0) {
      callback(new Error("学号已存在！"))
    } else {
      callback()
    }
  })
}

let Data = reactive({
  // =============查询区域==============
  q_str: '',
  facultyOptions: [{id: 0, name: ''}],
  facultySelected: '',
  majorOptions: [{id: 0, name: ''}],
  majorSelected: '',
  // =============表格区域==============
  students: [],
  //=============分页区域===============
  currentPage: 1,
  pageSize: 17,
  total: 0,
  dialogFromVisible: false,
  layerTitle: '',
  studentForm: {
    sno: '',
    name: '',
    gender: '',
    birthday: '',
    faculty: '',
    major: '',
    mobile: '',
    email: '',
    address: '',
    image: ''
  },
  isView: false,
  isEdit: false,
  layerFacultyMajor: [],
  layerMajorSelected: "",

  // 弹出层表单的验证
  rules: {
    sno: [
      {required: true, message: "学号不能为空", trigger: "blur"},
      {
        pattern: /^[9][5]\d{4}$/,
        message: "学号必须要是95开头的6位数字",
        trigger: "blur",
      },
      {validator: validateSNoExists, trigger: 'blur'}
    ],
    name: [
      {required: true, message: "姓名不能为空", trigger: "blur"},
      {
        pattern: /^[\u4e00-\u9fa5]{2,5}$/,
        message: "姓名需要2-5个汉字",
        trigger: "blur",
      },
    ],
    gender: [{required: true, message: "性别不能为空", trigger: "blur"}],
    birthday: [
      {required: true, message: "出生日期不能为空", trigger: "blur"},
    ],
    major: [{required: true, message: "专业信息不能为空", trigger: "blur"}],
    mobile: [
      {required: true, message: "手机号码不能为空", trigger: "blur"},
      {
        pattern: /^[1][3456789]\d{9}$/,
        message: "手机号码必须要符合规范",
        trigger: "blur",
      },
    ],
    email: [
      {required: true, message: "邮箱地址不能为空", trigger: "blur"},
      {
        pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        message: "邮箱地址必须要符合规范",
        trigger: "blur",
      },
    ],
    address: [{required: true, message: "住址不能为空", trigger: "blur"}],
  },
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
  api.faculties.getAll().then((res: { data: { results: { id: number; name: string; }[]; }; }) => {
    if (res && res.data) {
      Data.facultyOptions = res.data.results
    }
  })
}

const getMajors = () => {
  api.majors.getAll({faculty: Data.facultySelected}).then((res: { data: { results: { id: number; name: string; }[]; }; }) => {
    Data.majorOptions = res.data.results
  })
}
const getStudents = () => {
  api.students.getAll(
      {
        page: Data.currentPage,
        size: Data.pageSize,
        search: Data.q_str,
        faculty: Data.facultySelected,
        major: Data.majorSelected
      }
  ).then((res: any) => {
    if (res.status === 200) {
      Data.students = res.data.results
      Data.total = res.data.count
      ElMessage({
        message: '数据加载成功！',
        type: 'success',
      })
    }
  }).catch((error: any) => {
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
const deleteStudent = (row: any) => {
  ElMessageBox.confirm(
      `确认要删除学生【学号】:${row.sno} 【姓名】:${row.name}?`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    api.students.del(row.sno).then((res: any) => {
      if (res.status === 204) {
        getStudents()
        ElMessage({
          message: '删除学生信息成功',
          type: 'success'
        })
      }
    })
  })
}
const closeLayer = () => {
  Data.dialogFromVisible = false
  Data.isView = false
  Data.isEdit = false

  studentFormRef.value?.resetFields()

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
  let faculties_promise = api.faculties.getAll()
  let majors_promise = api.majors.getAll()
  allFaculties = (await faculties_promise).data.results
  allMajors = (await majors_promise).data.results
  for (let faculty of allFaculties) {
    //添加院系
    let faculty_select = {
      value: `${faculty.id}-${faculty.name}`,
      label: faculty.name,
      children: []
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

const studentFormRef = ref<FormInstance>()


const commitLayer = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (Data.layerMajorSelected[1]) {
      Data.studentForm.major_id = Data.layerMajorSelected[1]
    } else {
      Data.studentForm.major_id = Data.layerMajorSelected
    }


    if (valid) {
      if (Data.isEdit) {
        api.students.edit(Data.studentForm.sno, Data.studentForm).then((res: any | Object) => {
          if (res.status === 201) {
            closeLayer()
            getStudents()
            ElMessage({
              message: '修改学生信息成功',
              type: 'success'
            })
          }
        })
      } else {
        //添加学生
        api.students.add(Data.studentForm).then(res => {
          if (res.status === 201) {
            closeLayer()
            getStudents()
            ElMessage({
              message: '学生添加成功',
              type: 'success'
            })
          }
        })
      }
    }
  })
}
const uploadStudentImage = (file: any) => {
  let fileReq = new FormData()
  fileReq.append('file', file.file)
  api.students.upload(fileReq).then((res: any) => {
    if (res.status === 200) {
      Data.studentForm.image = request.baseUrl + `/media/images/${res.data.data}`
    }
  })
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
        <el-button type="danger" :icon="Delete" circle size="small" @click="deleteStudent(scope.row)"/>
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

    <el-upload class="avatar-uploader" :http-request="uploadStudentImage" :show-file-list="false">
      <img v-if="Data.studentForm.image" :src="Data.studentForm.image" class="avatar" alt="头像"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>

    <el-form inline label-width="100px" :model="Data.studentForm" :rules="Data.rules" ref="studentFormRef">
      <el-form-item label="学号:" prop="sno">
        <el-input v-model="Data.studentForm.sno" suffix-icon="Edit" placeholder="请输入"
                  :disabled="Data.isEdit || Data.isView"/>
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="Data.studentForm.name" suffix-icon="Edit" placeholder="请输入" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="性别:" prop="gender">
        <el-select placeholder="请选择" v-model="Data.studentForm.gender" :disabled="Data.isView">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期:" prop="birthday">
        <el-date-picker type="date" placeholder="请选择日期" v-model="Data.studentForm.birthday" :disabled="Data.isView"
                        value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item label="学院/专业:">
        <el-cascader :disabled="Data.isView" v-model="Data.layerMajorSelected" placeholder="选择专业"
                     :options="Data.layerFacultyMajor" filterable style="width: 15vw"/>
      </el-form-item>
      <el-form-item label="电话:" prop="mobile">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.mobile" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.email" :disabled="Data.isView"/>
      </el-form-item>
      <el-form-item label="家庭住址:" prop="address">
        <el-input suffix-icon="Edit" placeholder="请输入" v-model="Data.studentForm.address" :disabled="Data.isView"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Data.dialogFromVisible = false">取消</el-button>
        <el-button type="primary" v-show="!Data.isView" @click="commitLayer(studentFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
