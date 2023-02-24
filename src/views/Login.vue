<template>
  <main class="login">
    <section class="login-form">
      <header class="login-header">
        <h3>系统登录</h3>
      </header>

      <!-- form表单 -->
      <AccountForm
        :formData="loginForm"
        :showUserGroup="false"
        :showResetBtn="false"
        btnText="登录看看"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
// props
const loginForm = reactive({
  account: "admin",
  password: "123456",
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #333;

  .login-form {
    width: 400px;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 20px;

    .login-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      color: #fff;
    }

    // /deep/ .el-input {
    // }

    ::v-deep(.el-input) {
      input {
        letter-spacing: 1px;
      }
    }
    .el-button {
      width: 86.5%;
      margin-left: auto;
    }
  }
}
</style>
