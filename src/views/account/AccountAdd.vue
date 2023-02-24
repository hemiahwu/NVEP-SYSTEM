<template>
  <div class="account-add">
    <el-card class="card">
      <header class="title">
        <span>添加账号</span>
      </header>
      <section class="content">
        <!-- 表单 -->
        <AccountForm
          :formData="accountForm"
          :showUserGroup="true"
          :showResetBtn="true"
          btnText="创建账号"
        />
      </section>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 定义数据
const accountForm = reactive({
  account: "",
  password: "",
  userGroup: "",
});
</script>

<style lang="scss" scoped>
.el-form {
  .el-input,
  .el-select {
    width: 20vw;
  }
}
</style>
