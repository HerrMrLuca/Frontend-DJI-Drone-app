<template>
  <div>
    <div>
      <div id="map">
      </div>
    </div>
    <div>
      <div v-if:="onlineDevices.data[0] && deviceInfo[onlineDevices.data[0].sn]">
        <div v-for="device in onlineDevices.data" :key="device.sn" style="background: #3c3c3c; height: 90px; width: 250px; margin-bottom: 10px;">
          <div>{{ deviceInfo[device.sn].battery.capacity_percent }}%</div>
          <div>Nordungsabweichung: {{ deviceInfo[device.sn].attitude_head }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ColumnProps, TableState } from 'ant-design-vue/lib/table/interface'
import { h, onMounted, onUpdated, reactive, ref, UnwrapRef, watch, computed, WritableComputedRef } from 'vue'
import { IPage } from '/@/api/http/type'
import {
  BindBody,
  bindDevice,
  getBindingDevices,
  getDeviceTopo,
  getUnreadDeviceHms,
  unbindDevice,
  updateDevice, updateDeviceHms
} from '/@/api/manage'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'
import { EditOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, FileSearchOutlined, CloudServerOutlined, RocketOutlined, EyeInvisibleOutlined, EyeOutlined, RobotOutlined, DoubleRightOutlined, EllipsisOutlined, CameraFilled, UserOutlined } from '@ant-design/icons-vue'
import { Device, DeviceFirmwareStatusEnum, EModeCode, DeviceStatus, OSDVisible, EDockModeCode, DeviceOsd, EDeviceType } from '/@/types/device'
import DeviceFirmwareUpgrade from '/@/components/devices/device-upgrade/DeviceFirmwareUpgrade.vue'
import DeviceFirmwareUpgradeModal from '/@/components/devices/device-upgrade/DeviceFirmwareUpgradeModal.vue'
import { useDeviceFirmwareUpgrade } from '/@/components/devices/device-upgrade/use-device-upgrade'
import { useDeviceUpgradeEvent } from '/@/components/devices/device-upgrade/use-device-upgrade-event'
import { DeviceCmdExecuteInfo, DeviceCmdExecuteStatus } from '/@/types/device-cmd'
import DeviceLogUploadRecordDrawer from '/@/components/devices/device-log/DeviceLogUploadRecordDrawer.vue'
import DeviceHmsDrawer from '/@/components/devices/device-hms/DeviceHmsDrawer.vue'
import { message } from 'ant-design-vue'

// Imports for Map
import 'leaflet/dist/leaflet.css'
// import 'https://unpkg.com/leaflet-compass@1.0.0/dist/leaflet-compass.min.js'
import L, { LatLng, LayerGroup } from 'leaflet'
import { deleteWaylineFile, downloadWaylineFile, getWaylineFiles } from '/@/api/wayline'

import { WaylineFile } from '/@/types/wayline'
import { downloadFile } from '/@/utils/common'

import noData from '/@/assets/icons/no-data.png'
import rc from '/@/assets/icons/rc.png'
import { useMyStore } from '/@/store'
import { useMyFakeStore } from '/@/store/fakestore.ts'
import { EHmsLevel } from '/@/types/enums'
import { DistanceLimitStatus, NightLightsStateEnum, ObstacleAvoidance } from '/@/types/device-setting'
import Livestream from '/@/pages/page-web/livestream-view.vue'
import Agora from '/@/pages/page-web/bambi/agora.vue'

const store = useMyStore()
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceId = ref(localStorage.getItem(ELocalStorageKey.WorkspaceId)!)
const osdVisible = ref({} as OSDVisible)
const hmsVisible = new Map<string, boolean>()

// Map Variables
const waylinesData = reactive({
  data: [] as WaylineFile[]
})
const deleteWaylineId = ref<string>('')
const canRefresh = ref(true)

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
  store: null,
  deviceInfo: null,
  polyline: null,
  waypointsLayer: null,
  currentLocation: [48.2, 14.3], // initial location for the marker
  latlngs: [[48, 14]]
})

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
console.log(store)
const dockInfo = computed(() => store.state.deviceState.dockInfo)
const hmsInfo = computed({
  get: () => store.state.hmsInfo,
  set: (val: any) => {
    return val
  }
})

