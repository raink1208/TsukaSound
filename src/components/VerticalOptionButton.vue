<script setup lang="ts">
import Button from "primevue/button";
const {options} = defineProps<{
  options: string[];
}>();

const selected = defineModel();

const setValue = (option: string) => {
  selected.value = option;
}

</script>

<template>
  <div class="vertical">
    <Button
      v-for="(option, index) in options"
      :key="option.value"
      :label="'選択肢' + (index+1)"
      @click="setValue(option)"
      severity="secondary"
      :class="{selected: selected === option}"
    />
  </div>
</template>

<style scoped>
.vertical {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.p-button {
  display: block;
  width: 100%;
}

.p-button:hover {
  border: none;
}

:deep(button) {
  height: 35px;
  border: none;
  border-radius: 10px;

  font-weight: bold;
}

.selected {
  background-color: var(--p-button-secondary-active-background) !important;
}
</style>