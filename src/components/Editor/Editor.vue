<template>
  <div id="monaco-editor"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as Dark from './theme/Tomorrow-Night-Eighties.json'
import Light from 'theme-vitesse/themes/vitesse-light.json'

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss') {
      return new cssWorker()
    }
    if (label === 'html') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

onMounted(() => {
  monaco.editor.create(document.getElementById('monaco-editor'), {
    value: `<script setup lang="ts">
import { ref, reactive } from "vue";

const container = ref();

// mobile only
const showOutput = ref(false);

const state = reactive({
  dragging: false,
  split: 50,
});

function boundSplit() {
  const { split } = state;
  return split < 20 ? 20 : split > 80 ? 80 : split;
}

let startPosition = 0;
let startSplit = 0;

function dragStart(e: MouseEvent) {
  state.dragging = true;
  startPosition = e.pageX;
  startSplit = boundSplit();
}

function dragMove(e: MouseEvent) {
  if (state.dragging) {
    const position = e.pageX;
    const totalSize = container.value.offsetWidth;
    const dp = position - startPosition;
    state.split = startSplit + ~~((dp / totalSize) * 100);
  }
}

function dragEnd() {
  state.dragging = false;
}
<\/script>

<template>
  <div
    ref="container"
    class="split-pane"
    :class="{ dragging: state.dragging, 'show-output': showOutput }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left" :style="{ width: boundSplit() + '%' }">
      <slot name="left" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="right" :style="{ width: 100 - boundSplit() + '%' }">
      <slot name="right" />
    </div>

    <button class="toggler" @click="showOutput = !showOutput">
      {{ showOutput ? "< Code" : "Output >" }}
    </button>
  </div>
</template>

<style scoped>
.split-pane {
  display: flex;
  height: 100%;
  position: relative;
}
.split-pane.dragging {
  cursor: ew-resize;
}
.dragging .left,
.dragging .right {
  pointer-events: none;
}
.left,
.right {
  position: relative;
  height: 100%;
}
.left {
  border-right: 1px solid var(--border);
}
.dragger {
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  right: -5px;
  width: 10px;
  cursor: ew-resize;
}
.toggler {
  display: none;
  z-index: 3;
  font-family: var(--font-code);
  color: var(--text-light);
  position: absolute;
  left: 50%;
  bottom: 20px;
  background-color: var(--bg);
  padding: 8px 12px;
  border-radius: 8px;
  transform: translateX(-50%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.dark .toggler {
  background-color: var(--bg);
}
@media (max-width: 720px) {
  .toggler {
    display: block;
  }
  .left,
  .right {
    width: 100% !important;
  }
  .right {
    display: none;
  }
  .split-pane.show-output .right {
    display: block;
  }
  .split-pane.show-output .left {
    display: none;
  }
}
</style>

    `,
    language: 'html',
    fontSize: '20px',
    automaticLayout: true,
    lineHeight: 1.6
  })

  monaco.editor.defineTheme('light', Light)
  monaco.editor.defineTheme('dark', Dark)
  monaco.editor.setTheme('dark')
})
</script>

<style>
#monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
