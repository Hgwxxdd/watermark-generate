<template>
  <div>
    <span v-for="option in options" :key="option.value">
      <input
        type="radio"
        :value="option.value"
        v-model="selectedValue"
        :disabled="disabled"
        :id="option.value"
      />
      <label :for="option.value">{{ option.label }}</label>
    </span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'

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
  }
})

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
