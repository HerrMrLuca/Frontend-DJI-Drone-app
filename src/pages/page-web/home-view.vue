<!--suppress ALL -->
<template>
  <div class="outer-div">
    <div class="home-view">
      <h1>Home</h1>
      <div class="content">
        <div class="north">
          <div class="content-container">
            <div class="icon-container north">
              <img :src="compass" :style="{rotate: droneDir + 'deg'}" alt="icon of compass"
                   class="home-icon compass">
            </div>
            <p v-if="!connected" class="num">--°</p>
            <p v-else class="num">{{ data.heading }}°</p>
          </div>
          <h5>Compass</h5>
        </div>

        <div class="gps">
          <div class="content-container">
            <div class="icon-container">
              <img :src="satellite" alt="icon of satellite"
                   class="home-icon satellite">
            </div>
            <p v-if="!connected" class="num">--<span class="unit">Satellites</span></p>
            <p v-else-if="data.is_fixed == 2" class="num">{{ data.rtk_number }}<span class="unit">RTK</span></p>
            <p v-else class="num">{{ data.gps_number }}<span class="unit">Satellites</span></p>
          </div>
          <h5>RTK State</h5>
        </div>

        <div class="battery">
          <div class="content-container">
            <div class="icon-container">
              <img v-if="data.battery_percent <= 25" :src="battery25" alt="icon of battery 25%" class="home-icon">
              <img v-else-if="data.battery_percent <= 50" :src="battery50" alt="icon of battery 50%" class="home-icon">
              <img v-else-if="data.battery_percent <= 75" :src="battery75" alt="icon of battery 75%" class="home-icon">
              <img v-else :src="battery100" alt="icon of battery 100%" class="home-icon">
            </div>
            <p v-if="!connected" class="num">--<span class="unit">%</span></p>
            <p v-else class="num">{{ data.battery_percent }}<span class="unit">%</span></p>
          </div>
          <h5>Battery</h5>
        </div>

        <div class="storage">
          <div class="content-container">
            <div class="icon-container">
              <img :src="storage" alt="icon of storage" class="home-icon">
            </div>
            <p v-if="!connected" class="num">--<span class="unit">%</span></p>
            <p v-else class="num">{{ data.storage }}<span class="unit">%</span></p>
          </div>
          <h5>Storage</h5>
        </div>

        <div id="map" class="map" style="display: block">
          <div class="loading">
            <img :src="loading">
          </div>
        </div>

        <div class="height">
          <div>
            <h6>height</h6>
            <p v-if="!connected" class="num">---,-<span class="unit">m</span></p>
            <p v-else class="num">{{ data.height }}<span class="unit">m</span></p>
          </div>

          <div>
            <h6>elevation</h6>
            <p v-if="!connected" class="num">---,-<span class="unit">m</span></p>
            <p v-else class="num">{{ data.elevation }}<span class="unit">m</span></p>
          </div>
          <h5>Height</h5>
        </div>

        <div class="coordinates">
          <div class="latitude">
            <h6>latitude</h6>
            <p v-if="!connected" class="num">--,------</p>
            <p v-else class="num">{{ mapData.currentLocation[0] }}</p>
          </div>

          <div class="longitude">
            <h6>longitude</h6>
            <p v-if="!connected" class="num">--,------</p>
            <p v-else class="num">{{ mapData.currentLocation[1] }}</p>
          </div>
          <h5>Coordinates</h5>
        </div>

        <div class="wind">
          <div class="wind-dir"> <!--todo check with icon and rotation
          {"1":"North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"} -->
            <!--          <h6>Direction</h6>-->
            <div class="compass">
              <img :src="cardinalPoints" class="cardinal-points">
              <img :class="direction" :src="needle" :style="{rotate: direction + 'deg'}" class="needle">
            </div>
          </div>

          <div class="wind-speed">
            <h6>speed</h6>
            <p v-if="!connected" class="num">--<span class="unit">m/s</span></p>
            <p v-else class="num">{{ data.wind_speed }}<span class="unit">m/s</span></p>
          </div>
          <h5>Wind</h5>
        </div>

        <div class="drone-speed">
          <div class="speed-horizontal">
            <h6>horizontal</h6>
            <p v-if="!connected" class="num">--<span class="unit">m/s</span></p>
            <p v-else class="num">{{ data.horizontal_speed }}<span class="unit">m/s</span></p>
          </div>
          <div class="speed-vertical">
            <h6>vertical</h6>
            <p v-if="!connected" class="num">--<span class="unit">m/s</span></p>
            <p v-else class="num">{{ data.vertical_speed }}<span class="unit">m/s</span></p>
          </div>
          <h5>Drone Speed</h5>
        </div>

        <div class="flight-time">
          <div class="since-start">
            <p v-if="!connected" class="num">--:--</p>
            <p v-else class="num">{{ data.time_string }}</p>
            <h6>since start</h6>
          </div>
          <div class="remaining-flight-time">
            <p v-if="!connected" class="num">--:--</p>
            <p v-else class="num">{{ data.minutes }}:{{ data.second }}</p>
            <h6>remaining (battery)</h6>
          </div>
          <h5>Flight Time</h5>
        </div>
        <div class="temperature">
          <p v-if="!connected" class="num">--<span class="unit">°C</span></p>
          <p v-else class="num">{{ data.temperature }}<span class="unit">°C</span></p>
          <h5>Weather</h5>
        </div>
      </div>
      <br>
    </div>
    <div>
      <button @click="testingValue"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import battery from '/@/assets/icons/icons_homeview/battery.png'
