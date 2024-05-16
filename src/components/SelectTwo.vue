<template>
  <span>
    <span
      v-for="option in options"
      @click="() => handleChange(option.value)"
      :class="[selected === option.value ? 'selected' : '']"
      >【 {{ option.label }} 】
    </span>
    <span>【 <input type="text" v-model="custom" /> 】</span>
  </span>
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

const custom = ref('')
const selected = ref('')
const emit = defineEmits(['change'])

const handleChange = (value) => {
  console.log(value)
  selected.value = value
}

function emitData(value) {
  const selectedOption = props.options.find((option) => option.value === value)
  emit('change', Object.assign({}, selectedOption, { name: props.name }))
}

// // 监听 defaultValue 的变化，以更新选中的值
watch(
  () => props.defaultValue,
  (newValue) => {
    if (!newValue) return
    selected.value = newValue
    emitData(newValue)
  },
  { immediate: true }
)
</script>

<style scoped>
.selected {
  color: red;
  text-decoration: dashed;
}

input {
  width: 100px;
  border: none;
  outline: none;
}
</style>
