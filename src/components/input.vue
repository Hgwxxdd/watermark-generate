<template>
  <input type="text" :style="style" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'

interface Props {
  width: string | number
  value: string | number
}

const props = withDefaults(defineProps<Props>(), {
  width: '100px'
})

const style = computed(() => {
  return {
    width: `${props.width}px`
  }
})
</script>

<style scoped>
input {
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
