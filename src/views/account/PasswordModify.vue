<template>
  <div class="password-modify">
    <el-card class="card">
      <header class="title">
        <span>修改密码</span>
      </header>
      <section class="content">
        <!-- 表单 -->
        <el-form
          :model="passwordModifyForm"
          :rules="rules"
          ref="formRef"
          size="small"
          label-width="100px"
          status-icon
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              type="password"
              v-model="passwordModifyForm.oldPassword"
            ></el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              type="password"
              v-model="passwordModifyForm.newPassword"
            ></el-input>
          </el-form-item>

          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="passwordModifyForm.confirmPassword"
            ></el-input>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button @click="submitForm" type="primary">确定</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { PasswordModifyForm } from "../../types";
import type { FormInstance } from "element-plus";
import { handlePasswordEdit, handlePasswordValidate } from "../../api/users";

const formRef = ref<FormInstance>();
const router = useRouter();

const passwordModifyForm = reactive<PasswordModifyForm>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const checkOldPwd = async (rule: any, value: string, callback: any) => {
  // TODO: 需要axios请求 检查原密码是否正确
  const res = await handlePasswordValidate({ oldPwd: value });
  const { code, msg } = res.data;

  if (!value) {
    callback(new Error("请输入原密码"));
  } else if (code === 400) {
    callback(new Error(msg));
  } else if (code === 200) {
    callback();
  }
};

const checkNewPwd = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入新密码"));
  } else if (!/^[a-zA-Z0-9\u4E00-\u9FA5]{6,20}$/.test(value)) {
    callback(new Error("字母/数字 6 ~ 20 位"));
  } else if (passwordModifyForm.oldPassword === value) {
    callback(new Error("新密码不能和旧密码相同"));
  } else {
    callback();
  }
};

const checkNewPwdAgain = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入新密码"));
  } else if (passwordModifyForm.newPassword !== value) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

interface Rules {
  validator: (...args: any) => any;
  trigger: string;
}

const rules: Record<string, Rules> = reactive({
  oldPassword: { required: true, validator: checkOldPwd, trigger: "blur" },
  newPassword: { required: true, validator: checkNewPwd, trigger: "blur" },
  confirmPassword: {
    required: true,
    validator: checkNewPwdAgain,
    trigger: "blur",
  },
});

const submitForm = () => {
  if (!formRef) return;

  formRef.value!.validate(async (valid: boolean) => {
    if (valid) {
      const res = await handlePasswordEdit({
        newPwd: passwordModifyForm.newPassword,
      });
      if (res.data.code === 0) {
        // 清除本地存储
        localStorage.clear();
        router.push("login");
      }
    } else {
      console.log("修改失败");
    }
  });
};

const reset = () => {
  formRef.value!.resetFields();
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 3vh;
}
.el-form {
  .el-input {
    width: 280px;
  }
}
</style>
