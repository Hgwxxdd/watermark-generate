<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: [Number, Object],
      default: 0
    }
  }
}
</script>
