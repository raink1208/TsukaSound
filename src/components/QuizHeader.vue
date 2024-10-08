<script setup lang="ts">
const {score} = defineProps<{
  score: number
}>()
</script>

<template>
  <div class="header">
    <h1 class="title">声マネボイスクイズ</h1>
  </div>
  <div>

  </div>
</template>

<style scoped>
.header {
  display: flex;
  height: 100%;
  border-bottom: 1px solid var(--p-content-border-color);
}

.title {
  padding-top: 10px;
  padding-left: 10px;
  font-size: 30px;
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 25px;
  }
}
</style>