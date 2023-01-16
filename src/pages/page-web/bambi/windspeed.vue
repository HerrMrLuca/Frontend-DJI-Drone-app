<template>
  <div id="app">
    <div id="windspeed" ref="windspeedComponent">
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
  name: 'MyWindspeed',
  data () {
    return {
      windSpeed: null,
      windDirection: null,
    }
  },
  mounted () {
    setInterval(() => {
      // do stuff
      this.battery = getBattery()
      console.log(this.battery)
      if (this.battery <= this.warningLevel && this.battery > 0) {
        this.warningLevel -= 10
        alert('The Battery is at ' + this.battery + '%!')
      }
    }, 10000)
  },
}

const store = useMyStore()
const deviceInfo = computed(() => store.state.deviceState.deviceInfo)

interface OnlineDevice {
  model: string,
  callsign: string,
  sn: string,
  mode: number,
  gateway: {
    model: string,
    callsign: string,
    sn: string,
    domain: string,
  },
  payload: {
    model: string
  }[]
}

const onlineDevices = reactive({
  data: [] as OnlineDevice[]
})
let battery = 100
function getBattery () {
  if (deviceInfo.value) {
    return deviceInfo.value[onlineDevices.data[0].sn].battery.capacity_percent
  }
  battery--
  return battery
}

</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

</style>
