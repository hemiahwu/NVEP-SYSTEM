<template>
  <div class="personal">
    <el-card>
      <header class="title">个人中心</header>
      <section class="content">
        <p>管理员ID: {{ personInfo.id }}</p>
        <el-divider></el-divider>
        <p>账号: {{ personInfo.account }}</p>
        <el-divider></el-divider>
        <p>用户组: {{ personInfo.userGroup }}</p>
        <el-divider></el-divider>
        <p>创建时间: {{ moment(personInfo.ctime).fromNow() }}</p>
        <el-divider></el-divider>
        <p>创建头像:</p>
        <el-divider></el-divider>
        <el-upload
          class="avatar-uploader"
          action="/backend/8013/api/users/avatar_upload"
          :show-file-list="false"
          :on-success="uploadSuccess"
        >
          <!-- <img
            src="https://www.xddzhuisu.com/Data/Upload/Avatars/noavatar.gif"
            class="avatar"
          /> -->
          <img
            v-if="personInfo.imgUrl"
            :src="personInfo.imgUrl"
            class="avatar"
          />
          <!-- 上传图标 -->
          <i-ep-upload-filled
            class="avatar-uploader-icon"
            v-else
          ></i-ep-upload-filled>
        </el-upload>
        <el-button @click="handleSave" style="margin-top: 30px" type="primary">
          确定修改
        </el-button>
      </section>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { handleAvatarEdit, handlePersonInfo } from "../../api/users";
import moment from "moment";
import emitter from "../../utils/bus";

const personInfo = ref<{
  id: number;
  account: string;
  userGroup: string;
  imgUrl: string;
  ctime: string;
}>({
  id: 0,
  account: "",
  userGroup: "",
  imgUrl: "",
  ctime: "",
});

const uploadSuccess = (res: any) => {
  const { code, msg, imgUrl } = res;

  if (code === 0) {
    personInfo.value.imgUrl = imgUrl;
  }
};

const handleSave = async () => {
  const res = await handleAvatarEdit({ imgUrl: personInfo.value.imgUrl });
  if (res.data.code == 0) {
    // 通知rightHeader组件 更新头像
    emitter.emit("updateAvatar");
  }
};

onMounted(async () => {
  const res = await handlePersonInfo();
  personInfo.value = res.data;
});
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 3vh;
}
::v-deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
