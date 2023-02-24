<template>
  <div class="card-wrapper">
    <img width="80" height="80" v-if="data.imgurl" :src="data.imgurl" />

    <div class="text">
      <h3 class="title">{{ data.title }}</h3>
      <p class="num">{{ data.num }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<style lang="scss" scoped>
.card-wrapper {
  align-items: center;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 4px;
  width: 280px;
  height: 130px;
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
</style>
