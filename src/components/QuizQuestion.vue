<script setup lang="ts">
import Card from "primevue/card";
const {question} = defineProps<{
  question: string;
}>();
</script>

<template>
  <Card>
    <template #content>
      <p>{{question}}</p>
    </template>
  </Card>
</template>

<style scoped>

</style>