<template>
  <span class="text" :style="style" span="6"> {{ text }} </span>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number]
    },
    fontSize: {
      type: [Number, String],
      default: 14
    },
    letterSpacing: {
      type: [Number, String],
      default: 0
    },
    // fontFamily: {
    //   type: String,
    //   default: "宋体",
    // },
    preset: {
      type: String,
      default: 'main'
    }
  },
  data() {
    return {}
  },
  computed: {
    style() {
      return {
        fontSize: `${this.fontSize}px`,
        letterSpacing: `${this.letterSpacing}px`
      }
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 18px;
  font-family: '宋体';
  word-break: break-all;
  width: 638px;

  padding: 10px;
}
</style>
