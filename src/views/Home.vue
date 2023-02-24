<template>
  <div class="home">
    <div class="card-container">
      <div class="card-wrapper" v-for="(data, i) in cardData">
        <img width="80" height="80" v-if="data.imgurl" :src="data.imgurl" />

        <div class="text">
          <h3 class="title">{{ data.title }}</h3>
          <p class="num">{{ data.num }}</p>
        </div>
      </div>
    </div>
    <div ref="chart" class="box"></div>
  </div>
</template>

<script setup lang="ts">
import all_orders from "~/imgs/all_orders.png";
import all_sales from "~/imgs/all_sales.png";
import today_orders from "~/imgs/today_orders.png";
import today_sales from "~/imgs/today_sales.png";

import { getTotalData } from "api/order";

import * as echarts from "echarts";

const cardData = ref<any>([
  {
    id: 1,
    imgurl: all_orders,
    title: "总订单",
    num: 200,
  },
  {
    id: 2,
    imgurl: all_sales,
    title: "总销售额",
    num: 200,
  },
  {
    id: 3,
    imgurl: today_orders,
    title: "今日订单",
    num: 200,
  },
  {
    id: 4,
    imgurl: today_sales,
    title: "今日销售额",
    num: 200,
  },
]);

const chart = ref(null);

const renderChart = (xData: any, orderData: any, amountData: any) => {
  const myChart = echarts.init(chart.value!);

  // 2. 写配置
  let options = {
    color: ["#80FFA5", "#00DDFF"],
    title: {
      text: "数据统计",
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
      data: ["订单统计", "销售统计"],
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
        name: "订单统计",
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
        data: orderData,
      },
      {
        name: "销售统计",
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
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: amountData,
      },
    ],
  };

  myChart.setOption(options);
};

onMounted(async () => {
  const res = await getTotalData();

  const {
    totalOrder,
    totalAmount,
    todayOrder,
    totayAmount,
    xData,
    orderData,
    amountData,
  } = res.data;

  [totalOrder, totalAmount, todayOrder, totayAmount].forEach((v, i) => {
    cardData.value[i].num = v;
  });

  renderChart(xData, orderData, amountData);
});
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  justify-content: space-around;
}

.card-wrapper {
  align-items: center;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 4px;
  width: 280px;
  height: 130px;
  margin: 10px;
  .text {
    letter-spacing: 1px;
    .title {
      color: #333;
    }
    .num {
      margin-top: 10px;
      font-size: 20px;
      color: #999;
      font-weight: 700;
    }
  }
}

.box {
  margin-top: 30px;
  width: 100%;
  height: 400px;
  background-color: #fff;
}

// 媒体查询适配
@media screen and (min-width: 1300px) {
  .card {
    width: 250px;
    height: 120px;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1300px) {
  .card {
    width: 200px;
    height: 110px;

    ::v-deep(.text) {
      .title {
        color: red;
        font-size: 20px !important;
      }

      .num {
        font-size: 16px !important;
      }
    }
  }
}

// 最大宽度1100px 里面的css才生效
@media screen and (max-width: 1100px) {
  .card-container {
    flex-wrap: wrap;

    .card {
      width: 48%;
      margin-top: 30px;
      margin-right: 10px;
      height: 110px;

      ::v-deep(.text) {
        .title {
          color: red;
          font-size: 20px !important;
        }

        .num {
          font-size: 16px !important;
        }
      }
    }
  }
}
</style>
