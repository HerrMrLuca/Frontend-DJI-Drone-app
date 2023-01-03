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
  data () {
    return {
      heading: null,
    }
  },
  mounted () {
    setInterval(() => {
      // do stuff
      this.heading = getheading()
      console.log(this.heading)
      if (this.heading > 0.5 || this.heading < -0.5) {
        alert('DU FLIEGST NICHT NACH NORDEN DU HURENSOHN: ' + this.heading + '!')
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

// TODO delete fake drone data
const heading = 0.001
function getheading () {
  if (deviceInfo.value) {
    return deviceInfo.value[onlineDevices.data[0].sn].attitude_head
  }
  return heading
}

</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

</style>
