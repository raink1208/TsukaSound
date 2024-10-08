<script setup lang="ts">
import SelectButton from "primevue/selectbutton";
const {options} = defineProps<{
  options: string[];
}>();

const selected = defineModel();

</script>

<template>
  <div class="vertical">
    <SelectButton v-model="selected" :options="options" :unstyled="true" />
  </div>
</template>

<style scoped>
.vertical {
  margin-bottom: 10px;
}

.vertical div{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(button) {
  height: 35px;
  border: none;
  border-radius: 10px;

  font-weight: bold;
}

:deep(button[data-p-checked="true"]) {
  background-color: var(--p-button-secondary-active-background) !important;
}

:deep(button:not(:disabled):hover) {
  background: var(--p-button-secondary-hover-background);
  border: 1px solid var(--p-button-secondary-hover-border-color);
  color: var(--p-button-secondary-hover-color);
}
</style>