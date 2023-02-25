<template>
  <div class="goods-list">
    <el-card class="box-card">
      <div class="title">
        <span>商品添加</span>
      </div>
      <div class="content">
        <!-- 表单 -->
        <el-form
          ref="editFormRef"
          size="small"
          :model="product"
          label-width="80px"
          status-icon
        >
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>

          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="product.category">
              <el-option v-for="c in categoryNames" :value="c"></el-option>
            </el-select>
          </el-form-item>

          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="product.price"></el-input>
          </el-form-item>

          <!-- 创建时间 -->
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="product.ctime"
              value-format="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>

          <!-- 商品评价 -->
          <el-form-item label="商品评价" prop="price">
            <el-input v-model="product.rating"></el-input>
          </el-form-item>

          <!-- 商品销量 -->
          <el-form-item label="商品销量" prop="sellCount">
            <el-input v-model="product.sellCount"></el-input>
          </el-form-item>

          <!-- 商品描述 -->
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input v-model="product.goodsDesc"></el-input>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="/backend/8013/api/goods/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="product.imgUrl" :src="product.imgUrl" class="avatar" />
              <i-ep-plus v-else class="avatar-uploader-icon"></i-ep-plus>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-form-item>
          <el-button size="small" @click="reset"> 重置 </el-button>
          <el-button size="small" type="primary" @click="handleSave">
            确 定
          </el-button>
        </el-form-item>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { handleCategories, handleGoodsAdd } from "../../api/goods";
import router from "../../router";

const product = ref<any>({
  ctime: "2025-12-31 00:00:00",
  name: "香辣鸡腿堡",
  category: "热销",
  price: "20.8",
  imgUrl: "",
  goodsDesc: "成年人的最爱",
  rating: 100,
  sellCount: 20,
});

const categoryNames = ref<string[]>([]);

// 保存
const handleSave = async () => {
  const res = await handleGoodsAdd(product.value);
  console.log(res.data);
  if (res.data.code === 0) {
    router.push("list");
  }
};

// 重置
const reset = () => {
  product.value = {
    ctime: "",
    name: "",
    category: "",
    price: "",
    imgUrl: "",
    goodsDesc: "",
    rating: 0,
    sellCount: 0,
  };
};

// 商品图片上传
const handleAvatarSuccess = (res: any) => {
  if (res.code === 0) {
    product.value.imgUrl = res.imgUrl;
  }
};

const loadGoodsCategories = async () => {
  const res = await handleCategories();
  categoryNames.value = res.data;
};

onMounted(loadGoodsCategories);
</script>

<style lang="scss" scoped>
.el-form {
  .el-input,
  .el-select {
    width: 20vw;
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
  img {
    width: 100%;
  }
}
</style>
