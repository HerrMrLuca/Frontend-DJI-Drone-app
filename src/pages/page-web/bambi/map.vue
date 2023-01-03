<template>
  <div id="app">
    <div id="map" ref="mapComponent">

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

import { deleteWaylineFile, downloadWaylineFile, getWaylineFiles } from '/@/api/wayline'
import { ELocalStorageKey } from '/@/types'
import { EllipsisOutlined, RocketOutlined, CameraFilled, UserOutlined } from '@ant-design/icons-vue'
import { EDeviceType } from '/@/types/device'

import { WaylineFile } from '/@/types/wayline'
import { downloadFile } from '/@/utils/common'
import { IPage } from '/@/api/http/type'

const loading = ref(false)
const store = useMyStore()
const pagination :IPage = {
  page: 1,
  total: 0,
  page_size: 10
}

const waylinesData = reactive({
  data: [] as WaylineFile[]
})

const workspaceId = localStorage.getItem(ELocalStorageKey.WorkspaceId)!
const deleteTip = ref(false)
const deleteWaylineId = ref<string>('')
const canRefresh = ref(true)

onMounted(() => {
  getWaylines()
})

onUpdated(() => {
  const element = document.getElementsByClassName('scrollbar').item(0) as HTMLDivElement
  const parent = element?.parentNode as HTMLDivElement
  setTimeout(() => {
    if (element?.scrollHeight < parent?.clientHeight && pagination.total > waylinesData.data.length) {
      if (canRefresh.value) {
        pagination.page++
        getWaylines()
      }
    } else if (element && element.className.indexOf('height-100') === -1) {
      element.className = element.className + ' height-100'
    }
  }, 300)
})

function getWaylines () {
  if (!canRefresh.value) {
    return
  }
  canRefresh.value = false
  getWaylineFiles(workspaceId, {
    page: pagination.page,
    page_size: pagination.page_size,
    order_by: 'update_time desc'
  }).then(res => {
    if (res.code !== 0) {
      return
    }
    res.data.list.forEach((wayline: WaylineFile) => waylinesData.data.push(wayline))
    pagination.total = res.data.pagination.total
    pagination.page = res.data.pagination.page
  }).finally(() => {
    canRefresh.value = true
  })
}

function showWaylineTip (waylineId: string) {
  deleteWaylineId.value = waylineId
  deleteTip.value = true
}

function deleteWayline () {
  deleteWaylineFile(workspaceId, deleteWaylineId.value).then(res => {
    if (res.code === 0) {
      message.success('Wayline file deleted')
    }
    deleteWaylineId.value = ''
    deleteTip.value = false
    pagination.total--
    waylinesData.data = []
    setTimeout(getWaylines, 500)
  })
}

function downloadWayline (waylineId: string, fileName: string) {
  loading.value = true
  downloadWaylineFile(workspaceId, waylineId).then(res => {
    if (!res) {
      return
    }
    const data = new Blob([res], { type: 'application/zip' })
    downloadFile(data, fileName + '.kmz')
  }).finally(() => {
    loading.value = false
  })
}

function selectRoute (wayline: WaylineFile) {
  store.commit('SET_SELECT_WAYLINE_INFO', wayline)
}

function onScroll (e: any) {
  const element = e.srcElement
  if (element.scrollTop + element.clientHeight === element.scrollHeight && Math.ceil(pagination.total / pagination.page_size) > pagination.page && canRefresh.value) {
    pagination.page++
    getWaylines()
  }
}

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
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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
const fakeLocation = [[51, 0], [51, 0.1], [51, 0.2],]
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
  // TODO Remove Fake Shit
  for (let i = 0; i < fakeWaypoint.length; i++) {
    latLong = [fakeWaypoint[i][0], fakeWaypoint[i][1]]
    latLongArray.push(latLong)
  }
  if (waylinesData.data.length > 0) {
    console.log(waylinesData.data)
  }
  return latLongArray
}

</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';

  #map {
    height: 500px;
    width: 800px;
  }
</style>