class FakeDeviceOsd {
  public battery = { capacity_percent: 75, landing_power: 45, remain_flight_time: 100, return_home_power: 35 }
  public distance_limit_status = true
  public elevation = '50'
  public gear= 2
  public height= 512
  public height_limit= 1000
  public home_distance= 10
  public horizontal_speed= 25
  public latitude= 48
  public longitude= 14
  public mode_code= 2
  public night_lights_state= true
  public obstacle_avoidance= true
  public position_state= { gps_number: 'string', is_fixed: 4, rtk_number: 'string' }
  public vertical_speed= 'string'
  public wind_direction= 'string'
  public wind_speed= 'string'
}

const fakeDeviceInfo = new FakeDeviceOsd()

interface DeviceData {
  device: Device[]
}

const loading = ref(true)
const deleteTip = ref<boolean>(false)
const deleteSn = ref<string>()
const columns: ColumnProps[] = [
  { title: 'Model', dataIndex: 'device_name', width: 100, className: 'titleStyle' },
  { title: 'SN', dataIndex: 'device_sn', width: 100, className: 'titleStyle', ellipsis: true, slots: { customRender: 'sn' } },
  {
    title: 'Name',
    dataIndex: 'nickname',
    width: 100,
    sorter: (a: Device, b: Device) => a.nickname.localeCompare(b.nickname),
    className: 'titleStyle',
    ellipsis: true,
    slots: { customRender: 'nickname' }
  },
  { title: 'Firmware Version', dataIndex: 'firmware_version', width: 150, className: 'titleStyle', slots: { customRender: 'firmware_version' } },
  { title: 'Status', dataIndex: 'status', width: 100, className: 'titleStyle', slots: { customRender: 'status' } },
  {
    title: 'Workspace',
    dataIndex: 'workspace_name',
    width: 100,
    className: 'titleStyle',
    ellipsis: true,
    slots: { customRender: 'workspace' },
    customRender: ({ text, record, index }) => {
      const obj = {
        children: text,
        props: {} as any,
      }
      if (current.value.indexOf(EDeviceTypeName.Dock) !== -1) {
        if (record.domain === EDeviceTypeName.Aircraft) {
          obj.children = ''
        }
      }
      return obj
    }
  },
  { title: 'Joined', dataIndex: 'bound_time', width: 150, sorter: (a: Device, b: Device) => a.bound_time.localeCompare(b.bound_time), className: 'titleStyle' },
  { title: 'Last Online', dataIndex: 'login_time', width: 150, sorter: (a: Device, b: Device) => a.login_time.localeCompare(b.login_time), className: 'titleStyle' },
  {
    title: 'Actions',
    dataIndex: 'actions',
    width: 100,
    className: 'titleStyle',
    slots: { customRender: 'action' }
  },
]

const expandIcon = (props: any) => {
  if (judgeCurrentType(EDeviceTypeName.Dock) && !props.expanded) {
    return h('div',
      {
        style: 'border-left: 2px solid rgb(200,200,200); border-bottom: 2px solid rgb(200,200,200); height: 16px; width: 16px; float: left;',
        class: 'mt-5 ml0',
      })
  }
}

const rowClassName = (record: any, index: number) => {
  const className = []
  if ((index & 1) === 0) {
    className.push('table-striped')
  }
  if (record.domain !== EDeviceTypeName.Dock) {
    className.push('child-row')
  }
  return className.toString().replaceAll(',', ' ')
}

const expandRows = ref<string[]>([])
const data = reactive<DeviceData>({
  device: []
})

