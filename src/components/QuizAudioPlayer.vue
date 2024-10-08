<script setup lang="ts">
import {ref, watch} from "vue";
import {AudioData} from "../domain/audio";
import PauseButton from "./icons/PauseButton.vue";
import PlayButton from "./icons/PlayButton.vue";

interface AudioDataProps {
  selectedAudio: AudioData | null;
}

const {selectedAudio} = defineProps<AudioDataProps>();

const audioPlayer = ref<HTMLAudioElement>();

const isPlaying = ref(false);
const volume = ref(0.5);

const onLoad = () => {
  audioPlayer.value?.play();
  isPlaying.value = true;
}

const onEnded = () => {
  isPlaying.value = false;
};

const changeVolume = () => {
  if (!audioPlayer.value) return;
  audioPlayer.value.volume = volume.value;
};

const togglePlay = () => {
  if (!audioPlayer.value) return;

  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.currentTime = 0.0;
    audioPlayer.value.play().catch((error: any) => {
      console.error('再生エラー:', error);
      isPlaying.value = false;
    });
  }
  isPlaying.value = !isPlaying.value;
};

</script>

<template>
  <audio
    ref="audioPlayer"
    :src="selectedAudio?.filePath"
    @loadedmetadata="onLoad"
    @ended="onEnded"
  />

  <div id="play" @click="togglePlay">
    <PauseButton v-if="isPlaying" />
    <PlayButton v-else />
  </div>
  <p id="audioName">{{selectedAudio?.audioName}}</p>
  <div id="volumeControl">
    <i class="pi pi-volume-up" />
    <input
      id="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      @input="changeVolume"
    />
  </div>
</template>

<style scoped>

</style>