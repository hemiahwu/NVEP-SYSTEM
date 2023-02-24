<template>
  <aside class="sidebar" :style="{ width: isCollapse ? '' : '200px' }">
    <header class="header">
      <img width="50" height="50" src="../../assets/imgs/logo.png" alt="logo" />
      <span v-show="!isCollapse">外卖后台管理系统</span>
    </header>

    <!-- 导航菜单 -->
    <el-menu
      :default-active="currentPath"
      background-color="#304156"
      text-color="#fff"
      unique-opened
      router
    >
      <template v-for="menu in menus">
        <!-- 一级路由 -->
        <el-menu-item :index="menu.path" v-if="menu.children.length === 1">
          <i-ep-home-filled></i-ep-home-filled>
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 二级路由 -->
        <el-sub-menu :index="menu.path" v-else>
          <template #title>
            <i-ep-grid></i-ep-grid>
            <span>{{ menu.meta.title }}</span>
          </template>
          <el-menu-item v-for="item in menu.children" :index="item.path">{{
            item.meta.title
          }}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
import _ from "lodash";
import emitter from "../../utils/bus";

const route = useRoute();
const currentPath = computed(() => route.path);
const isCollapse = ref<boolean>(false);
const menus = ref<any>([]);

// 监听窗口大小
onMounted(() => {
  menus.value = JSON.parse(localStorage.getItem("menus")!);

  isCollapse.value = document.body.clientWidth > 1000 ? false : true;
  window.addEventListener("resize", debounceResize);

  // 接收RightHeader传过来的状态
  emitter.on("changeCollapse", (value) => {
    isCollapse.value = Boolean(value);
  });
});

// 防抖优化
const debounceResize = _.debounce(() => {
  if (document.body.clientWidth < 1000) {
    isCollapse.value = true;
  } else {
    isCollapse.value = false;
  }
}, 1000);
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  background-color: #304156;
  // width删掉了, 通过响应式添加
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .el-menu {
    border-right: 0px;
    svg {
      color: #fff;
      margin-right: 10px;
    }

    ::v-deep(.el-menu) {
      background-color: #202f3f !important;
    }
  }
}
</style>
