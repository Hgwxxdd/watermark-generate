<template>
  <input type="text" :disabled="props.disabled" @input="handleInput" v-model="text" />
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'
const emit = defineEmits(['input'])

const text = ref('')

const props = defineProps({
  defaultValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  }
})

const handleInput = () => {
  emit('input', { name: props.name, value: text.value })
}

watch(
  () => props.defaultValue,
  (newValue) => {
    text.value = newValue
  },
  { immediate: true }
)
</script>

<style scoped>
input {
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
