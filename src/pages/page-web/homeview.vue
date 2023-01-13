<!--suppress ALL -->
<template>
  <div class="outer-div">
    <div class="home-view">
      <div class="content">
        <div class="north">
          <div class="content-container">
            <div class="icon-container north">
              <img :src="compass" alt="icon of compass" class="home-icon compass" :style="{rotate: droneDir + 'deg'}">
            </div>
            <p v-if="check" class="num">-- °</p>
            <p v-else-if="testing" class="num">{{ droneDir }} °</p>
            <p v-else class="num">{{ droneDir }} °</p> <!--todo 5 add nordung-->
          </div>
          <h5>Nordung</h5>
        </div>

        <div class="gps">
          <div>
            <p v-if="check" class="num">-- <span class="unit">Satelliten</span></p>
            <p v-else-if="testing" class="num">30
              <span class="unit">Satelliten</span>
            </p>
            <p v-else class="num">{{ data.rtk_number }}
              <span class="unit">Satelliten</span>
            </p>
          </div>
          <h5>RKT State</h5>
        </div>

        <div class="battery">
          <div class="content-container">
            <div class="icon-container">
              <img :src="battery" class="home-icon" alt="icon of battery">
            </div>
            <p v-if="check" class="num">-- <span class="unit">%</span></p>
            <p v-else-if="testing" class="num">100
              <span class="unit">%</span>
            </p>
            <p v-else class="num">{{ data.battery }}
              <span class="unit">%</span>
            </p>
          </div>
          <h5>Batterie</h5>
        </div>

        <div class="storage">
          <div class="content-container">
            <div class="icon-container">
              <img :src="storage" class="home-icon" alt="icon of storage">
            </div>
            <p v-if="check" class="num">-- <span class="unit">%</span></p>
            <p v-else-if="testing" class="num">100
              <span class="unit">%</span>
            </p>
            <p v-else class="num">{{ data.storage }}
              <span class="unit">%</span>
            </p>
          </div>
          <h5>Storage</h5>
        </div>

        <div id="map" class="map" style="display: block"></div>

        <div class="height">
          <div>
            <h6>height</h6>
            <p v-if="check" class="num">---,- <span class="unit">m</span></p>
            <p v-else-if="testing" class="num">350
              <span class="unit">m</span>
            </p>
            <p v-else class="num">{{ data.height }}
              <span class="unit">m</span>
            </p>
          </div>

          <div>
            <h6>elevation</h6>
            <p v-if="check" class="num">---,- <span class="unit">m</span></p>
            <p v-else-if="testing" class="num">100<span class="unit">m</span></p>
            <p v-else class="num">{{ data.elevation }}<span class="unit">m</span></p>
          </div>
          <h5>Höhen</h5>
        </div>

        <div class="coordinates">
          <div class="latitude">
            <h6>latitude</h6>
            <p v-if="check" class="num">--,------</p>
            <p v-else-if="testing" class="num">-23,423239</p>
            <p v-else class="num">{{ mapData.currentLocation[0] }}</p>
          </div>

          <div class="longitude">
            <h6>longitude</h6>
            <p v-if="check" class="num">--,------</p>
            <p v-else-if="testing" class="num">-11,111118</p>
            <p v-else class="num">{{ mapData.currentLocation[1] }}</p>
          </div>
          <h5>Coordinates</h5>
        </div>

        <div class="wind">
          <div class="wind-dir"> <!--todo check with icon and rotation
          {"1":"North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"} -->
            <!--          <h6>Direction</h6>-->
            <div class="compass">
              <img class="cardinal-points" :src="cardinalPoints">
              <img class="needle" :class="direction" :src="needle" :style="{rotate: direction + 'deg'}">
            </div>
          </div>

          <div class="wind-speed">
            <h6>Speed</h6>
            <p v-if="check" class="num">-- <span class="unit">m/s</span></p>
            <p v-else-if="testing" class="num">
              <span class="unit">m/s</span>
            </p>
            <p v-else class="num">{{ data.wind_speed }}
              <span class="unit">m/s</span>
            </p>
          </div>
          <h5>Wind</h5>
        </div>

        <div class="drone-speed">
          <div class="speed-horizontal">
            <h6>horizontal</h6>
            <p v-if="check" class="num">-- <span class="unit">m/s</span></p>
            <p v-else-if="testing" class="num">2.5<span class="unit">m/s</span></p>
            <p v-else class="num">{{ data.horizontal_speed }}<span class="unit">m/s</span></p>
          </div>
          <div class="speed-vertical">
            <h6>vertical</h6>
            <p v-if="check" class="num">-- <span class="unit">m/s</span></p>
            <p v-else-if="testing" class="num">2.35<span class="unit">m/s</span></p>
            <p v-else class="num">{{ data.vertical_speed }}<span class="unit">m/s</span></p>
          </div>
          <h5>Drone Speed</h5>
        </div>

        <div class="flight-time">
          <div class="since-start">
            <p v-if="check" class="num">--:--</p>
            <p v-else-if="testing" class="num">00:30</p>
            <p v-else class="num">00:30</p> <!--todo 5 fill-->
            <h6>since start</h6>
          </div>
          <div class="remaining-flight-time">
            <p v-if="check" class="num">--:--</p>
            <p v-else-if="testing" class="num">20:30</p>
            <p v-else class="num">20:30</p> <!--todo 5 fill-->
            <h6>remaining (battery)</h6>
          </div>
          <h5>Flight Time</h5>
        </div>
        <div class="temperature">
          <!-- todo 3 if else check -->
          <p v-if="check" class="num">--<span class="unit">°C</span></p>
          <p v-else-if="testing" class="num">-20<span class="unit">°C</span></p>
          <p v-else>{{}}<span class="unit">°C</span></p> <!-- TODO 3 add data-->
          <h5>Weather</h5>
        </div>
      </div>
      <br>
      <button @click="changeDir">change</button>
      <button @click="changeDirDrone">changeDrone</button>

    </div>
  </div>
