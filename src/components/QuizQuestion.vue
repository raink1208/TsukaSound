<script setup lang="ts">
import Card from "primevue/card";
import {computed} from "vue";
import {useQuizStore} from "../stores/quiz/quiz.ts";
const {question, questionId} = defineProps<{
  question: string;
  questionId: number;
}>();
const store = useQuizStore();
const quizScore = computed(() => store.quizScore);
const answered = computed(() => store.answered);

</script>

<template>
  <div class="question">
    <p class="score">{{answered}}問中 {{quizScore}}問正解</p>
    <Card>
      <template #title>Q. {{questionId + 1}}</template>
      <template #content>
        <p>{{question}}</p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.question {
  padding-top: 50px;
}

.score {
  text-align: right;
  margin-right: 10px;
  margin-bottom: 10px;
}

</style>