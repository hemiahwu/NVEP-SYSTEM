<template>
  <div class="goods-list">
    <el-card class="box-card">
      <div class="title">
        <span>商品列表</span>
      </div>
      <div class="content">
        <!-- 表单 -->
        <el-form
          size="small"
          :inline="true"
          :model="searchForm"
          ref="searchFormRef"
        >
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>

          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="searchForm.category">
              <el-option v-for="c in categoryNames" :value="c"></el-option>
            </el-select>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="reset" type="success">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData">
          <!-- 展开的内容 -->
          <el-table-column type="expand">
            <template #default="{ row }">
              <el-form>
                <el-form-item label="商品ID">
                  <span>{{ row.id }}</span>
                </el-form-item>

                <el-form-item label="商品名称">
                  <span>{{ row.name }}</span>
                </el-form-item>

                <el-form-item label="商品分类">
                  <span>{{ row.category }}</span>
                </el-form-item>

                <el-form-item label="商品价格">
                  <span>{{ row.price }}</span>
                </el-form-item>

                <el-form-item label="创建时间">
                  <span>{{ moment(row.ctime).format("YYYY-MM-DD") }}</span>
                </el-form-item>

                <el-form-item label="商品评价">
                  <span>{{ row.rating }}</span>
                </el-form-item>

                <el-form-item label="商品销量">
                  <span>{{ row.sellCount }}</span>
                </el-form-item>

                <el-form-item label="商品描述">
                  <span>{{ row.goodsDesc }}</span>
                </el-form-item>

                <el-form-item label="商品图片" width="80">
                  <img width="10" height="50" :src="row.imgUrl" />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <!-- 商品名称 -->
          <el-table-column label="商品名称" prop="name" width="120">
          </el-table-column>

          <!-- 所属分类 -->
          <el-table-column label="所属分类" prop="category" width="100">
          </el-table-column>

          <!-- 商品价格 -->
          <el-table-column label="商品价格" prop="price" width="100">
          </el-table-column>

          <!-- 商品图片 -->
          <el-table-column label="商品图片" width="150">
            <template #default="{ row }">
              <img width="50" height="50" :src="row.imgUrl" alt="image" />
            </template>
          </el-table-column>

          <!-- 商品描述 -->
          <el-table-column label="商品描述" prop="goodsDesc" width="150">
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="250">
            <template #default="{ row }">
              <el-button @click="handleEdit(row)" type="primary">
                编辑
              </el-button>
              <el-button @click="handleDelete(row)" type="danger">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="total"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next, jumper"
        >
        </el-pagination>

        <!-- 弹窗 查看 -->
        <el-dialog v-model="dialogVisible" title="商品详情">
          <el-row>
            <el-col :span="12">
              <el-descriptions :bordered="true" :column="Number(1)">
                <el-descriptions-item label="商品名称">{{
                  product.name
                }}</el-descriptions-item>
                <el-descriptions-item label="所属分类">{{
                  product.category
                }}</el-descriptions-item>
                <el-descriptions-item label="商品价格">{{
                  product.price
                }}</el-descriptions-item>
                <el-descriptions-item label="商品描述">{{
                  product.goodsDesc
                }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{
                  moment(product.ctime).format("YYYY-MM-DD")
                }}</el-descriptions-item>
                <el-descriptions-item label="商品评价">{{
                  product.rating
                }}</el-descriptions-item>
                <el-descriptions-item label="商品销量">{{
                  product.sellCount
                }}</el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
          <template #footer>
            <el-button type="primary" @click="dialogVisible = false"
              >关闭</el-button
            >
          </template>
        </el-dialog>

        <!-- 弹窗 编辑 -->
        <el-dialog title="编辑商品" v-model="dialogEdit">
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

            <!-- 所属分类 -->
            <el-form-item label="所属分类" prop="category">
              <el-input v-model="product.category"></el-input>
            </el-form-item>

            <!-- 商品价格 -->
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="product.price"></el-input>
            </el-form-item>

            <!-- 创建时间 -->
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="product.ctime"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
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
                action="/api/goods/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img
                  v-if="product.imgUrl"
                  :src="product.imgUrl"
                  class="avatar"
                />
                <i-ep-plus v-else class="avatar-uploader-icon"></i-ep-plus>
              </el-upload>
            </el-form-item>
          </el-form>
          <!-- 按钮 -->
          <el-form-item>
            <el-button size="small" @click="dialogEdit = false">
              取 消
            </el-button>
            <el-button size="small" type="primary" @click="handleSave">
              确 定
            </el-button>
          </el-form-item>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  handleGoodsList,
  handleGoodsEdit,
  handleGoodsDelete,
  handleCategories,
} from "../../api/goods";
import moment from "moment";
const tableData = ref<any>([]);

const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

const searchForm = ref({
  name: "",
  category: "",
});

const total = ref<number>(0);

const product = ref<any>({});
const dialogVisible = ref<boolean>(false);
const dialogEdit = ref<boolean>(false);

const search = () => {
  loadGoodsList();
};
const reset = () => {
  searchForm.value = {
    name: "",
    category: "",
  };
};

const handleEdit = (row: any) => {
  dialogEdit.value = true;
  product.value = row;
};

const handleDelete = async (row: any) => {
  const res = await handleGoodsDelete({ id: row.id });
  if (res.data.code === 0) {
    loadGoodsList();
  }
};

const handleSave = async () => {
  console.log(product.value);
  const res = await handleGoodsEdit(product.value);
  if (res.data.code === 0) {
    dialogEdit.value = false;
  }
};

// 商品图片上传
const handleAvatarSuccess = (res: any) => {
  if (res.code === 0) {
    product.value.imgUrl = res.imgUrl;
  }
};

const handleCurrentChange = (page: any) => {
  currentPage.value = page;
  loadGoodsList();
};

const loadGoodsList = async () => {
  const res = await handleGoodsList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    name: searchForm.value.name,
    category: searchForm.value.category,
  });
  total.value = res.data.total;
  tableData.value = res.data.data;
};

const categoryNames = ref<string[]>([]);

const loadGoodsCategories = async () => {
  const res = await handleCategories();
  categoryNames.value = res.data;
};

onMounted(() => {
  loadGoodsList();
  loadGoodsCategories();
});
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 30px;
}

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