import battery25 from '/@/assets/icons/icons_homeview/battery25.png'
import battery50 from '/@/assets/icons/icons_homeview/battery50.png'
import battery75 from '/@/assets/icons/icons_homeview/battery75.png'
import battery100 from '/@/assets/icons/icons_homeview/battery100.png'
import compass from '/@/assets/icons/icons_homeview/compass 1.png'
import storage from '/@/assets/icons/icons_homeview/micro-sd-karte.png'
import cardinalPoints from '/@/assets/icons/icons_homeview/compass.png'
import needle from '/@/assets/icons/icons_homeview/needle.png'
import satellite from '/@/assets/icons/icons_homeview/satelliteV2.png'
import loading from '/@/assets/icons/loading.webp'

// leaflet
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// region ---------------------------- tsa copy code ----------------------------
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useMyStore } from '/@/store'
import { getDeviceTopo, getUnreadDeviceHms } from '/@/api/manage'
import { EModeCode, OSDVisible } from '/@/types/device'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'

const connected = ref(false)
const testing = ref(false)
let store = useMyStore()
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceId = ref(localStorage.getItem(ELocalStorageKey.WorkspaceId)!)
const osdVisible = ref({} as OSDVisible)
const hmsVisible = new Map<string, boolean>()

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
const onlineDocks = reactive({
  data: [] as OnlineDevice[]
})

const deviceInfo = computed(() => store.state.deviceState.deviceInfo)
const dockInfo = computed(() => store.state.deviceState.dockInfo)
const hmsInfo = computed({
  get: () => store.state.hmsInfo,
  set: (val) => {
    return val
  }
})

onMounted(() => {
  getOnlineTopo()
  setTimeout(() => {
    let maxCall = 0
    while (!store && maxCall < 500) {
      console.log(maxCall)
      store = useMyStore()
      maxCall++
    }
    if (store) {
      watch(() => store.state.deviceStatusEvent,
        data => {
          getOnlineTopo()
          if (data.deviceOnline.sn) {
            getUnreadHms(data.deviceOnline.sn)
          }
        },
        {
          deep: true
        }
      )
      getOnlineDeviceHms()
      prepMap() // prep necessary map data
      prepData()
      getWeather()
      if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
        connected.value = true
      }
      setInterval(() => { // interval that regularly updates the various data
        updateMap()
        updateData()
        // printData()
      }, 3000)
    }
  }, 3000)
})

