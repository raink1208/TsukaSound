<script setup lang="ts">
import quiz from '../assets/voice/quiz.json';
import type {Quiz} from "../domain/quiz";
import {computed, ref} from "vue";
import QuizHeader from '../components/QuizHeader.vue';
import QuizAnswerButtons from "../components/QuizAnswerButtons.vue";
import QuizQuestion from "../components/QuizQuestion.vue";
import {useStore} from "vuex";

const quizList: Quiz[] = quiz;
const store = useStore();
const quizScore = computed(() => store.getters["quiz/getScore"]);

const questionCount = ref(0);

const getRandomQuiz = () => {
  if (quizList.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * quizList.length);
  const [item] = quizList.splice(randomIndex, 1);
  questionCount.value = questionCount.value + 1;
  return item;
}
const selectedQuiz = ref<Quiz | null>(getRandomQuiz());
</script>

<template>
  <div class="header-area">
    <QuizHeader :score="quizScore" />
  </div>
  <div class="container" v-if="selectedQuiz">
    <div class="question-area" >
      <QuizQuestion :question="selectedQuiz.question" />
    </div>
    <div class="answers-area">
      <QuizAnswerButtons :quiz="selectedQuiz"/>
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
  height: 70px;
}
.container {
  position: relative;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1000px;
  width: 80vw;
}
.answers-area {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

@media screen and (max-width: 600px) {
  .container {
    width: 100vw;
    padding: 0 10px;
  }

  .answers-area {
    width: 90%;
  }
}
</style>