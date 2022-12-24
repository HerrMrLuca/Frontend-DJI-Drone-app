<template>
  <link rel="stylesheet" href="/../node_modules/leaflet/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
  <div id="app">
    <div id="map">

    </div>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
import { useMyStore } from '/@/store'
import 'leaflet/dist/leaflet.css'
import * as Maps from 'leaflet/dist/leaflet.js'

const L = Maps.L

const droneIcon = L.icon({
  iconUrl: '/drone.png',

  iconSize: [38, 20], // size of the icon
  iconAnchor: [22, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -20] // point from which the popup should open relative to the iconAnchor
})

export default {
  name: 'map',
  mounted () {
    this.map = L.map('map').setView([51.505, -0.09], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map)
    L.marker([51.5, -0.09], { icon: droneIcon }).addTo(this.map)
  },
}
const store = useMyStore()
const deviceInfo = computed(() => store.state.deviceState.deviceInfo)

</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

  #map {
    height: 180px;
  }
</style>
