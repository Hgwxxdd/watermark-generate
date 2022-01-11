<template>
  <section class="monaco-mode">
    <SplitPane>
      <template #left>
        <Editor />
      </template>
      <template #right>
        <h1>TODO</h1>
      </template>
    </SplitPane>
  </section>
</template>

<script setup lang="ts">
import SplitPane from './SplitPane.vue'
import Editor from './editor/editor.vue'
</script>
