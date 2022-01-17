<template>
  <nav>
    <div class="nav-link">
      <a-tooltip title="导入JSON">
        <Icon type="upload" @click="showModal" />
      </a-tooltip>
    </div>
    <div class="nav-link">
      <Icon type="download" />
    </div>
    <div class="nav-link" @click="handleCopy">
      <a-tooltip title="复制JSON">
        <Icon type="copy-one" />
      </a-tooltip>
    </div>
    <div class="nav-link">
      <Icon type="github-one" />
    </div>
    <div class="nav-link">
      <Icon type="setting-two" />
    </div>
  </nav>

  <a-modal
    :visible="visible"
    title="Modal"
    ok-text="确认"
    cancel-text="取消"
    @ok="hideModal"
    @cancel="cancel"
  >
    <input type="text" v-model="importData" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import Icon from './Icon.vue'
import { useClipboard, useLocalStorage } from '@vueuse/core'

const { copy } = useClipboard()

const visible = ref(false)

const importData = ref('')

function handleCopy() {
  const context = useLocalStorage('componentList', [])
  message.success('复制成功')
  copy(JSON.stringify(context.value))
}

function hideModal() {
  const context = useLocalStorage('componentList', [])
  context.value = JSON.parse(importData.value)
  console.log(importData.value)
  visible.value = false
}

function cancel() {
  visible.value = false
}

function showModal() {
  visible.value = true
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
}

.nav-link {
  padding: 0 10px;
}
</style>
