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
    <p>領国つかさの声マネキング配信から切り抜いたボイスを再生することができます<br> 本配信はこちら -> <a href="https://www.youtube.com/watch?v=gPIrDxX1D4I">https://www.youtube.com/watch?v=gPIrDxX1D4I</a> </p>
    <VoiceDataTable @selectAudio="selectAudio" />
    <AudioPlayer :selectedAudio="selectedAudio" />
  </div>
</template>

<style scoped>
h1 {
  margin: 10px 15px 0 15px;
}
p {
  margin: 5px 10px 5px 10px;
}
.container:nth-last-child(1) {
  padding-bottom: 70px;
}
</style>
