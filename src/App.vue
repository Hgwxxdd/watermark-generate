<script setup>
import { ref } from 'vue'

import Nav from './components/Nav.vue'
import VSelect from './components/Select.vue'
import VRadio from './components/Radio.vue'

function test(event) {
  console.log(event)
}

function handleChange(e) {
  console.log('here', e)
}

const options = ref([
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  }
])

function handleAdd() {
  options.value.push({
    label: 12,
    value: 'asdf'
  })
}
</script>

<template>
  <!-- <VSelect :options="options" @change="handleChange" defaultValue="2"></VSelect>
  <VRadio :options="options" @change="handleChange" defaultValue="2"></VRadio>
  <button @click="handleAdd">add</button> -->
  <header>
    <div class="title">Contract Playground</div>
    <Nav />
  </header>

  <router-view />
</template>

<style>
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