function getOnlineTopo () {
  getDeviceTopo(workspaceId.value).then((res) => {
    if (res.code !== 0) {
      return
    }
    onlineDevices.data = []
    onlineDocks.data = []
    res.data.forEach((val: any) => {
      const gateway = val.gateways_list.pop()
      const device: OnlineDevice = {
        model: val.device_name,
        callsign: val.nickname,
        sn: val.device_sn,
        mode: EModeCode.Disconnected,
        gateway: {
          model: gateway?.device_name,
          callsign: gateway?.nickname,
          sn: gateway?.device_sn,
          domain: gateway?.domain
        },
        payload: []
      }
      val.payloads_list.forEach((payload: any) => {
        device.payload.push({
          model: payload.payload_name
        })
      })
      if (gateway && EDeviceTypeName.Dock === gateway.domain) {
        hmsVisible.set(device.sn, false)
        hmsVisible.set(device.gateway.sn, false)
        onlineDocks.data.push(device)
      }
      if (val.status && EDeviceTypeName.Gateway === gateway.domain) {
        onlineDevices.data.push(device)
      }
    })
  })
}

function getUnreadHms (sn: string) {
  getUnreadDeviceHms(workspaceId.value, sn).then(res => {
    if (res.data.length !== 0) {
      hmsInfo.value[sn] = res.data
    }
  })
  console.info(hmsInfo.value)
}

function getOnlineDeviceHms () {
  const snList = Object.keys(dockInfo.value)
  if (snList.length === 0) {
    return
  }
  snList.forEach(sn => {
    getUnreadHms(sn)
  })
  const deviceSnList = Object.keys(deviceInfo.value)
  if (deviceSnList.length === 0) {
    return
  }
  deviceSnList.forEach(sn => {
    getUnreadHms(sn)
  })
}

// endregion

// region ------------------------------- Map Code ------------------------------

// Map Variables
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

const mapData = reactive({
  map: null,
  marker: null,
  polyline: null,
  waypointsLayer: null,
  currentLocation: [[48, 14]], // initial location for the marker
  latlngs: [[48, 14]]
})

function prepMap () {
  mapData.currentLocation = getLocation()
  mapData.map = L.map('map').setView(mapData.currentLocation, 9)
  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(mapData.map)

  mapData.marker = L.marker(mapData.currentLocation, { icon: droneIcon }).addTo(mapData.map)
}

function updateMap () {
  mapData.currentLocation = getLocation()
  mapData.marker.setLatLng(mapData.currentLocation)
  mapData.map.setView(mapData.currentLocation)
}

const fakeLocation = [[48.356453, 14.356456], [48.345346, 14.358786], [48.387664, 14.456456]]
let index = 0

// TODO 2 add something until map is loaded
function getLocation () {
  // TODO Change fake to real
  if (connected.value && onlineDevices.data[0] && testing.value === false) {
    const latLong: [number, number] = [
      deviceInfo.value[onlineDevices.data[0].sn].latitude,
      deviceInfo.value[onlineDevices.data[0].sn].longitude
    ]
    return latLong
  } else {
    let latLong: [number, number]
    if (fakeLocation[index][1] === 14.356456) {
      latLong = [fakeLocation[index][0], fakeLocation[index][1]]
      index = 1
    } else if (fakeLocation[index][1] === 14.358786) {
      latLong = [fakeLocation[index][0], fakeLocation[index][1]]
      index = 2
    } else {
      latLong = [fakeLocation[index][0], fakeLocation[index][1]]
      index = 0
    }
    return latLong
  }
}

// endregion

// region ------------------------------ Data Code ------------------------------

// compass
const droneDir = ref(0)
const direction = ref(0)

const data = reactive({
  battery_percent: null,
  remain_flight_time: null,
  heading: null,
  height: null,
  elevation: null,
  wind_direction: 0, // initial location for the marker
  wind_speed: null,
  vertical_speed: null,
  horizontal_speed: null,
  rtk_number: null,
  gps_number: null,
  is_fixed: null,
  storage: null,
  gimbal_yaw: null,
  gimbal_pitch: null,
  start_time: null,
  time: null,
  time_string: null,
  minutes: null,
  second: null,
  temperature: null

})

