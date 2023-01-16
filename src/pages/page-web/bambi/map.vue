<template>
  <div id="app">
    <div id="map" ref="mapComponent">
      <p id="mapdata">MapData {{ mapData }}</p>
    </div>
  </div>

</template>
<script lang="ts">
import { computed, reactive, onMounted, onUpdated, ref } from 'vue'
import { useMyStore } from '/@/store'
import 'leaflet/dist/leaflet.css'
// import 'https://unpkg.com/leaflet-compass@1.0.0/dist/leaflet-compass.min.js'
import L, { LatLng, LayerGroup } from 'leaflet'
import { message } from 'ant-design-vue'

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
  props: ['mapData'],
  data () {
    return {
      map: null,
      marker: null,
      store: null,
      deviceInfo: null,
      polyline: null,
      waypointsLayer: null,
      currentLocation: [48.366937, 14.517274], // initial location for the marker
      latlngs: [[4, 4]]
    }
  },
  mounted () {
    this.map = L.map('map').setView(this.currentLocation, 13)
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map)

    this.marker = L.marker(this.currentLocation, { icon: droneIcon }).addTo(this.map)
    this.polyline = L.polyline(this.latlngs, { color: 'red' }).addTo(this.map)
    this.waypointsLayer = new LayerGroup()
    this.waypointsLayer.addTo(this.map)
    let latLong: [number, number]
    setInterval(() => {
      // console.log(this.mapData)
      this.waypointsLayer.clearLayers()
      this.polyline.setLatLngs(this.mapData[2])
      for (let i = 0; i < this.polyline.getLatLngs().length; i++) {
        const layer = L.marker(this.polyline.getLatLngs()[i], { icon: waypointIcon }).addTo(this.map)
        this.waypointsLayer.addLayer(layer)
      }
      latLong = [this.mapData[0], this.mapData[1]]
      this.marker.setLatLng(latLong)
      this.map.panTo(this.marker.getLatLng(), { animate: true, duration: 1 })
    }, 1000)
  },
}

</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

  #map {
    height: 300px;
    width: 300px;
  }
</style>
