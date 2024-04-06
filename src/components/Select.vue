<template>
  <select @change="handleChange" v-model="selectedValue" :disabled="props.disabled">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue'

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

const emit = defineEmits(['change'])

const handleChange = (event) => {
  const selectedOption = props.options.find((option) => option.value === event.target.value)
  emit('change', Object.assign({}, selectedOption, { name: props.name }))
}

// // 监听 defaultValue 的变化，以更新选中的值
watch(
  () => props.defaultValue,
  (newValue) => {
    selectedValue.value = newValue
  },
  { immediate: true }
)
</script>
