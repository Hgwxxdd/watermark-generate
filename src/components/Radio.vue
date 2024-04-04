<template>
  <span v-for="option in options" :key="option.value">
    <input
      type="radio"
      :value="option.value"
      v-model="selectedValue"
      :disabled="disabled"
      :id="option.value"
      @change="handleChange"
    />
    <label :for="option.value">{{ option.label }}</label>
  </span>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'

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

const handleChange = (event) => {
  const selectedOption = props.options.find((option) => option.value === event.target.value)
  emit('change', Object.assign({}, selectedOption, { name: props.name }))
}

const selectedValue = ref(props.defaultValue)

watch(
  () => props.defaultValue,
  (newValue) => {
    selectedValue.value = newValue
  }
)

onMounted(() => {
  if (props.defaultValue) {
    selectedValue.value = props.defaultValue
  }
})
</script>
