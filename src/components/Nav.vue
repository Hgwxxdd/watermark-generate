<template>
  <nav>
    <div class="nav-link">
      <Icon v-if="isDark" type="moon" />
      <Icon v-else type="sun" />
    </div>
    <div class="nav-link">
      <Icon type="github-one" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
// const toggleDark = useToggle(isDark);
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
}

.nav-link {
  padding: 0 6px;
}
</style>
