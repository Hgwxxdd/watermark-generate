<script setup lang="ts">
import { ref, reactive } from "vue";

const container = ref();

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
</script>

<template>
  <div
    ref="container"
    class="split-pane"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left" :style="{ width: boundSplit() + '%' }">
      <slot name="left"></slot>
    </div>
    <div class="dragger" @mousedown.prevent="dragStart"></div>
    <div class="right" :style="{ width: 100 - boundSplit() + '%' }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style>
.split-pane {
  position: relative;

  display: flex;
  width: 100%;
  height: 100%;
}

.dragging .left,
.dragging .right {
  pointer-events: none;
}

.dragger {
  position: relative;

  width: 12px;
  cursor: col-resize;

  padding: 0 2px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.dragger::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% - 2px), -50%);
  border-left: 1px solid #999;
}

.dragger::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + 2px), -50%);
  border-right: 1px solid #999;
}

.split-pane.dragging {
  cursor: col-resize;
}

.left,
.right {
  position: relative;
  height: 100%;
}

.right {
  background: #fbfbfb;
  /* background: #151515; */
}
</style>
