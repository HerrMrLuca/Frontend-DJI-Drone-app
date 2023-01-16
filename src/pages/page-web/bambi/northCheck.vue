<template>
  <div id="app">
    <div id="northCheck" ref="northCheckComponent">
      <a-input
          v-if="heading"
          v-model:value="heading"
          readonly
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, reactive } from 'vue'
import { useMyStore } from '/@/store'
export default {
  name: 'MyNorthCheck',
  props: ['northData'],
  data () {
    return {
      heading: null,
    }
  },
  mounted () {
    setInterval(() => {
      // do stuff
      this.heading = this.northData[0]
      console.log(this.heading)
      if (this.heading > 0.5 || this.heading < -0.5) {
        alert('DU FLIEGST NICHT NACH NORDEN DU HURENSOHN: ' + this.heading + '!')
      }
    }, 10000)
  },
}
</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

</style>
