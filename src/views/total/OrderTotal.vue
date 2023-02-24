<template>
  <div class="order-total">
    <el-form size="small" :inline="true" :model="searchForm">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div ref="chart" class="box"></div>
  </div>
</template>

<script setup lang="ts">
import { getOrderTotal } from "@/api/order";
import * as echarts from "echarts";
import moment from "moment";

const searchForm = ref<any>({
  date: [],
});

const chart = ref(null);
const renderChart = (xData: any, yData: any) => {
  const myChart = echarts.init(chart.value!);

  // 2. 写配置
  let options = {
    color: ["#80FFA5"],
    title: {
      text: "订单统计",
      textStyle: {
        color: "#999",
        fontSize: 16,
      },
      top: 10,
      left: 10,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["订单金额"],
      top: 10,
    },
    // 工具盒子
    toolbox: {
      right: 30,
      feature: {
        saveAsImage: {},
        dataView: {},
        magicType: {
          type: ["line", "bar"],
        },
      },
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "订单金额",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: yData,
      },
    ],
  };

  myChart.setOption(options);
};

const search = () => {
  getData();
};

const getData = async () => {
  const res = await getOrderTotal({
    date: searchForm.value.date
      ? JSON.stringify(searchForm.value.date)
      : JSON.stringify([]),
  });

  const xData = res.data.data.map((v: any) =>
    moment(v.orderTime).format("YYYY-MM-DD")
  );

  const yData = res.data.data.map((v: any) => v.orderAmount);

  renderChart(xData, yData);
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.box {
  height: 400px;
  background-color: #fff;
}
</style>