const paginationProp = reactive({
  pageSizeOptions: ['20', '50', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
  pageSize: 50,
  current: 1,
  total: 0
})

onMounted(() => {
  getWaylines() // get waylines
  prepMap() // prep necessary map data
  getDevices(current.value[0])
  getOnlineTopo()
  setTimeout(() => {
    watch(() => store.state.deviceStatusEvent,
      (data: { deviceOnline: { sn: string } }) => {
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
  }, 3000)
  setInterval(() => { // interval that regularly updates the various data
    updateMap()
    updateBatteryPercentage()
    updateNorthCheck()
    // printData()
  }, 1000)
}
)

onUpdated(() => {
  const element = document.getElementsByClassName('scrollbar').item(0) as HTMLDivElement
  const parent = element?.parentNode as HTMLDivElement
  setTimeout(() => {
    if (element?.scrollHeight < parent?.clientHeight && paginationProp.total > waylinesData.data.length) {
      if (canRefresh.value) {
        paginationProp.page++
        getWaylines()
      }
    } else if (element && element.className.indexOf('height-100') === -1) {
      element.className = element.className + ' height-100'
    }
  }, 300)
})

function prepMap () {
  mapData.map = L.map('map').setView(mapData.currentLocation, 13)
  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(mapData.map)

  mapData.marker = L.marker(mapData.currentLocation, { icon: droneIcon }).addTo(mapData.map)
  mapData.polyline = L.polyline(mapData.latlngs, { color: 'red' }).addTo(mapData.map)
  mapData.waypointsLayer = new LayerGroup()
  mapData.waypointsLayer.addTo(mapData.map)
}

function updateMap () {
  mapData.waypointsLayer.clearLayers()
  mapData.polyline.setLatLngs(getWaypoints())
  for (let i = 0; i < mapData.polyline.getLatLngs().length; i++) {
    // mapData.waypointsLayer.addLayer(new L.marker(mapData.polyline.getLatLngs()[i], { icon: waypointIcon }).addTo((mapData.map)))
  }
  mapData.marker.setLatLng(getLocation())
}

const fakeLocation = [[51, 0], [51, 0.1], [51, 0.2]]
const fakeWaypoint = [[51.1, 0], [51.2, 0], [51.1, 0.1], [51.2, 0.1]]
let index = 0
function getLocation () {
  // TODO Change fake to real
  if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
    // console.log(deviceInfo.value[onlineDevices.data[0].sn])
    const latLong: [number, number] = [
      deviceInfo.value[onlineDevices.data[0].sn].latitude,
      deviceInfo.value[onlineDevices.data[0].sn].longitude
    ]
    return latLong
  } else {
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
    return latLong
  }
  // console.log(latLong)
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

function getWaylines () {
  if (!canRefresh.value) {
    return
  }
  canRefresh.value = false
  getWaylineFiles(workspaceId, {
    page: paginationProp.page,
    page_size: paginationProp.page_size,
    order_by: 'update_time desc'
  }).then(res => {
    if (res.code !== 0) {
      return
    }
    res.data.list.forEach((wayline: WaylineFile) => waylinesData.data.push(wayline))
    paginationProp.total = res.data.pagination.total
    paginationProp.page = res.data.pagination.page
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
    paginationProp.total--
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
  if (element.scrollTop + element.clientHeight === element.scrollHeight && Math.ceil(paginationProp.total / paginationProp.page_size) > paginationProp.page && canRefresh.value) {
    paginationProp.page++
    getWaylines()
  }
}

function updateBatteryPercentage () {
  const batteryPercentage = getBatteryPercentage()
  if (batteryPercentage <= 40) {
    if (batteryPercentage % 5 === 0) {
      alert('The Battery is at ' + batteryPercentage + '%!')
    }
  }
}

function getBatteryPercentage () {
  if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
    return deviceInfo.value[onlineDevices.data[0].sn].battery.capacity_percent
  } else {
    return 100
  }
}

function updateNorthCheck () {
  const heading = getHeading()
  if (heading > 150.5 || heading < -150.5) {
    alert('Drohne nicht genordet! Momentane Abweichung: ' + heading + '!')
  }
}

function getHeading () {
  if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
    console.log(deviceInfo.value[onlineDevices.data[0].sn])
    return deviceInfo.value[onlineDevices.data[0].sn].attitude_head
  }
  return 0
}

// 获取分页信息
function getPaginationBody () {
  return {
    page: paginationProp.current,
    page_size: paginationProp.pageSize
  } as IPage
}

const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: any, selected: boolean, selectedRows: []) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => {
    console.log(selected, selectedRows, changeRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: judgeCurrentType(EDeviceTypeName.Dock) && record.domain !== EDeviceTypeName.Dock,
    style: judgeCurrentType(EDeviceTypeName.Dock) && record.domain !== EDeviceTypeName.Dock ? 'display: none' : ''
  }),
}
type Pagination = TableState['pagination']

const workspaceId2: string = localStorage.getItem(ELocalStorageKey.WorkspaceId) || ''
const editableData: UnwrapRef<Record<string, Device>> = reactive({})
const current = ref([EDeviceTypeName.Aircraft])

function judgeCurrentType (type: EDeviceTypeName): boolean {
  return current.value.indexOf(type) !== -1
}

// 设备升级
const {
  deviceFirmwareUpgradeModalVisible,
  selectedDevice,
  onDeviceUpgrade,
  onUpgradeDeviceOk
} = useDeviceFirmwareUpgrade(workspaceId2)

function onDeviceUpgradeWs (payload: DeviceCmdExecuteInfo) {
  updateDevicesByWs(data.device, payload)
}

function updateDevicesByWs (devices: Device[], payload: DeviceCmdExecuteInfo) {
  if (!devices || devices.length <= 0) {
    return
  }
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].device_sn === payload.sn) {
      if (!payload.output) return
      const { status, progress } = payload.output
      if (status === DeviceCmdExecuteStatus.Sent || status === DeviceCmdExecuteStatus.InProgress) { // 升级中
        devices[i].firmware_status = DeviceFirmwareStatusEnum.DuringUpgrade
        devices[i].firmware_progress = progress?.percent || 0
      } else { // 终态：成功，失败，超时
        if (status === DeviceCmdExecuteStatus.Failed || status === DeviceCmdExecuteStatus.Timeout) {
          message.error(`设备(${payload.sn}) 升级失败`)
        }
        // 拉取列表
        getDevices(current.value[0], true)
      }
      return
    }
    if (devices[i].children) {
      updateDevicesByWs(devices[i].children || [], payload)
    }
  }
}

