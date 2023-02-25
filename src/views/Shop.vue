<template>
  <div class="shop">
    <el-card>
      <div class="title">
        <span>店铺管理</span>
        <el-button
          @click="handleSave"
          style="float: right; padding: 5px 3px"
          :type="disabled ? 'primary' : 'success'"
        >
          {{ disabled ? "编辑" : "保存" }}
        </el-button>
      </div>

      <div class="content">
        <!-- 表单 -->
        <el-form
          :disabled="disabled"
          :model="shopForm"
          size="small"
          label-width="100px"
        >
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="shopForm.name"></el-input>
          </el-form-item>
          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input
              v-model="shopForm.bulletin"
              type="textarea"
              rows="5"
            ></el-input>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="/backend/8013/api/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.avatar"
                :src="shopForm.avatar"
                class="avatar"
              />
              <i-ep-plus v-else class="avatar-uploader-icon"></i-ep-plus>
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺图片" style="width: 800px">
            <!-- 上传框 -->
            <el-upload
              action="/backend/8013/api/shop/upload"
              list-type="picture-card"
              :on-success="handlePicSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="shopForm.pics"
            >
              <i-ep-plus></i-ep-plus>
            </el-upload>

            <!-- 预览 -->
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>

          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input-number v-model="shopForm.deliveryPrice"></el-input-number>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="配送时间">
            <el-input-number v-model="shopForm.deliveryTime"></el-input-number>
          </el-form-item>
          <!-- 配送描述 -->
          <el-form-item label="配送描述">
            <el-input v-model="shopForm.description"></el-input>
          </el-form-item>
          <!-- 店铺评分 -->
          <el-form-item label="店铺评分">
            <el-rate allow-half disabled v-model="shopForm.score"></el-rate>
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input-number v-model="shopForm.sellCount"></el-input-number>
          </el-form-item>
          <!-- 活动 -->
          <el-form-item label="特色">
            <el-checkbox-group v-model="shopForm.supports">
              <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
              <el-checkbox label="起送费最低" name="type"></el-checkbox>
              <el-checkbox label="品牌联盟" name="type"></el-checkbox>
              <el-checkbox label="距离最近" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              v-model="shopForm.date"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { handleShopEdit, handleShopInfo } from "../api/shop";

const disabled = ref<boolean>(true);
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>("");
const shopForm = ref<any>({
  name: "",
  bulletin: "",
  avatar: "",
  pics: [],
  deliveryPrice: 0,
  deliveryTime: 0,
  description: "",
  score: 0,
  sellCount: 0,
  supports: [],
  date: [],
});

const handleSave = async () => {
  disabled.value = !disabled.value;

  if (disabled.value) {
    const params = JSON.parse(JSON.stringify(shopForm.value));

    params.pics = params.pics.map((p: any) => p.url);

    const res = await handleShopEdit(params);
    console.log(res);
  }
};
const handleAvatarSuccess = (res: any) => {
  if (res.code === 0) {
    shopForm.value.avatar = res.imgUrl;
  }
};
const beforeAvatarUpload = (file: any) => {
  // 是否是JPG格式
  const isJPG = file.type === "image/jpeg";
  // 是否小于2M
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    console.error("上传的头像图片只能是JPG格式");
    return false;
  }

  if (!isLt2M) {
    console.error("上传的头像图片大小不能超过2MB");
    return false;
  }

  return isJPG && isLt2M;
};
const handlePicSuccess = (res: any) => {
  shopForm.value.pics.push({
    name: res.imgUrl.slice(27),
    url: res.imgUrl,
  });
};
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
const handleRemove = (file: any, fileList: any) => {
  shopForm.value.pics = fileList;
};

// 钩子
const loadShopInfo = async () => {
  const res = await handleShopInfo();

  // http://127.0.0.1:5005/imgs/logo.jpg
  res.data.data.pics = res.data.data.pics.map((p: string) => ({
    name: p.slice(27),
    url: p,
  }));

  shopForm.value = res.data.data;
};
onMounted(loadShopInfo);
</script>

<style lang="scss" scoped>
.el-form {
  width: 360px;
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
  img {
    width: 100%;
  }
}
</style>
