<script setup lang="ts">
import quiz from '../assets/voice/quiz.json';
import type {Quiz} from "../domain/quiz";
import {computed, ref} from "vue";
import QuizAnswerButtons from "../components/QuizAnswerButtons.vue";
import QuizQuestion from "../components/QuizQuestion.vue";
import QuizHeader from "../components/QuizHeader.vue";
import {useStore} from "vuex";

const quizList: Quiz[] = quiz;

const store = useStore();
const quizScore = computed(() => store.getters["quiz/getScore"]);

const getRandomQuiz = () => {
  if (quizList.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * quizList.length);
  const [item] = quizList.splice(randomIndex, 1);
  return item;
}

const selectedQuiz = ref<Quiz>(getRandomQuiz());

const handleSubmitAnswer = (answer: string) => {
  if (selectedQuiz.value.answer == answer) {
    store.commit("quiz/incrementScore");
  }
}

</script>

<template>
  <div class="header-area">
    <QuizHeader :score="quizScore" />
  </div>
  <div class="container">
    <div class="question-area">
      <quizQuestion :question="selectedQuiz.question" />
    </div>
    <div class="answers-area">
      <QuizAnswerButtons :options="selectedQuiz.options" @submitAnswer="handleSubmitAnswer" />
    </div>
  </div>
</template>

<style scoped>
body {
  height: 100vh;
  overflow: hidden;
}

.header-area {
  width: 100vw;
  height: 50px;
}

.container {
  position: relative;
  height: calc(100vh - 50px);
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1000px;
  width: 80vw;
}

.answers-area {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
}
</style>