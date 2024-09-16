<script setup lang="ts">
import VoiceDataTable from "./components/VoiceDataTable.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import {ref} from "vue";
import type {AudioData} from "./domain/audio";

const selectedAudio = ref<AudioData | null>(null);

const selectAudio = (audioData: AudioData) => {
  selectedAudio.value = audioData;
}

</script>

<template>
  <div class="container">
    <h1>領国つかさ ボタン</h1>
    <p>声マネキングで収録したボイスを再生できます<br><a href="https://www.youtube.com/watch?v=gPIrDxX1D4I">本配信はこちら</a></p>
    <VoiceDataTable @selectAudio="selectAudio" />
    <AudioPlayer :selectedAudio="selectedAudio" />
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.8rem;
  margin: 10px 15px 0 15px !important;
}

p {
  margin: 5px 10px 5px 10px !important;
}
.container:nth-last-child(1) {
  padding-bottom: 70px;
}
</style>