function prepData () {
  if (connected.value && testing.value === false) {
    data.battery_percent = deviceInfo.value[onlineDevices.data[0].sn].battery.capacity_percent
    data.remain_flight_time = deviceInfo.value[onlineDevices.data[0].sn].battery.remain_flight_time
    data.heading = deviceInfo.value[onlineDevices.data[0].sn].attitude_head
    data.height = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].height * 100) / 100
    data.elevation = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].elevation * 100) / 100
    data.wind_direction = deviceInfo.value[onlineDevices.data[0].sn].wind_direction
    data.wind_speed = deviceInfo.value[onlineDevices.data[0].sn].wind_speed / 10
    data.vertical_speed = deviceInfo.value[onlineDevices.data[0].sn].vertical_speed
    data.horizontal_speed = deviceInfo.value[onlineDevices.data[0].sn].horizontal_speed
    data.rtk_number = deviceInfo.value[onlineDevices.data[0].sn].position_state.rtk_number
    data.gps_number = deviceInfo.value[onlineDevices.data[0].sn].position_state.gps_number
    data.is_fixed = deviceInfo.value[onlineDevices.data[0].sn].position_state.is_fixed
    data.storage = percentage(deviceInfo.value[onlineDevices.data[0].sn].storage.used, deviceInfo.value[onlineDevices.data[0].sn].storage.total)
  } else if (testing.value || connected.value === false) {
    data.battery_percent = 100
    data.remain_flight_time = 1733
    data.heading = 0
    data.height = 500
    data.elevation = 100
    data.wind_direction = 0
    data.wind_speed = 66 / 10
    data.vertical_speed = 0.4
    data.horizontal_speed = 1.1
    data.rtk_number = 23
    data.is_fixed = 0
    data.storage = percentage(50, 200)
  }
  data.start_time = new Date()
  data.time = new Date()
  data.minutes = '--'
  data.second = '--'
  data.time_string = '--:--'
}

function updateData () {
  if (connected.value && onlineDevices.data[0] && testing.value === false) {
    data.battery_percent = deviceInfo.value[onlineDevices.data[0].sn].battery.capacity_percent
    data.remain_flight_time = deviceInfo.value[onlineDevices.data[0].sn].battery.remain_flight_time
    data.heading = Math.round(deviceInfo.value[onlineDevices.data[0].sn].attitude_head)
    data.height = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].height * 100) / 100
    data.elevation = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].elevation * 100) / 100
    data.wind_direction = deviceInfo.value[onlineDevices.data[0].sn].wind_direction
    data.wind_speed = deviceInfo.value[onlineDevices.data[0].sn].wind_speed / 10
    data.vertical_speed = deviceInfo.value[onlineDevices.data[0].sn].vertical_speed
    data.horizontal_speed = deviceInfo.value[onlineDevices.data[0].sn].horizontal_speed
    data.rtk_number = deviceInfo.value[onlineDevices.data[0].sn].position_state.rtk_number
    data.gps_number = deviceInfo.value[onlineDevices.data[0].sn].position_state.gps_number
    data.is_fixed = deviceInfo.value[onlineDevices.data[0].sn].position_state.is_fixed
    data.storage = percentage(deviceInfo.value[onlineDevices.data[0].sn].storage.used, deviceInfo.value[onlineDevices.data[0].sn].storage.total)
  } else if (testing.value || connected.value === false) {
    data.battery_percent -= 1
    data.remain_flight_time -= 3
    data.heading = Math.round((data.heading - 12) * 10) / 10
    data.height += 1
    data.elevation += 1

    if (data.wind_direction === 7) {
      data.wind_direction = 0
    } else {
      data.wind_direction += 1
    }

    data.wind_speed = Math.round(data.wind_speed + 1.3)
    data.vertical_speed = Math.round((data.vertical_speed + 0.1) * 100) / 100
    data.horizontal_speed = Math.round((data.horizontal_speed - 0.1) * 100) / 100
    data.rtk_number += 1
    data.gps_number += 1
    data.is_fixed = 0
    data.storage = percentage(50, 200)
    data.gimbal_yaw = Math.round((data.gimbal_yaw + 0.1) * 100) / 100
    data.gimbal_pitch += 1
  }

  data.time.setTime(new Date() - data.start_time)
  data.minutes = Math.floor(data.remain_flight_time / 60)
  data.second = Math.floor((data.remain_flight_time / 60 - data.minutes) * 60)

  data.time_string = addZero(data.time.getMinutes()) + ':' + addZero(data.time.getSeconds())
  data.second = addZero(data.second)
  data.minutes = addZero(data.minutes)

  changeDir()
  changeDirWind()

  if (connected.value || testing.value) {
    const north = document.getElementsByClassName('north').item(0).classList
    if (data.heading < -4 || data.heading > 4) {
      north.remove('content-warning')
      north.add('content-alert')
    } else if (data.heading < -2 || data.heading > 2) {
      north.remove('content-alert')
      north.add('content-warning')
    } else {
      north.remove('content-alert')
      north.remove('content-warning')
    }

    const gps = document.getElementsByClassName('gps').item(0).classList
    if (data.is_fixed < 1) {
      gps.remove('content-warning')
      gps.add('content-alert')
    } else if (data.is_fixed < 2) {
      gps.remove('content-alert')
      gps.add('content-warning')
    } else {
      gps.remove('content-alert')
      gps.remove('content-warning')
    }

    const battery = document.getElementsByClassName('battery').item(0).classList
    if (data.battery_percent < 30) {
      battery.remove('content-warning')
      battery.add('content-alert')
    } else if (data.battery_percent < 50) {
      battery.remove('content-alert')
      battery.add('content-warning')
    } else {
      battery.remove('content-alert')
      battery.remove('content-warning')
    }

    const storage = document.getElementsByClassName('storage').item(0).classList
    if (data.storage < 20) {
      storage.remove('content-warning')
      storage.add('content-alert')
    } else if (data.storage < 30) {
      storage.remove('content-alert')
      storage.add('content-warning')
    } else {
      storage.remove('content-alert')
      storage.remove('content-warning')
    }

    const wind = document.getElementsByClassName('wind').item(0).classList
    if (data.wind_speed > 12) {
      wind.remove('content-warning')
      wind.add('content-alert')
    } else if (data.wind_speed > 7) {
      wind.remove('content-alert')
      wind.add('content-warning')
    } else {
      wind.remove('content-alert')
      wind.remove('content-warning')
    }
  }

  if (data.heading < 0) {
    data.heading = 360 + data.heading
  }
}