useDeviceUpgradeEvent(onDeviceUpgradeWs)

// 获取设备列表信息
function getDevices (domain: string, closeLoading?: boolean) {
  if (!closeLoading) {
    loading.value = true
  }
  getBindingDevices(workspaceId2, getPaginationBody(), domain).then(res => {
    if (res.code !== 0) {
      return
    }
    const resData: Device[] = res.data.list
    expandRows.value = []
    resData.forEach((val: any) => {
      if (val.children) {
        val.children = [val.children]
      }
      if (judgeCurrentType(EDeviceTypeName.Dock)) {
        expandRows.value.push(val.device_sn)
      }
    })
    data.device = resData
    paginationProp.total = res.data.pagination.total
    paginationProp.current = res.data.pagination.page
    paginationProp.pageSize = res.data.pagination.page_size
    loading.value = false
  })
}

function refreshData (page: Pagination) {
  paginationProp.current = page?.current!
  paginationProp.pageSize = page?.pageSize!
  getDevices(current.value[0])
}

// 编辑
function edit (record: Device) {
  editableData[record.device_sn] = record
}

// 保存
function save (record: Device) {
  delete editableData[record.device_sn]
  updateDevice({ nickname: record.nickname }, workspaceId2, record.device_sn)
}

// 删除
function showDeleteTip (sn: any) {
  deleteTip.value = true
}

// 解绑
function unbind () {
  deleteTip.value = false
  unbindDevice(deleteSn.value?.toString()!).then(res => {
    if (res.code !== 0) {
      return
    }
    getDevices(current.value[0])
  })
}

// 选择设备
function select (item: any) {
  getDevices(item.key)
}

