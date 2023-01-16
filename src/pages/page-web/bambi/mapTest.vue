<template>
  <div id="app">
    <div id="map" ref="mapComponent">

    </div>
  </div>

</template>
<script lang="ts">
import { computed, reactive } from 'vue'
import { useMyStore } from '/@/store'
import 'leaflet/dist/leaflet.css'
// import 'https://unpkg.com/leaflet-compass@1.0.0/dist/leaflet-compass.min.js'
import L, { LatLng, LayerGroup } from 'leaflet'

const droneIcon = L.icon({
  iconUrl: '/src/assets/icons/drone.png',
  iconSize: [38, 38], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
})

const waypointIcon = L.icon({
  iconUrl: '/src/assets/icons/marker.svg',
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
})

export default {
  name: 'MyMap',
  data () {
    return {
      map: null,
      marker: null,
      store: null,
      deviceInfo: null,
      polyline: null,
      waypointsLayer: null,
      currentLocation: [51.505, -0.09], // initial location for the marker
      latlngs: [[4, 4]]
    }
  },
  mounted () {
    this.map = L.map('map').setView(this.currentLocation, 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map)

    this.marker = L.marker(this.currentLocation, { icon: droneIcon }).addTo(this.map)
    this.polyline = L.polyline(this.latlngs, { color: 'red' }).addTo(this.map)
    this.waypointsLayer = new LayerGroup()
    this.waypointsLayer.addTo(this.map)
    setInterval(() => {
      this.waypointsLayer.clearLayers()
      this.polyline.setLatLngs(getWaypoints())
      for (let i = 0; i < this.polyline.getLatLngs().length; i++) {
        this.waypointsLayer.addLayer(new L.marker(this.polyline.getLatLngs()[i], { icon: waypointIcon }).addTo((this.map)))
      }

      this.marker.setLatLng(getLocation())
    }, 1000)
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

// TODO DESTORY FAKE
const fakeLocation = [[51, 0], [51, 1], [51, 2],]
const fakeWaypoint = [[51.1, 0], [51.2, 0], [51.1, 0.1], [51.2, 0.1]]
let index = 0
function getLocation () {
  // TODO Change fake to real
  // let latLong: [number, number] = [deviceInfo.value[onlineDevices.data[0].sn].longitude, deviceInfo.value[onlineDevices.data[0].sn].latitude]
  let latLong: [number, number]
  if (fakeLocation[index][1] === 0) {
    latLong = [fakeLocation[index][0], fakeLocation[index][1]]
    index = 1
  } else if (fakeLocation[index][1] === 1) {
    latLong = [fakeLocation[index][0], fakeLocation[index][1]]
    index = 2
  } else {
    latLong = [fakeLocation[index][0], fakeLocation[index][1]]
    index = 0
  }
  // console.log(latLong)
  return latLong
}

function getWaypoints () {
  const latLongArray: [number, number][] = []
  let latLong: [number, number]
  // TODO FAKE
  for (let i = 0; i < fakeWaypoint.length; i++) {
    latLong = [fakeWaypoint[index][0], fakeWaypoint[index][1]]
    latLongArray.push(latLong)
  }
  // console.log(latLong)
  return latLongArray
}

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