</template>

<script lang="ts" setup>
import battery from '/@/assets/icons/icons_homeview/battery.png'
import compass from '/@/assets/icons/icons_homeview/compass 1.png'
import storage from '/@/assets/icons/icons_homeview/micro-sd-karte.png'
import cardinalPoints from '/@/assets/icons/icons_homeview/compass.png'
import needle from '/@/assets/icons/icons_homeview/needle.png'
// leaflet
import 'leaflet/dist/leaflet.css'
import L, { LatLng, LayerGroup } from 'leaflet'

// region ---------------------------- tsa copy code ----------------------------
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useMyStore } from '/@/store'
import { getDeviceTopo, getUnreadDeviceHms } from '/@/api/manage'
import { EModeCode, OSDVisible } from '/@/types/device'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'

const check = ref(false)
const testing = ref(true)

const store = useMyStore()
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
    if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
      check.value = false
    }
    setInterval(() => { // interval that regularly updates the various data
      updateMap()
      updateData()
      // printData()
    }, 3000)
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
  currentLocation: null, // initial location for the marker
  latlngs: [[48, 14]]
})

function prepMap () {
  mapData.currentLocation = getLocation()
  console.log(mapData.currentLocation)
  mapData.map = L.map('map').setView(mapData.currentLocation, 13)
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

const fakeLocation = [[48.3, 14.3], [48.3, 14.35], [48.3, 14.4]]
let index = 0

// TODO 2 add something until map is loaded
function getLocation () {
  // TODO Change fake to real
  if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
    const latLong: [number, number] = [
      deviceInfo.value[onlineDevices.data[0].sn].latitude,
      deviceInfo.value[onlineDevices.data[0].sn].longitude
    ]
    return latLong
  } else {
    let latLong: [number, number]
    if (fakeLocation[index][1] === 14.3) {
      latLong = [fakeLocation[index][0], fakeLocation[index][1]]
      index = 1
    } else if (fakeLocation[index][1] === 14.35) {
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

const data = reactive({
  battery: null,
  heading: null,
  height: null,
  elevation: null,
  wind_direction: 1, // initial location for the marker
  wind_speed: null,
  vertical_speed: null,
  horizontal_speed: null,
  rtk_number: null,
  storage: null,
  gimbal_yaw: null,
  gimbal_pitch: null,

})

function prepData () {
  if (!check.value) {
    data.battery = deviceInfo.value[onlineDevices.data[0].sn].battery.capacity_percent
    data.heading = deviceInfo.value[onlineDevices.data[0].sn].heading
    data.height = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].height * 100) / 100
    data.elevation = Math.floor(deviceInfo.value[onlineDevices.data[0].sn].elevation * 100) / 100
    data.wind_direction = deviceInfo.value[onlineDevices.data[0].sn].wind_direction / 10
    data.wind_speed = deviceInfo.value[onlineDevices.data[0].sn].wind_speed
    data.vertical_speed = deviceInfo.value[onlineDevices.data[0].sn].vertical_speed
    data.horizontal_speed = deviceInfo.value[onlineDevices.data[0].sn].horizontal_speed
    data.rtk_number = deviceInfo.value[onlineDevices.data[0].sn].position_state.rtk_number
    data.storage = Math.floor(100 - deviceInfo.value[onlineDevices.data[0].sn].storage.total / deviceInfo.value[onlineDevices.data[0].sn].storage.used)
    data.gimbal_yaw = deviceInfo.value[onlineDevices.data[0].sn].payloads.gimbal_yaw
    data.gimbal_pitch = deviceInfo.value[onlineDevices.data[0].sn].payloads.gimbal_pitch
  } else {
    data.battery = 100
    data.heading = 0
    data.height = 500
    data.elevation = 100
    data.wind_direction = 3
    data.wind_speed = 66
    data.vertical_speed = 4.4
    data.horizontal_speed = 1.1
    data.rtk_number = 23
    data.storage = Math.floor(100 - 121610000 / 7378000)
    data.gimbal_yaw = -17.3
    data.gimbal_pitch = -90
  }
}

function updateData () {
  data.battery -= 1
  data.heading = Math.round((data.heading + 0.1) * 100) / 100
  data.height += 1
  data.elevation += 1
  data.wind_direction = Math.round((data.wind_direction + 0.1) * 10) / 100 // note is it a value?
  data.wind_speed -= 1
  data.vertical_speed = Math.round((data.vertical_speed + 0.1) * 100) / 100
  data.horizontal_speed = Math.round((data.horizontal_speed - 0.1) * 100) / 100
  data.rtk_number -= 1
  data.storage = Math.round(100 - 121610000 / 7378000 * data.heading)
  data.gimbal_yaw = Math.round((data.gimbal_yaw + 0.1) * 100) / 100
  data.gimbal_pitch += 1
}

// endregion

const storage_percent = ref(0)

// region ---------------------------- compass logic  ----------------------------

// compass
const droneDir = ref(0)
const direction = ref(0)
// TODO delete in production
let i = -1
const dires = [
  'North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'
]
const dirsObj = {
  1: 'North',
  2: 'Northeast',
  3: 'East',
  4: 'Southeast',
  5: 'South',
  6: 'Southwest',
  7: 'West',
  8: 'Northwest'
}
let dirTest = 'North'

function closestAngle (from: number, to: number) {
  // https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
  return from + ((((to - from) % 360) + 540) % 360) - 180
}

function chooseDeg (direction: number, deg: number) {
  switch (dirTest) { // todo change in production
    case 'North':
      direction = closestAngle(direction, 0)
      break
    case 'Northeast':
      direction = closestAngle(direction, 45)
      break
    case 'East':
      direction = closestAngle(direction, 90)
      break
    case 'Southeast':
      direction = closestAngle(direction, 135)
      break
    case 'South':
      direction = closestAngle(direction, 180)
      break
    case 'Southwest':
      direction = closestAngle(direction, 225)
      break
    case 'West':
      direction = closestAngle(direction, 270)
      break
    case 'Northwest':
      direction = closestAngle(direction, 315)
      break
  }
  if (deg !== -20) {
    direction = closestAngle(direction, deg)
  }
  return direction
}

function changeDir () {
  i = Math.floor(Math.random() * 8)
  dirTest = dires[i]
  direction.value = chooseDeg(direction.value, -20)
  check.value = false
}

function changeDirDrone () {
  droneDir.value = chooseDeg(droneDir.value, Math.floor(Math.random() * 380))
}

// endregion

// todo 2 add little animation for warning and alert

// todo 2 https://open-meteo.com/ search for good api for temperature and fetch data or maybe drone has data
</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

$num-font-size: 1.1rem;
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

img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
}

