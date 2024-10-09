<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AudioData} from "../domain/audio";
import PauseButton from "./icons/PauseButton.vue";
import PlayButton from "./icons/PlayButton.vue";

interface AudioDataProps {
  selectedAudio: AudioData | null;
}

const {selectedAudio} = defineProps<AudioDataProps>();

const audioPlayer = ref<HTMLAudioElement>();

const isPlaying = ref(false);
const volume = ref(0.25);

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

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value;
  }
});
</script>

<template>
  <div class="audioPlayerContainer">
    <audio
      ref="audioPlayer"
      :src="selectedAudio?.filePath"
      @loadedmetadata="onLoad"
      @ended="onEnded"
    />

    <div id="audioControl">
      <div id="play" @click="togglePlay">
        <PauseButton v-if="isPlaying" />
        <PlayButton v-else />
      </div>
      <p id="audioName">再生: {{selectedAudio?.audioName ?? "未選択"}}</p>
    </div>
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
  </div>
</template>

<style scoped>

.audioPlayerContainer {
  display: flex;
  justify-content: space-between;

  height: 40px;
}

#audioControl {
  display: flex;
}

#audioName {
  line-height: 40px;
}

#volumeControl {
  line-height: 40px;
}

@media screen and (max-width: 350px) {
  #volumeControl input {
    width: 100px;
  }
}
</style>