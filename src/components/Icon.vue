<!-- https://github.com/bytedance/iconpark -->

<template>
  <button>
    <IconPark :type="type" :theme="theme" :size="size" :fill="fill" />
  </button>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'

type Theme = 'outline' | 'filled' | 'two-tone' | 'multi-color'

interface Props {
  type?: string
  size?: string | number
  theme?: Theme
  fill?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '20',
  theme: 'outline',
  type: 'click'
})
</script>

<style lang="scss" scoped>
button {
  border: none;
  outline: none;
  background: transparent;

  cursor: pointer;
}
</style>
