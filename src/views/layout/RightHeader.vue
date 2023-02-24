<template>
  <header class="right-header">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 折叠图标和功能 -->
        <i-ep-fold @click="changeCollapse" v-if="!isCollapse"></i-ep-fold>
        <i-ep-expand @click="changeCollapse" v-else></i-ep-expand>

        <!-- 参考文档: 组件 -> 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="bread in breads">{{
            bread.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="12" class="personal-info">
        <!-- 右侧下拉 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你, 老吴
            <i-ep-caret-bottom></i-ep-caret-bottom>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-avatar :size="50" :src="avatar"></el-avatar>
      </el-col>
    </el-row>
  </header>
</template>

<script setup lang="ts">
import { handlePersonInfo } from "../../api/users";
import { Breads } from "../../types";
import emitter from "../../utils/bus";
const route = useRoute();
const router = useRouter();
const isCollapse = ref<boolean>(false);
const avatar = ref<string>("");

// 定义面包屑数据
const breads = ref<Breads>([]);

// methods
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;

  // 注册事件 传递数据
  emitter.emit("changeCollapse", isCollapse.value);
};

const handleCommand = (command: string) => {
  if (command === "personal") {
    router.push("personal");
  } else if (command === "logout") {
    router.push("login");
    localStorage.clear();

    // 重新加载页面
    location.reload();
  }
};

const getAvatarUrl = async () => {
  const res = await handlePersonInfo();
  avatar.value =
    res.data.imgUrl ??
    "https://www.xddzhuisu.com/Data/Upload/Avatars/noavatar.gif";
};

// 监听路由
watch(
  () => route.path,
  () => {
    const temp = [{ path: "/home", title: "首页" }];
    const routes = route.matched
      .filter((v) => v.meta.title)
      .map((v) => ({ path: v.path, title: v.meta.title }));
    breads.value = [...temp, ...routes];
  },
  { immediate: true }
);

// 钩子
onMounted(() => {
  getAvatarUrl();
  emitter.on("updateAvatar", () => {
    getAvatarUrl();
  });
});
</script>

<style lang="scss" scoped>
.right-header {
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  background-color: #fff;

  .el-col {
    display: flex;
    align-items: center;
    height: 60px;

    svg {
      font-size: 24px;
      font-weight: 700;
      margin-right: 20px;
      color: #999;
    }
  }

  .personal-info {
    display: flex;
    justify-content: flex-end;

    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;

      svg {
        font-size: 18px;
      }
    }
  }
}
</style>
