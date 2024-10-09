<script setup lang="ts">
import quiz from '../assets/voice/quiz.json';
import type {Quiz} from "../domain/quiz";
import {ref} from "vue";
import QuizHeader from '../components/QuizHeader.vue';
import QuizAnswerButtons from "../components/QuizAnswerButtons.vue";
import QuizQuestion from "../components/QuizQuestion.vue";
import QuizResult from "../components/QuizResult.vue";

const nowId = ref<number>(0);

const quizList: Quiz[] = quiz as Quiz[];
const selectedQuiz = ref<Quiz | null>(quizList[0]);
const showResult = ref<boolean>(false);

const nextQuiz = () => {
  if (!quizList[nowId.value+1]) {
    endQuiz();
    return;
  }
  nowId.value += 1;
  selectedQuiz.value = quizList[nowId.value];
}

const endQuiz = () => {
  selectedQuiz.value = null;
  showResult.value = true;
}

</script>

<template>
  <div class="header-area">
    <QuizHeader />
  </div>
  <div class="background">
    <div class="container" v-if="showResult">
      <QuizResult />
    </div>
    <div class="container" v-if="selectedQuiz">
      <div class="question-area" >
        <QuizQuestion :question="selectedQuiz.question" :questionId="selectedQuiz.questionId"/>
      </div>
      <div class="answers-area">
        <QuizAnswerButtons :quiz="selectedQuiz" @next="nextQuiz" />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  height: 100vh;
  overflow: hidden;
}
.background {
  background-color: var(--p-surface-200);
  height: calc(100vh - 70px);
}
.header-area {
  width: 100vw;
  height: 70px;
}
.container {
  position: relative;
  height: 100%;
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