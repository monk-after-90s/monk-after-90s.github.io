<script setup lang="ts">
import {reactive} from 'vue'

let menuList = reactive([
  {
    path: "/",
    meta: {
      title: "首页",
      icon: "HomeFilled",
    },
  },
  {
    path: "/baisc",
    meta: {
      title: "基础数据",
      icon: "Setting",
    },
    children: [
      {
        path: "/basic/faculty",
        meta: {
          title: "院系信息",
          icon: "Ship",
        },
      },
      {
        path: "/basic/major",
        meta: {
          title: "专业信息",
          icon: "ShoppingBag",
        },
      },
      {
        path: "/basic/teacher",
        meta: {
          title: "教师信息",
          icon: "ShoppingCartFull",
        },
      },
    ],
  },

  {
    path: "/student",
    meta: {
      title: "学生管理",
      icon: "UserFilled",
    },
    children: [
      {
        path: "/student/info",
        meta: {
          title: "学生信息",
          icon: "VideoCameraFilled",
        },
      },
      {
        path: "/student/exam",
        meta: {
          title: "考试信息",
          icon: "OfficeBuilding",
        },
      },
      {
        path: "/student/image",
        meta: {
          title: "学生照片",
          icon: "TakeawayBox",
        },
      },
    ],
  },
  {
    path: "/user",
    meta: {
      title: "用户角色",
      icon: "Ticket",
    },
    children: [
      {
        path: "/user/account",
        meta: {
          title: "登录账号",
          icon: "Coordinate",
        },
      },
      {
        path: "/user/roles",
        meta: {
          title: "角色信息",
          icon: "CreditCard",
        },
      },
      {
        path: "/user/menu",
        meta: {
          title: "菜单管理",
          icon: "DeleteLocation",
        },
      },
      {
        path: "/user/permission",
        meta: {
          title: "权限管理",
          icon: "Goods",
        },
      },
    ],
  }])
</script>

<template>
  <template v-for="menu in menuList">
    <el-sub-menu v-if="menu.children && menu.children.length>0" :index="menu.path">
      <template #title>
        <el-icon>
          <component class="icons" :is="menu.meta.icon"></component>
        </el-icon>
        <span style="padding-left: 10px">{{ menu.meta.title }}</span>
      </template>
      <el-menu-item v-for="submenu in menu.children" :index="menu.path">
        <el-icon>
          <component class="icons" :is="submenu.meta.icon"></component>
        </el-icon>
        {{ submenu.meta.title }}
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <el-icon>
        <component class="icons" :is="menu.meta.icon"></component>
      </el-icon>
      <span>{{ menu.meta.title }}</span></el-menu-item>
  </template>
</template>

<style scoped>
.el-menu-item {
  display: block;
  text-align: left;
  padding-right: 80px;
}
</style>