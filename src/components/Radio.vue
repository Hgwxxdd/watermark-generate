<template>
  <span v-for="option in options" :key="option.value">
    <input
      type="radio"
      :value="option.value"
      v-model="selectedValue"
      :disabled="props.disabled"
      :id="option.value"
      @change="handleChange"
    />
    <label :for="option.value">{{ option.label }}</label>
  </span>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: []
  },
  name: {
    type: String
  }
})

const selectedValue = ref('')

const handleChange = (event) => {
  const selectedOption = props.options.find((option) => option.value === event.target.value)
  emit('change', Object.assign({}, selectedOption, { name: props.name }))
}

watch(
  () => props.defaultValue,
  (newValue) => {
    selectedValue.value = newValue
  },
  { immediate: true }
)
</script>