.num {
  font-feature-settings: "tnum";
  font-size: $num-font-size;
}

.unit {
  color: $bambi-shade-darker-1;
  font-size: 10px;
}

.outer-div {
  width: 100%;
  height: calc(100% - (2 * $bottom-bar-height));
  background-color: $bambi-white;
  padding: 2vw;

  overflow-y: scroll;
}

.home-view {
  width: 100%;
  //height: calc(100% - (2 * $bottom-bar-height));
  border: $bambi-white 4px solid;
  border-radius: 10px;
  background-color: $bambi-white;

  .content {
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
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; //#36
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
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;

        p {
          flex-shrink: 0;
        }

        .icon-container /*:not(.north)*/
        {
          height: 1.8em;
          flex-basis: auto;

          img {
            height: 100%;
            width: auto;
          }
        }

        .icon-container.north { //change size for pfeil

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
      }
    }

    .north,
    .gps,
    .battery,
    .storage {
      div {
        width: 100%;
      }
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

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.warning {
  border-color: $bambi-warning-color;
  $shadow: inset 0 0 30px $bambi-warning-color;

  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;

  //todo 2 add little animation for warning and alert
}

.alert {
  border-color: $bambi-alert-color;
}

@keyframes north {
  0% {
    rotate: 360deg;
  }
  100% {
    rotate: 0deg;
  }
}
</style>
