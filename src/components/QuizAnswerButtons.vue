<script setup lang="ts">
import Button from "primevue/button";
import {ref, watch} from "vue";
import QuizAudioPlayer from "./QuizAudioPlayer.vue";
import {AudioData} from "../domain/audio";
import VerticalOptionButton from "./VerticalOptionButton.vue";

const path = import.meta.env.VITE_VOICE_PATH;

const {options} = defineProps<{
  options: string[]
}>();

const emits = defineEmits<{
  (e: "submitAnswer", answer: string | null): void
}>();

const selected = ref<string | null>(null);
const selectedAudio = ref<AudioData | null>(null);

const handleSubmitAnswer = () => {
  emits("submitAnswer", selected.value);
}

watch(selected, () => {
  const voiceName = selected.value;
  const num = options.indexOf(voiceName) + 1;
  const voiceFile = path + voiceName + ".mp3";
  selectedAudio.value = {
    audioName: `選択肢${num}`,
    filePath: voiceFile
  }
});

</script>

<template>
  <div class="quiz-form">
    <QuizAudioPlayer :selectedAudio="selectedAudio" />
    <div class="options">
      <VerticalOptionButton :options="options" v-model="selected" />
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