<script setup lang="ts">
const {score} = defineProps<{
  score: number
}>()
</script>

<template>
  <div class="header">
    <div>
      <h1 class="title">声マネボイスクイズ</h1>
    </div>
    <div class="score">正答数: {{ score }}</div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  height: 100%;
  font-size: 18px;
}
</style>