<template>
  <el-form label-width="80px" ref="formRef" :rules="rules" :model="formData">
    <!-- 账号/密码 login -->
    <el-form-item label="账号" prop="account">
      <el-input v-model="formData.account">
        <template #prefix>
          <i-ep-user></i-ep-user>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        :type="visible ? 'text' : 'password'"
        v-model="formData.password"
        clearable
      >
        <template #prefix>
          <i-ep-lock></i-ep-lock>
        </template>
        <template #suffix>
          <i-ep-hide @click="handleChange" v-if="visible"></i-ep-hide>
          <i-ep-view @click="handleChange" v-else></i-ep-view>
        </template>
      </el-input>
    </el-form-item>
    <!-- 用户组 -->
    <el-form-item v-if="showUserGroup" label="用户组" prop="userGroup">
      <el-select v-model="formData.userGroup" placeholder="请选择用户组">
        <el-option value="普通用户"></el-option>
        <el-option value="超级管理员"></el-option>
      </el-select>
    </el-form-item>

    <!-- 按钮 -->
    <el-form-item>
      <el-button @click="submitForm" type="primary">{{ btnText }}</el-button>
      <el-button v-if="showResetBtn" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { AccountFormType } from "../types";
import { rules } from "../reusable/rules";
import type { FormInstance } from "element-plus";
import { visible, handleChange } from "../states/visibilityStore";
import { Router } from "vue-router";
import { handleAccountAdd, handleLogin } from "../api/users";
import { makeRouter } from "../router";

const formRef = ref<FormInstance>();
const router: Router = useRouter();

const submitForm = async () => {
  if (!formRef) return;
  if (!formRef.value!.validate()) return false;

  try {
    if (props.formData.userGroup) {
      const res = await handleAccountAdd(props.formData);
      if (res.data.code === 0) {
        router.push("account");
      }
    } else {
      const res = await handleLogin(props.formData);
      if (res.data.code === 0) {
        // 将token存储到本地
        localStorage.setItem("token", "Bearer " + res.data.token);
        // 将role角色存储本地
        localStorage.setItem("role", res.data.role);

        // make router
        makeRouter();

        router.push("home");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const reset = () => {
  formRef.value!.resetFields();
};

const props = defineProps<{
  formData: AccountFormType;
  showUserGroup: boolean;
  showResetBtn: boolean;
  btnText: string;
}>();
</script>

<style lang="scss" scoped>
.el-form {
  .el-input,
  .el-select {
    width: 20vw;
  }
}
</style>
