<script setup lang="ts">
</script>

<template>
  <div class="header">
    <h1 class="title">声マネボイスクイズ</h1>
    <div class="links">
      <a href="/">ボイス一覧を見る</a>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 100%;
  border-bottom: 1px solid var(--p-content-border-color);
}

.links {
  float: right;
  margin-right: 10vw;
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