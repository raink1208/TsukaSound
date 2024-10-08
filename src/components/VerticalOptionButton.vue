<script setup lang="ts">
import Button from "primevue/button";
import { SelectOption } from "../domain/quiz";

const {options, playAudio, multiple, showAnswer} = defineProps<{
  options: SelectOption[];
  playAudio: (option: SelectOption) => void;
  multiple: boolean,
  showAnswer: boolean
}>();
const answer = defineModel<string | string[]>();

const select = (option: SelectOption) => {
  playAudio(option);
  if (showAnswer) return;
  if (multiple) {
    const answerArray = answer.value as string[];
    if (Array.isArray(answerArray)) {
      const index = answerArray.indexOf(option.name);
      if (index !== -1) {
        answerArray.splice(index, 1);
      } else {
        answerArray.push(option.name);
      }
    }
  } else {
    answer.value = option.name;
  }
}

const isSelected = (option: SelectOption): boolean => {
  if (multiple) {
    if (answer.value === undefined) return false;
    return (answer.value as string[]).some(it => it === option.name);
  } else {
    return (answer.value as string) === option.name;
  }
}
</script>

<template>
  <div class="vertical" :class="{showAnswer: showAnswer}">
    <Button
      v-for="option in options"
      :key="option.name"
      :label="option.label"
      @click="select(option)"
      severity="secondary"
      :class="{selected: isSelected(option), answer: option.isAnswer}"
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

.showAnswer .selected {
  background-color: red !important;
}

.showAnswer .answer {
  background-color: lightGreen !important;
}
</style>