function addZero (i: number) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

function percentage (partial: number, total: number) {
  return Math.floor(100 * (1 - partial / total))
}

async function getWeather () {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=48.31&longitude=14.29&hourly=temperature_2m&current_weather=true', {
    method: 'GET'
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      data.temperature = json.hourly.temperature_2m[10]
    })
}

// endregion

// region ---------------------------- compass logic  ----------------------------

// TODO delete in production
const dires = [
  0, 45, 90, 135, 180, 225, 270, 315
]

function changeDirWind () {
  direction.value = closestAngle(direction.value, dires[data.wind_direction])
  connected.value = true // TODO remove after testing
}

function changeDir () {
  droneDir.value = closestAngle(droneDir.value, data.heading)
}

function closestAngle (from: number, to: number) {
  // https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
  return from + ((((to - from) % 360) + 540) % 360) - 180
}

// todo 5 implement this method in wind_direction to get closest target for animation
function chooseDeg (direction: number, deg: number) {
  switch (data.wind_direction) {
    case 0:
      direction = closestAngle(dires['0'], 0)
      break
    case 1:
      direction = closestAngle(direction, 45) // todo 5 change
      break
    case 2:
      direction = closestAngle(direction, 90)
      break
    case 3:
      direction = closestAngle(direction, 135)
      break
    case 4:
      direction = closestAngle(direction, 180)
      break
    case 5:
      direction = closestAngle(direction, 225)
      break
    case 6:
      direction = closestAngle(direction, 270)
      break
    case 7:
      direction = closestAngle(direction, 315)
      break
  }
  /*
  if (deg !== -20) {
    direction = closestAngle(direction, deg)
  }
  */
  return direction // direction in degrees for the animiation
}

function testingValue () {
  if (testing.value) {
    testing.value = false
  } else {
    testing.value = true
    data.battery_percent = 100
    data.remain_flight_time = 1733
    data.heading = 0
    data.height = 500
    data.elevation = 100
    data.wind_direction = 0
    data.wind_speed = 66 / 10
    data.vertical_speed = 0.4
    data.horizontal_speed = 1.1
    data.rtk_number = 23
    data.is_fixed = 1
    data.storage = percentage(50, 200)
  }
  console.log(testing.value)
}

// endregion

// todo 2 add little animation for warning and alert

// todo 2 https://open-meteo.com/ search for good api for temperature and fetch data or maybe drone has data
</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

