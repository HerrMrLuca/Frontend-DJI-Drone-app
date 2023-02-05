<template>
  <svg :aria-hidden="true" :class="svgClass" :style="{color: color, width:computedWidth, height:computedWidth}">
    <use :fill="color" :xlink:href="iconName"/>
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
  },
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  console.log(props.name, 'props.name')
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
const computedWidth = computed(() => {
  const result = props.width || props.size
  return result ? result + 'px' : '1em'
})
</script>
<style lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
