<template>
  <div id="app">
    <div id="droneData" ref="droneDataComponent">
      <table>
          <tr v-for="(value, key, index) in dataArray[0]" :key="index">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, reactive } from 'vue'
import { useMyStore } from '/@/store'
export default {
  name: 'MyDroneData',
  props: ['droneData'],
  data () {
    return {
      dataArray: [null],
    }
  },
  mounted () {
    setInterval(() => {
      // do stuff
      this.dataArray = this.droneData
      // console.log(this.dataArray)
    }, 1000)
  },
}
</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

</style>
