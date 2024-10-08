<script setup lang="ts">
import Card from "primevue/card";
const {question} = defineProps<{
  question: string;
}>();
</script>

<template>
  <div class="wrapper">
    <Card>
      <template #title></template>
      <template #content>
        <p>{{question}}</p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: 50px;
}
</style>