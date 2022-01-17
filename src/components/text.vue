<template>
  <component :is="tag" :style="style" class="text">
    {{ value }}
  </component>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'

interface Props {
  value?: string | number
  fontSize?: string | number
  letterSpacing?: string | number
  fontWeight?: string | number
  tag: string
  textAlign: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '默认文字',
  fontSize: '14',
  letterSpacing: '0',
  fontWeight: '400',
  textAlign: 'left',
  tag: 'span'
})

const style = computed(() => {
  return {
    fontSize: `${props.fontSize}px`,
    letterSpacing: `${props.letterSpacing}px`,
    fontWeight: `${props.fontWeight}`,
    textAlign: `${props.textAlign}`
  }
})
</script>

<style scoped>
.text {
  font-size: 18px;
  font-family: '宋体';
  word-break: break-all;
  width: 638px;

  padding: 10px;
}
</style>
