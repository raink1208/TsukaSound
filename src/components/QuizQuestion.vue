<script setup lang="ts">
import Card from "primevue/card";
import {useStore} from "vuex";
import {computed} from "vue";
const {question, questionId} = defineProps<{
  question: string;
  questionId: number;
}>();
const store = useStore();
const quizScore = computed(() => store.getters["quiz/getScore"]);

</script>

<template>
  <div class="wrapper">
    <p>{{questionId}}問中 {{quizScore}}問正解</p>
    <Card>
      <template #title>Q. {{questionId + 1}}</template>
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