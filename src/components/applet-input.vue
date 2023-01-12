<template>
  <div>
    <label :for="inputId">{{ labelText }}</label>
    <input
      :id="inputId"
      :placeholder="inputPlaceholder"
      v-model="value"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: ['modelValue', 'placeholder', 'label'],

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const value = ref(props.modelValue);
    const inputId = Math.random().toString(36).substring(2);
    const inputPlaceholder = props.placeholder;
    const labelText = props.label;
    return {
      value,
      inputPlaceholder,
      labelText,
      inputId,
      handleInput() {
        emit('update:modelValue', value.value);
      },
    };
  },
};
</script>
