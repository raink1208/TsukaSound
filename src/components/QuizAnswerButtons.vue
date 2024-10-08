<script setup lang="ts">
import Button from "primevue/button";
import {onMounted, ref, watch} from "vue";
import QuizAudioPlayer from "./QuizAudioPlayer.vue";
import {AudioData} from "../domain/audio";
import VerticalOptionButton from "./VerticalOptionButton.vue";
import { Quiz, SelectOption } from "../domain/quiz";
import { useStore } from "vuex";

const path = import.meta.env.VITE_VOICE_PATH;

const { quiz } = defineProps<{
  quiz: Quiz
}>();

const store = useStore();
const selectOptions = ref<SelectOption[]>();
const selectedAudio = ref<AudioData | null>(null);
const answer = ref<string | string[]>();

onMounted(() => {
  if (quiz.type === "single") {
    answer.value = "";
  } else {
    answer.value = [];
  }
  const result: SelectOption[] = [];
  for (let i = 0; i < quiz.options.length; i++) {
    const name = quiz.options[i] ?? "";
    let isAnswer = false;
    if (typeof(quiz.answer) === 'string') {
      isAnswer = quiz.answer === name;
    } else {
      isAnswer = quiz.answer.includes(name);
    }
    result.push({
      name: name,
      label: `選択肢${i+1}`,
      isAnswer: isAnswer
    })
  }
  selectOptions.value = result;
});

const setPlayAudio = (option: SelectOption) => {
  selectedAudio.value = {
    audioName: option.label,
    filePath: path + option.name + ".mp3"
  }
}

const handleSubmitAnswer = () => {
  if (!answer.value) return;
  if (quiz.type === "multi") {
    const arr1 = answer.value as string[];
    const arr2 = quiz.answer as string[];
    if (arr1.length === arr2.length && arr1.every(it => arr2.includes(it))) {
      store.commit("quiz/incrementScore");
    }
  } else {
    if ((quiz.answer as string) == (answer.value as string)) {
      store.commit("quiz/incrementScore");
    }
  }
}
</script>

<template>
  <div class="quiz-form">
    <QuizAudioPlayer :selectedAudio="selectedAudio" />
    <div class="options" v-if="selectOptions">
      <VerticalOptionButton
        :options="selectOptions"
        :playAudio="setPlayAudio"
        :multiple="quiz.type === 'multi'"
        v-model="answer"
      />
    </div>
    <div class="submit">
      <Button class="submitAnswer" @click="handleSubmitAnswer">回答</Button>
    </div>
  </div>
</template>

<style scoped>
.quiz-form {
  width: 100%;
  padding-bottom: 15px;
}
.submitAnswer {
  margin-top: 10px;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .submitAnswer {
    height: 50px;
  }
}
</style>