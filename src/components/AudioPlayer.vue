<script setup lang="ts">
import {ref, watch} from 'vue';
import ProgressBar from 'primevue/progressbar';

import PlayButton from "./icons/PlayButton.vue";
import PauseButton from "./icons/PauseButton.vue";

import type {AudioData} from "../domain/audio";

// Props 定義
const props = defineProps({
  selectedAudio: AudioData
});

// Refs とリアクティブデータ
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref('00.00');
const duration = ref('00.00');
const currentTimeSeconds = ref(0.00);
const durationSeconds = ref(0.00);
const volume = ref(0.5);

// メソッド: 再生/一時停止の切り替え
const togglePlay = () => {
  if (!audioPlayer.value) return;

  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play().catch(error => {
      console.error('再生エラー:', error);
      isPlaying.value = false;
    });
  }
  isPlaying.value = !isPlaying.value;
};

// メソッド: 再生終了時の処理
const onEnded = () => {
  isPlaying.value = false;
  currentTimeSeconds.value = 0.00;
};

// メソッド: 再生時間の更新
const updateTime = () => {
  if (!audioPlayer.value) return;
  currentTimeSeconds.value = audioPlayer.value.currentTime;
  currentTime.value = formatTime(audioPlayer.value.currentTime);
};

// メソッド: 総時間の取得と更新
const updateDuration = () => {
  if (!audioPlayer.value) return;
  durationSeconds.value = audioPlayer.value.duration;
  duration.value = formatTime(audioPlayer.value.duration);
};

// メソッド: シークバーで再生位置を変更
const seekAudio = () => {
  if (!audioPlayer.value) return;
  audioPlayer.value.currentTime = currentTimeSeconds.value;
};

// メソッド: 音量の調整
const changeVolume = () => {
  if (!audioPlayer.value) return;
  audioPlayer.value.volume = volume.value;
};

// ヘルパー関数: 秒数を mm:ss.xx 形式にフォーマット
const formatTime = (seconds) => {
  const secs = seconds % 60;
  const secsInt = Math.floor(secs);
  const fractional = Math.floor((secs - secsInt) * 100);
  return `${secsInt < 10 ? '0' : ''}${secsInt}.${fractional < 10 ? '0' : ''}${fractional}`;
};

// 監視: ファイル名やディレクトリが変更された場合のリセット
watch(
    () => props.selectedAudio,
    () => {
      isPlaying.value = false;
      currentTimeSeconds.value = 0.00;
      currentTime.value = '00.00';
      durationSeconds.value = 0.00;
      duration.value = '00.00';
      if (audioPlayer.value) {
        audioPlayer.value.pause();
        audioPlayer.value.currentTime = 0;
      }
    }
);
</script>

<template>
  <div class="play-button-container">
    <input
        id="seekBar"
        type="range"
        min="0"
        :max="durationSeconds"
        step="0.01"
        v-model="currentTimeSeconds"
        @input="seekAudio"
    />
    <div class="flex">
      <div id="audioPlayer">
        <audio
            ref="audioPlayer"
            :src="selectedAudio?.filePath"
            @ended="onEnded"
            @timeupdate="updateTime"
            @loadedmetadata="updateDuration"
        />

        <div id="play" @click="togglePlay">
          <PauseButton v-if="isPlaying" />
          <PlayButton v-else />
        </div>

        <span id="time">{{ currentTime }}/{{ duration }}</span>
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
    </div>
  </div>
</template>

<style scoped>
.play-button-container {
  position: fixed;
  bottom: 0;
  left: 0;

  padding-top: 8px;
  height: 60px;
  width: 100%;

  background-color: #fff;
}

.play-button-container #seekBar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.play-button-container .flex {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;

  padding: 8px 10px 0 10px;
}

.play-button-container #audioPlayer {
  display: flex;
  align-items: center;
}

.play-button-container #play {

}

.play-button-container #time {
  margin-left: 5px;
  user-select: none;
}

.play-button-container #audioName {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-weight: bold;
}

.play-button-container #volumeControl {
  margin-left: auto;
}

.play-button-container #volumeControl i {
  padding-right: 5px;
}

//color: #ef4444;
</style>
