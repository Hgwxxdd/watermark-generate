<script setup lang="ts">
import Nav from './components/Nav.vue'
</script>

<template>
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
