<script setup lang="ts">
import Button from "primevue/button";
import {computed, onMounted, ref, watch} from "vue";
import QuizAudioPlayer from "./QuizAudioPlayer.vue";
import {AudioData} from "../domain/audio";
import VerticalOptionButton from "./VerticalOptionButton.vue";
import { Quiz, SelectOption } from "../domain/quiz";
import { useStore } from "vuex";

const path = import.meta.env.VITE_VOICE_PATH;

const props = defineProps<{
  quiz: Quiz
}>();


const emit = defineEmits<{
  (e: "next"): void;
}>()

const store = useStore();
const selectOptions = ref<SelectOption[]>();
const selectedAudio = ref<AudioData | null>(null);
const answer = ref<string | string[]>();

const showNext = ref<boolean>(false);

const loadQuiz = () => {
  const quiz = props.quiz;
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
  showNext.value = false;
}

onMounted(loadQuiz)
watch(props , loadQuiz);

const setPlayAudio = (option: SelectOption) => {
  selectedAudio.value = {
    audioName: option.label,
    filePath: path + option.name + ".mp3"
  }
}

const handleSubmitAnswer = () => {
  console.log(answer.value);
  const quiz = props.quiz;
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
  showNext.value = true;
}
</script>

<template>
  <div class="quiz-form">
    <QuizAudioPlayer :selectedAudio="selectedAudio" />
    <div :class="{options: true, showAnswer: showNext}" v-if="selectOptions">
      <VerticalOptionButton
        :options="selectOptions"
        :playAudio="setPlayAudio"
        :multiple="quiz.type === 'multi'"
        v-model="answer"
        :showAnswer="showNext"
      />
    </div>
    <div class="submit">
      <Button class="next" @click="emit('next')" v-if="showNext">次へ</Button>
      <Button class="submitAnswer" @click="handleSubmitAnswer" v-else>回答</Button>
    </div>
  </div>
</template>

<style scoped>
.quiz-form {
  width: 100%;
  padding-bottom: 15px;
}
.submitAnswer, .next {
  margin-top: 10px;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .submitAnswer, .next {
    height: 50px;
  }
}
</style>