<script setup lang="ts">
import voice from '../assets/voice/voice.json';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import {ref} from "vue";

import { FilterMatchMode } from '@primevue/core/api';

const path = import.meta.env.VITE_VOICE_PATH;

const emit = defineEmits(["selectAudio"]);

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  title: {value: null, matchMode: FilterMatchMode.CONTAINS},
  score: {value: [0, 100], matchMode: FilterMatchMode.BETWEEN},
  rank: {value: null, matchMode: FilterMatchMode.IN},
});

const ranks = ['S', 'A', 'B', 'C'];

const handlePlayVoice = async (event: any) => {
  const voiceName = event.data.title;
  const voiceFile = path + voiceName + ".mp3";
  const audioData = {
    audioName: voiceName,
    filePath: voiceFile
  }
  emit("selectAudio", audioData);
};

const handleDownload = async (voiceName: string) => {
  try {
    const voiceFile = path + voiceName + ".mp3";
    const response = await fetch(voiceFile, {
      mode: "cors"
    });
    const blob = await response.blob();
    const downloadTag = document.createElement("a");
    downloadTag.href = URL.createObjectURL(blob);
    downloadTag.download = voiceName;
    downloadTag.click();
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <DataTable filter-display="row" v-model:filters="filters" class="voiceTable" stripedRows scrollable scrollHeight="80vh" :value="voice" @row-click="handlePlayVoice($event)">
    <Column field="title" sortable header="タイトル" style="min-width: 20%" :show-filter-menu="false">
      <template #filter="{ filterModel, filterCallback}">
        <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="タイトル" />
      </template>
    </Column>
    <Column field="score" sortable header="点数" style="min-width: 5%" />
    <Column field="rank" sortable header="ランク" style="min-width: 5%" :show-filter-menu="false">
      <template #filter="{ filterModel, filterCallback}">
        <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="ranks" placeholder="ランク" :show-toggle-all="false"/>
      </template>
    </Column>
    <Column field="title" header="再生" style="width: 5%">
      <template #body="{data}">
        <Button icon="pi pi-download" aria-label="download" @click="handleDownload(data.title)" />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
.voiceTable {
  width: 100vw;
}

:deep(.p-datatable-table tr:hover) {
  background-color: #ddd !important;
}

</style>