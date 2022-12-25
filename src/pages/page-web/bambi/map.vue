<template>
  <div id="app">
    <div id="map" ref="mapComponent">

    </div>
  </div>

</template>
<script lang="ts">
import { computed } from 'vue'
import { useMyStore } from '/@/store'
import 'leaflet/dist/leaflet.css'
// import 'https://unpkg.com/leaflet-compass@1.0.0/dist/leaflet-compass.min.js'
import L from 'leaflet'

const droneIcon = L.icon({
  iconUrl: '/src/assets/icons/drone.png',
  iconSize: [38, 38], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
})

export default {
  name: 'MyMap',
  data () {
    return {
      map: null,
      marker: null,
      currentLocation: [51.505, -0.09], // initial location for the marker
      locations: [
        [51.77470779448281, -0.0000924728137607],
        [51.77401871222633, -0.0005876807991354],
        [51.77435162380247, -0.0005862994039964],
        [51.77403920087414, -0.000351952418959],
        [51.77438775089274, -0.0002569998411442],
        [51.77489643818174, -0.000663593891329],
        [51.77460217935696, -0.000660452890135],
        [51.77484948661072, -0.0006121253007084],
        [51.77479792570406, -0.0001055528757715],
        [51.7747077520121, -0.0008327681253797]
      ],
      locationIndex: 0 // index of the current location
    }
  },
  mounted () {
    this.map = L.map('map').setView(this.currentLocation, 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map)

    this.marker = L.marker(this.currentLocation, { icon: droneIcon }).addTo(this.map)

    setInterval(() => {
      // update the marker's position
      this.marker.setLatLng(this.locations[this.locationIndex])

      // update the map's view to center on the marker
      this.map.setView(this.locations[this.locationIndex])

      // increment the location index
      this.locationIndex = (this.locationIndex + 1) % this.locations.length
    }, 500)
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
    height: 200px;
    width: 600px;
  }
</style>
