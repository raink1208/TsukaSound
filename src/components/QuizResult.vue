<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import {useQuizStore} from "../stores/quiz/quiz.ts";
import {computed} from "vue";

const INTENT_URL_BASE = import.meta.env.VITE_RESULT_TWEET_INTENT;
const INTENT_TEMPLATE = import.meta.env.VITE_RESULT_TWEET_TEMPLATE;

const store = useQuizStore();
const score = computed(() => store.quizScore);
const answered = computed(() => store.answered);

const tweetResult = () => {
  let content = INTENT_TEMPLATE.replaceAll("{ANSWERED}", answered.value);
  content = content.replaceAll("{SCORE}", score.value);

  const tweetUrl = INTENT_URL_BASE + encodeURI(content);
  window.open(tweetUrl, "_blank");
}
</script>

<template>
  <div class="resultContainer">
    <Card>
      <template #header>
        <h2 class="title">領国つかさ 声マネキングボイスクイズ</h2>
      </template>
      <template #content>
        <p class="result">
          {{answered}}問中 {{score}}問正解しました
        </p>
        <a class="resetQuiz" href="/quiz">最初に戻る</a>
      </template>
    </Card>
    <div class="tweet">
      <Button @click="tweetResult" severity="info">X(Twitter)に結果を投稿</Button>
    </div>
  </div>
</template>

<style scoped>
.resultContainer {
  padding-top: 30px;
}
.p-card {
  position: relative;
  height: 50vh;
}
.title {
  padding-left: 10px;
}

.result {
  font-size: 25px;
}

.resetQuiz {
  position: absolute;
  bottom: 30px;
  right: 35px;
}

.tweet {
  margin-top: 2vh;
  text-align: center;
}

.tweet .p-button {
  padding: 10px 30px;
  font-weight: bold;
}
</style>