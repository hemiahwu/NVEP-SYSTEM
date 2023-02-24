<template>
  <main class="layout">
    <!-- 侧边栏 -->
    <Sidebar />
    <!-- 右侧 -->
    <section class="content">
      <!-- header -->
      <RightHeader />

      <!-- 组件容器 -->
      <div class="component">
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import RightHeader from "./RightHeader.vue";
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .component {
      padding: 20px;
      background-color: #f0f2f5;
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>
