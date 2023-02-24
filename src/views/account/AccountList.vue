<template>
  <div class="account-list">
    <el-card class="box-card">
      <header class="title">
        <span>账号列表</span>
      </header>
      <section class="content">
        <!-- 表格 -->
        <el-table
          @selection-change="handleSelectionChange"
          :data="data"
          class="account-list"
          ref="accountTable"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"> </el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号" width="120">
          </el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="120">
          </el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="200">
            <template #default="{ row }">{{
              moment(row.ctime).fromNow()
            }}</template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column>
            <!-- 按钮 -->
            <template #header v-if="auth.userGroup === '超级管理员'">
              <el-button @click="handleBatchDelete" size="small" type="danger">
                批量删除</el-button
              >
              <el-button @click="cancelSelect" size="small" type="primary"
                >取消选择</el-button
              >
            </template>
            <template #default="{ row }" v-if="auth.userGroup === '超级管理员'">
              <el-button size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button size="small" @click="handleDelete(row)" type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <!-- 弹窗 -->
        <el-dialog v-model="dialogVisible" title="编辑账号" width="360px">
          <!-- 表单 -->
          <template #default>
            <el-form
              ref="editForm"
              :model="editFormData"
              size="small"
              label-width="80px"
              status-icon
            >
              <!-- 账号 -->
              <el-form-item label="账号" prop="account">
                <el-input
                  v-model="editFormData.account"
                  class="account-input"
                ></el-input>
              </el-form-item>

              <!-- 用户组 -->
              <el-form-item label="用户组" prop="userGroup">
                <el-select
                  v-model="editFormData.userGroup"
                  placeholder="请选择用户组"
                >
                  <el-option value="普通用户"></el-option>
                  <el-option value="超级管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>

          <template #footer>
            <el-button size="small" @click="dialogVisible = false">
              取 消
            </el-button>
            <el-button @click="handleSave" size="small" type="primary"
              >确定</el-button
            >
          </template>
        </el-dialog>
      </section>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { Data } from "../../types";
import {
  handleAccountBatchDelete,
  handleAccountDelete,
  handleAccountEdit,
  handleAccountList,
} from "../../api/users";
import moment from "moment";
import jwt_decode from "jwt-decode";

const data = ref<Data[]>([]);
const currentPage = ref(1);
const pageSize = ref(3);
const pageSizes = ref([1, 2, 3]);
const total = ref(0);
const dialogVisible = ref(false);
const ids = ref<number[]>([]);
const accountTable = ref();

// const role = localStorage.getItem("role");
const token = localStorage.getItem("token");
const auth: any = jwt_decode(token!);

const editFormData = reactive({
  account: "",
  userGroup: "",
  id: "",
});

const renderAccountList = async () => {
  const res = await handleAccountList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
  ({ data: data.value, total: total.value } = await res.data);
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  renderAccountList();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  renderAccountList();
};

const handleEdit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(editFormData, row);
};

const handleSave = async () => {
  dialogVisible.value = false;
  const res = await handleAccountEdit(editFormData);
  if (res.data.code === 0) renderAccountList();
};

const handleDelete = async (row: any) => {
  const res = await handleAccountDelete({ id: row?.id });
  if (res?.data?.code === 0) renderAccountList();
};

const handleSelectionChange = (rows: any) => {
  ids.value = rows?.map((v: any) => v?.id) ?? [];
};

const handleBatchDelete = async () => {
  if (!ids.value.length) return;
  const res = await handleAccountBatchDelete({ ids: ids.value });
  if (res?.data?.code === 0) renderAccountList();
};

const cancelSelect = () => accountTable.value?.clearSelection?.();
onMounted(renderAccountList);
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 3vh;
}
.el-pagination {
  margin-top: 20px;
  margin-bottom: 20px;
}

.account-list {
  max-width: 100%;
}

.account-input {
  width: 172px;
}
</style>
