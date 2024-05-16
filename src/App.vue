<script setup>
import { ref, onMounted } from 'vue'

import Nav from './components/Nav.vue'
import VSelect from './components/Select.vue'
import VRadio from './components/Radio.vue'
import Ren from './components/Ren'

const iframe = ref(null)

onMounted(() => {
  window.addEventListener('message', function (event) {
    if (event.origin !== 'http://47.108.248.69') {
      return
    }

    alert('success')
  })
})

function sendMessageToIframe() {
  console.log('send')
  let data = {
    id: '123',
    sys: 'qwe'
  }
  iframe.value.contentWindow.postMessage(data, 'http://47.108.248.69')
}
</script>

<template>
  <!-- <router-view /> -->
  <div style="display: flex">
    <div>
      <Ren />
    </div>
    <!-- <iframe
      id="myIframe"
      width="800"
      height="800"
      src="http://47.108.248.69/cats"
      @load="sendMessageToIframe"
      ref="iframe"
    ></iframe> -->
  </div>
</template>

<style>
.text {
  width: 700px;
}

header {
  --dark: #333;
  --light: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  z-index: 2;
}

header .title {
  font-size: 20px;
  padding: 0 20px;
  font-weight: 600;
}
</style>
