<template>
  <div class="order">
    <el-card>
      <div class="title">订单管理</div>

      <div class="content">
        <!-- 表单 -->
        <el-form
          size="small"
          :inline="true"
          :model="searchForm"
          ref="searchFormRef"
        >
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo"></el-input>
          </el-form-item>

          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="searchForm.consignee"></el-input>
          </el-form-item>

          <!-- 手机号 -->
          <el-form-item label="手机号">
            <el-input v-model="searchForm.phone"></el-input>
          </el-form-item>

          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.orderState">
              <el-option value="已受理"></el-option>
              <el-option value="派送中"></el-option>
              <el-option value="已完成"></el-option>
            </el-select>
          </el-form-item>

          <!-- 下单时间 -->
          <br />
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="searchForm.date"
              value-format="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="reset" type="success">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData">
          <!-- 订单号 -->
          <el-table-column fixed prop="orderNo" label="订单号" width="80">
          </el-table-column>

          <!-- 下单时间 -->
          <el-table-column prop="orderTime" label="下单时间" width="120">
          </el-table-column>

          <!-- 手机号 -->
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>

          <!-- 收货人 -->
          <el-table-column prop="consignee" label="收货人" width="100">
          </el-table-column>

          <!-- 配送地址 -->
          <el-table-column prop="deliverAddress" label="配送地址" width="100">
          </el-table-column>

          <!-- 送达时间 -->
          <el-table-column prop="deliveryTime" label="送达时间" width="120">
          </el-table-column>

          <!-- 用户备注 -->
          <el-table-column prop="remarks" label="用户备注" width="100">
          </el-table-column>

          <!-- 订单金额 -->
          <el-table-column prop="orderAmount" label="订单金额" width="100">
          </el-table-column>

          <!-- 订单状态 -->
          <el-table-column prop="orderState" label="订单状态" width="100">
          </el-table-column>

          <!-- 操作 -->
          <el-table-column fixed="right" label="操作" width="140">
            <template #default="{ row }">
              <el-button @click="showDialog(row)" size="small">查看 </el-button>
              <el-button @click="handleEdit(row)" size="small">编辑</el-button>
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
        <el-dialog v-model="dialogVisible" title="订单详情">
          <el-row>
            <el-col :span="12">
              <el-descriptions :bordered="true" :column="Number(1)">
                <el-descriptions-item label="订单编号">{{
                  order.orderNo
                }}</el-descriptions-item>
                <el-descriptions-item label="订单状态">{{
                  order.orderState
                }}</el-descriptions-item>
                <el-descriptions-item label="下单时间">{{
                  order.orderTime
                }}</el-descriptions-item>
                <el-descriptions-item label="收货人">{{
                  order.consignee
                }}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{
                  order.phone
                }}</el-descriptions-item>
                <el-descriptions-item label="收货地址">{{
                  order.deliverAddress
                }}</el-descriptions-item>
                <el-descriptions-item label="配送时间">{{
                  order.deliveryTime
                }}</el-descriptions-item>
                <el-descriptions-item label="备注">{{
                  order.remarks
                }}</el-descriptions-item>
                <el-descriptions-item label="订单金额">{{
                  order.orderAmount
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
        <el-dialog title="编辑订单" v-model="dialogEdit">
          <!-- 表单 -->
          <el-form
            ref="editFormRef"
            size="small"
            :model="order"
            label-width="80px"
            status-icon
          >
            <!-- 订单号 -->
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="order.orderNo"></el-input>
            </el-form-item>

            <!-- 下单时间 -->
            <el-form-item label="下单时间">
              <el-date-picker
                v-model="order.orderTime"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
              >
              </el-date-picker>
            </el-form-item>

            <!-- 手机号 -->
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="order.phone"></el-input>
            </el-form-item>

            <!-- 收货人 -->
            <el-form-item label="收货人" prop="consignee">
              <el-input v-model="order.consignee"></el-input>
            </el-form-item>

            <!-- 配送地址 -->
            <el-form-item label="配送地址" prop="deliverAddress">
              <el-input v-model="order.deliverAddress"></el-input>
            </el-form-item>

            <!-- 下单时间 -->
            <el-form-item label="送达时间">
              <el-date-picker
                v-model="order.deliveryTime"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
              >
              </el-date-picker>
            </el-form-item>

            <!-- 用户备注 -->
            <el-form-item label="用户备注" prop="remarks">
              <el-input v-model="order.remarks"></el-input>
            </el-form-item>

            <!-- 订单金额 -->
            <el-form-item label="订单金额" prop="orderAmount">
              <el-input v-model="order.orderAmount"></el-input>
            </el-form-item>

            <!-- 订单状态 -->
            <el-form-item label="订单状态">
              <el-select v-model="order.orderState">
                <el-option value="已受理"></el-option>
                <el-option value="派送中"></el-option>
                <el-option value="已完成"></el-option>
              </el-select>
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
import { handleOrderEdit, handleOrderList } from "@/api/order";
import moment from "moment";

const tableData = ref<any>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);

const order = ref<any>({});
const dialogVisible = ref<boolean>(false);
const dialogEdit = ref<boolean>(false);

const width = computed(() =>
  document.body.clientWidth > 1000
    ? document.body.clientWidth - 320
    : document.body.clientWidth - 184
);

const handleSave = async () => {
  const res = await handleOrderEdit(order.value);
  if (res.data.code === 0) {
    dialogEdit.value = false;
  }
};

const handleEdit = (row: any) => {
  dialogEdit.value = true;
  order.value = row;
};

const showDialog = (row: any) => {
  dialogVisible.value = true;
  order.value = row;
  console.log(order.value);
};

const searchForm = ref<any>({
  orderNo: "",
  consignee: "",
  phone: "",
  orderState: "",
  date: [],
});

const search = () => {
  loadOrderList();
};

const reset = () => {
  searchForm.value = {
    orderNo: "",
    consignee: "",
    phone: "",
    orderState: "",
    date: [],
  };
};

// 分页的切换
const handleCurrentChange = (page: any) => {
  currentPage.value = page;
  loadOrderList();
};

const loadOrderList = async () => {
  const res = await handleOrderList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm.value,
    date: searchForm.date ? JSON.stringify(searchForm.date) : "",
  });

  res.data.data.forEach((item: any) => {
    item.orderTime = moment(item.orderTime).format("YYYY-MM-DD");
    item.deliveryTime = moment(item.deliveryTime).format("YYYY-MM-DD");
  });

  total.value = res.data.total;
  tableData.value = res.data.data;
};

onMounted(loadOrderList);
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 30px;
}

.order-detail {
  color: red;
  .orderid {
    font-size: 80px;
  }
}

.el-icon-close {
  position: absolute;
  right: auto !important;
  left: 10px;
}
</style>
