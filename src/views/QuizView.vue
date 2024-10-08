<script setup lang="ts">
import quiz from '../assets/voice/quiz.json';
import type {Quiz} from "../domain/quiz";
import {computed, ref} from "vue";
import QuizHeader from '../components/QuizHeader.vue';
import QuizAnswerButtons from "../components/QuizAnswerButtons.vue";
import QuizQuestion from "../components/QuizQuestion.vue";
import {useQuizStore} from "../stores/quiz/quiz.ts";

const store = useQuizStore();
const nowId = computed(() => store.nowId);

const quizList: Quiz[] = quiz as Quiz[];
const selectedQuiz = ref<Quiz>(quizList[nowId.value]);


const nextQuiz = () => {
  if (!quizList[nowId.value+1]) {
    endQuiz();
    return;
  }
  store.incrementNowId();
  selectedQuiz.value = quizList[nowId.value];
}

const endQuiz = () => {
  console.log("end");
}

</script>

<template>
  <div class="header-area">
    <QuizHeader />
  </div>
  <div class="background">
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
}
.header-area {
  width: 100vw;
  height: 70px;
}
.container {
  position: relative;
  height: calc(100vh - 70px);
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