<template>
  <div class="goods-category">
    <div class="title">商品分类</div>

    <el-form :model="addGoodsForm" size="small">
      <el-form-item label="商品分类" prop="cateName" width="120">
        <el-input v-model="addGoodsForm.cateName"></el-input>
        <el-button @click="handleAdd" type="primary">确定</el-button>
      </el-form-item>

      <el-form-item label="所有分类">
        <!-- 下拉框 -->
        <el-select v-model="addGoodsForm.default">
          <el-option v-for="v in categoryNames" :key="v" :value="v"></el-option>
        </el-select>
        <el-button @click="handleDelete" type="warning">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  handleCategories,
  handleCategoryAdd,
  handleCategoryDelete,
} from "../../api/goods";

const addGoodsForm = ref<any>({
  cateName: "",
  state: true,
  default: "",
});

const handleAdd = async () => {
  // console.log(addGoodsForm.value);

  const res = await handleCategoryAdd({
    cateName: addGoodsForm.value.cateName,
    state: addGoodsForm.value.state,
  });

  if (res.data.code === 0) {
    getCategoryNames();
    addGoodsForm.value.cateName = "";
  }
};

const handleDelete = async () => {
  const res = await handleCategoryDelete({
    cateName: addGoodsForm.value.default,
  });
  if (res.data.code === 0) {
    getCategoryNames();
    addGoodsForm.value.default = "";
  }
};

const categoryNames = ref<any>([]);

const getCategoryNames = async () => {
  const res = await handleCategories();
  categoryNames.value = res.data;
};

onMounted(getCategoryNames);
</script>

<style lang="scss" scoped>
.el-form {
  .el-input,
  .el-select {
    width: 20vw;
    margin-right: 0.5vw;
  }
}
</style>
