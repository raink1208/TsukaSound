<script setup lang="ts">
import quiz from '../assets/voice/quiz.json';
import type {Quiz} from "../domain/quiz";
import {ref} from "vue";

const quizList: Quiz[] = quiz;

const getRandomQuiz = () => {
  return quizList[Math.floor(Math.random() * quizList.length)];
}

const selectedQuiz = ref<Quiz>(getRandomQuiz());

</script>

<template>
  <p>{{selectedQuiz.answer}}</p>
</template>

<style scoped>

</style>