const currentDevice = ref({} as Device)
// 设备日志
const deviceLogUploadRecordVisible = ref(false)
function showDeviceLogUploadRecord (dock: Device) {
  deviceLogUploadRecordVisible.value = true
  currentDevice.value = dock
}

// 健康状态
const hmsVisible2 = ref<boolean>(false)

function showHms (dock: Device) {
  hmsVisible2.value = true
  currentDevice.value = dock
}

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

function switchVisible (e: any, device: OnlineDevice, isDock: boolean, isClick: boolean) {
  console.log('switchVisibel')
  if (!isClick) {
    console.log('not-allowed')
    e.target.style.cursor = 'not-allowed'
    return
  }
  if (device.sn === osdVisible.value.sn) {
    console.log(!osdVisible.value.visible)
    osdVisible.value.visible = !osdVisible.value.visible
  } else {
    osdVisible.value.sn = device.sn
    osdVisible.value.callsign = device.callsign
    osdVisible.value.model = device.model
    osdVisible.value.visible = true
    osdVisible.value.gateway_sn = device.gateway.sn
    osdVisible.value.is_dock = isDock
    osdVisible.value.gateway_callsign = device.gateway.callsign
  }
  store.commit('SET_OSD_VISIBLE_INFO', osdVisible)
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

function readHms (visiable: boolean, sn: string) {
  if (!visiable) {
    updateDeviceHms(workspaceId.value, sn).then(res => {
      if (res.code === 0) {
        delete hmsInfo.value[sn]
      }
    })
  }
}
//
function printData () {
  let str = 'Data: \n'
  if (onlineDevices.data[0] && deviceInfo.value[onlineDevices.data[0].sn]) {
    console.log(deviceInfo.value[onlineDevices.data[0].sn])
    str += 'lat:'
    str += deviceInfo.value[onlineDevices.data[0].sn].latitude
    str += '\nlong:'
    str += deviceInfo.value[onlineDevices.data[0].sn].longitude
    str += '\nv-speed:'
    str += deviceInfo.value[onlineDevices.data[0].sn].vertical_speed
    str += '\nh-speed:'
    str += deviceInfo.value[onlineDevices.data[0].sn].horizontal_speed
    str += '\nelevation:'
    str += deviceInfo.value[onlineDevices.data[0].sn].elevation
    str += '\nheight:'
    str += deviceInfo.value[onlineDevices.data[0].sn].height
    str += '\nmode_code:'
    str += deviceInfo.value[onlineDevices.data[0].sn].mode_code
    str += '\nattitude_head:'
    str += deviceInfo.value[onlineDevices.data[0].sn].attitude_head
    str += '\nattitude_roll:'
    str += deviceInfo.value[onlineDevices.data[0].sn].attitude_roll
    str += '\nattitude_pitch:'
    str += deviceInfo.value[onlineDevices.data[0].sn].attitude_pitch
  }
  console.log(str)
}
</script>

<style lang="scss" scoped>
.device-table-wrap{
  .editable-row-operations{
    div > span {
      margin-right: 10px;
    }
  }
}
</style>

<style lang="scss">
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';
@import '/@/../node_modules/leaflet/dist/leaflet.css';
.table {
  background-color: white;
  margin: 20px;
  padding: 20px;
  height: 88vh;
}
.table-striped {
  background-color: #f7f9fa;
}
.ant-table {
  border-top: 1px solid rgb(0,0,0,0.06);
  border-bottom: 1px solid rgb(0,0,0,0.06);
}
.ant-table-tbody tr td {
  border: 0;
}
.ant-table td {
  white-space: nowrap;
}
.ant-table-thead tr th {
  background: white !important;
  border: 0;
}
th.ant-table-selection-column {
  background-color: white !important;
}
.ant-table-header {
  background-color: white !important;
}
.child-row {
  height: 70px;
}
.notice {
  background: $success;
  overflow: hidden;
  cursor: pointer;
}
.caution {
  background: orange;
  cursor: pointer;
  overflow: hidden;
}
.warn {
  background: red;
  cursor: pointer;
  overflow: hidden;
}
#map {
  height: 300px;
  width: 300px;
}
</style>
