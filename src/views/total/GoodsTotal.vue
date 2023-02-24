<template>
  <div>
    <div ref="chart" class="chart" style="height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { handleGoodsSales } from "@/api/goods";

const chart = ref(null);
const categories = ref<any>([]);
const salesData = ref<any>([]);

const fetchData = async () => {
  const salesResponse = await handleGoodsSales();

  const categoriesSet = new Set();
  salesResponse.data.forEach((sale: any) => categoriesSet.add(sale.category));
  categories.value = Array.from(categoriesSet);

  salesData.value = salesResponse.data
    .filter((sale: any) => sale.total_sales > 0)
    .map((sale: any) => ({ name: sale.category, value: sale.total_sales }));
};

onMounted(async () => {
  await fetchData();

  const myChart = echarts.init(chart.value!);

  const option = {
    title: {
      text: "商品统计",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: 30,
      bottom: 20,
      data: categories.value,
    },
    series: [
      {
        name: "Sales",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: salesData.value,
      },
    ],
  };

  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .chart {
    height: 300px;
  }
}
</style>