* {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

p,
h5,
h6 {
  margin: 0; //reset
  color: black;
  font-family: 'Open Sans', sans-serif;
  //font-family: 'Fredoka', sans-serif;
}

h6 {
  font-size: 12px;
}

h5 {
  font-size: 14px;
  font-weight: 300;
  text-align: center;
}

h1 {
  font-family: 'Fredoka', sans-serif;
  color: $bambi-main;
  display: none;
  margin-bottom: 0;
}

img {
  max-width: 100%;
  max-height: auto;
  display: block;
  width: 100%;
  height: auto;
}

.num {
  font-feature-settings: "tnum";
  font-size: 1.1rem;
}

.unit {
  color: $bambi-shade-darker-1;
  font-size: 10px;
  padding-left: 0.2rem;
}

.outer-div {
  width: 100%;
  height: 100%;
  background-color: $bambi-white;
  padding: 2vw;

  overflow-y: auto;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: 20%;
  }
}

.home-view {
  border: $bambi-white 4px solid;
  border-radius: 10px;
  background-color: $bambi-white;

  .content {
    margin: 0 auto;
    width: 100%;
    height: auto;
    display: grid;
    max-width: 500px;
    row-gap: min(2vw, 2.5em);
    column-gap: min(2vw, 2.5em);
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 1fr;

    //region grid layout
    .north,
    .battery {
      grid-column: 1/3;
    }

    .gps,
    .storage {
      grid-column: 3/5;
    }

    .height {
      grid-column: 1/5;
    }

    .coordinates {
      grid-column: 5/9;
    }

    .wind {
      grid-column: 1/5;
    }

    .drone-speed {
      grid-column: 5/9;
    }

    .flight-time {
      grid-column: 1/6;
    }

    .temperature {
      grid-column: 6/9;
    }

    .map {
      grid-column: 5/9;
      grid-row: 1/3;
    }

    //endregion

    > div { //divs with content
      background-color: white;
      text-align: center;

      width: 100%;
      height: 100%;

      border-radius: 10px;
      border-color: $bambi-stroke-light;

      //region box shadow
      box-shadow: $bambi-home-view-box-shadow; //#36
      //box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; //76
      //box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; //35
      //box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; //0
      //box-shadow: 1px 1px 5px $bambi-shade-darker-4;
      //note -> for examples https://getcssscan.com/css-box-shadow-examples
      //endregion

      padding: 0.4rem 0.5rem;

      //children
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      h5 {
        width: 100%; //grow all h5 element
        align-self: flex-start;
        order: -1;
      }

      .content-container {
        display: grid;
        width: 100%;
        grid-template-columns: 30% 60%;
        justify-content: center;
        align-items: center;
        gap: 0.1em;

        p {
          display: block;
          flex-shrink: 0;
          grid-column: 2/3;
        }

        .icon-container {
          grid-column: 1/2;
        }
      }
    }

    .north {
      .compass {
        transform-origin: center;
        transition: rotate 0.5s ease-in-out;
        height: 100%;
        width: auto;
      }

      p {
        display: block;
        flex-basis: 60%;
        text-align: right;
      }
    }

    .wind {

      .wind-dir {
        flex-basis: 35%;

        .compass {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .cardinal-points {
            position: relative;
          }

          .needle {
            position: absolute;
            transition: rotate 0.5s ease-in-out;
            width: 30%;
          }
        }
      }
    }

    .gps {
      .unit {
        display: block;
        padding-left: 0;
      }
    }

    .gps {
      align-items: flex-end;
    }

    .map {
      padding: 0 0;
      overflow: hidden;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;

      img {
        height: 100%;
        width: auto;
      }
    }

    .coordinates,
    .wind,
    .drone-speed,
    .height,
    .temperature,
    .flight-time {
      justify-content: space-around;

      h5 {
        text-align: left;
      }
    }

    .latitude, .longitude {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .content-warning {
      background-color: $bambi-warning-color;
      transition: background-color border-box;
      animation: 3s ease-in-out infinite pulse-warning;

      .unit {
        color: black;
      }
    }

    .content-alert {
      background-color: $bambi-alert-color;
      transition: background-color border-box;
      animation: 0.7s ease-in-out infinite pulse-alert;
      position: relative;

      h6 {
        color: $bambi-nat-ultralight;
      }
    }

    .content-alert:after {
      display: block;
      content: "";
      width: 20%;
      height: 20%;
      background: transparent url('/@/assets/icons/triangle-alert-white.png') no-repeat;
      background-size: contain;
      position: absolute;
      right: 0.5em;
      top: 2em;
    }

    .coordinates.content-alert:after,
    .wind.content-alert:after,
    .drone-speed.content-alert:after,
    .height.content-alert:after,
    .temperature.content-alert:after,
    .flight-time.content-alert:after {
      right: -0.7em;
      top: 0.5em;
    }

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

@media screen and (orientation: landscape) {
  h1 {
    //display: block;
    font-size: 2rem;
  }

  .home-view {
    .content {
      max-width: 700px;
      grid-auto-rows: 1fr;
      grid-template-columns: repeat(12, 1fr);

      //region grid layout
      .north {
        grid-column: 1/3;
        grid-row: 1/2;
      }

      .gps {
        grid-column: 3/5;
        grid-row: 1/2;
      }

      .battery {
        grid-column: 5/7;
        grid-row: 1/2;
      }

      .storage {
        grid-column: 7/9;
        grid-row: 1/2;
      }

      .height {
        grid-column: 1/5;
        grid-row: 2/3;
      }

      .coordinates {
        grid-column: 5/9;
        grid-row: 2/3;
      }

      .wind {
        grid-column: 1/4;

        .wind-dir {

          .compass {
            img {
              max-height: 100%;
              max-width: auto;
            }
          }
        }
      }

      .drone-speed {
        grid-column: 4/7;
      }

      .flight-time {
        grid-column: 7/11;
      }

      .temperature {
        grid-column: 11/13;
      }

      .map {
        grid-column: 9/13;
        grid-row: 1/3;
      }

      //endregion
    }
  }

}

@media screen and (min-width: 700px) and (orientation: portrait) {
  h5 {
    font-size: 1.2rem;
  }
  h6 {
    font-size: 0.9rem;
  }
  .num {
    font-size: 1.3rem;
  }
  .unit {
    font-size: 0.7rem;
  }
  .home-view {
    .content {
      max-width: 650px;
    }
  }
}

@media screen and (min-width: 899px) {
  h5 {
    font-size: 1.2rem;
  }
  h6 {
    font-size: 0.9rem;
  }
  .num {
    font-size: 1.3rem;
  }
  .unit {
    font-size: 0.7rem;
  }
  .home-view {
    .content {
      max-width: 800px;
    }
  }
}

@media screen and (min-width: 1000px) {
  h5 {
    font-size: 1.3rem;
  }
  h6 {
    font-size: 1rem;
  }
  .num {
    font-size: 1.4rem;
  }
  .unit {
    font-size: 0.8rem;
  }
  .home-view {
    .content {
      max-width: 900px;
    }
  }
}

@media screen and (min-width: 1400px) {
  p {

  }
  h5 {
    font-size: 1.5rem;
  }
  h6 {
    font-size: 1.2rem;
  }
  .num {
    font-size: 1.6rem;
  }
  .unit {
    font-size: 1rem;
  }
  .home-view {
    .content {
      max-width: 1100px;
    }
  }
}

.warning {
  border-color: $bambi-warning-color;
  $shadow: inset 0 0 30px $bambi-warning-color;

  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;

  .unit {
    color: black;
  }
}

.alert {
  border-color: $bambi-alert-color;
}

.content-warning {
  background-color: $bambi-warning-color;

  // TODO maybe also change styles
}

.content-alert {
  background-color: $bambi-alert-color;

  .unit,
  h5,
  .num {
    color: white;
  }

  img {
    filter: invert(100%);
  }
}

@keyframes north {
  0% {
    rotate: 360deg;
  }
  100% {
    rotate: 0deg;
  }
}

@keyframes pulse-alert {
  0% {
    background-color: $bambi-alert-color;
    box-shadow: $bambi-alert-glow;
  }
  50% {
    background-color: $bambi-alert-color-translucent;
    box-shadow: none;

  }
  100% {
    background-color: $bambi-alert-color;
    box-shadow: $bambi-alert-glow;

  }
}

@keyframes pulse-warning {
  0% {
    background-color: $bambi-warning-color;
  }
  50% {
    background-color: $bambi-warning-color-translucent;

  }
  100% {
    background-color: $bambi-warning-color;
  }
}
</style>
