<template>
  <div id="app">
    <div id="battery" ref="batteryComponent">
      <a-input
          v-if="battery"
          v-model:value="battery"
          readonly
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, reactive } from 'vue'
import { useMyStore } from '/@/store'
export default {
  name: 'MyBattery',
  props: ['batteryData'],
  data () {
    return {
      battery: null,
      warningLevel: 40,
    }
  },
  mounted () {
    setInterval(() => {
      // do stuff
      this.battery = this.batteryData[0]
      console.log(this.batteryData[0])
      if (this.batteryData[0] <= this.warningLevel && this.batteryData[0] > 0) {
        this.warningLevel -= 40
        alert('The Battery is at ' + this.batteryData[0] + '%!')
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
