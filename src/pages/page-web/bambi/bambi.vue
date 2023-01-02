
<template>
  <div>
    <div>
      <my-map>

      </my-map>
    </div>
    <div>
      <my-battery>

      </my-battery>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ColumnProps, TableState } from 'ant-design-vue/lib/table/interface'
import { h, onMounted, reactive, ref, UnwrapRef, watch, computed, WritableComputedRef } from 'vue'
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
import { EditOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, FileSearchOutlined, CloudServerOutlined, RocketOutlined, EyeInvisibleOutlined, EyeOutlined, RobotOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import { Device, DeviceFirmwareStatusEnum, EModeCode, DeviceStatus, OSDVisible, EDockModeCode, DeviceOsd } from '/@/types/device'
import DeviceFirmwareUpgrade from '/@/components/devices/device-upgrade/DeviceFirmwareUpgrade.vue'
import DeviceFirmwareUpgradeModal from '/@/components/devices/device-upgrade/DeviceFirmwareUpgradeModal.vue'
import { useDeviceFirmwareUpgrade } from '/@/components/devices/device-upgrade/use-device-upgrade'
import { useDeviceUpgradeEvent } from '/@/components/devices/device-upgrade/use-device-upgrade-event'
import { DeviceCmdExecuteInfo, DeviceCmdExecuteStatus } from '/@/types/device-cmd'
import DeviceLogUploadRecordDrawer from '/@/components/devices/device-log/DeviceLogUploadRecordDrawer.vue'
import DeviceHmsDrawer from '/@/components/devices/device-hms/DeviceHmsDrawer.vue'
import { message } from 'ant-design-vue'

import noData from '/@/assets/icons/no-data.png'
import rc from '/@/assets/icons/rc.png'
import { useMyStore } from '/@/store'
import { useMyFakeStore } from '/@/store/fakestore.ts'
import { EHmsLevel } from '/@/types/enums'
import { DistanceLimitStatus, NightLightsStateEnum, ObstacleAvoidance } from '/@/types/device-setting'
import MyMap from '/@/pages/page-web/bambi/map.vue'
import Livestream from '/@/pages/page-web/bambi/livestream.vue'
import Agora from '/@/pages/page-web/bambi/agora.vue'
import MyBattery from '/@/pages/page-web/bambi/battery.vue'

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
  getDevices(current.value[0])
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
  }, 3000)
})

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
// function printData () {
//   let str = 'Data: \n'
//   str += 'lat:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].latitude
//   str += '\nlong:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].longitude
//   str += '\nv-speed:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].vertical_speed
//   str += '\nh-speed:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].horizontal_speed
//   str += '\nelevation:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].elevation
//   str += '\nheight:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].height
//   str += '\nmode_code:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].mode_code
//   str += '\nattitude_head:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].attitude_head
//   str += '\nattitude_roll:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].attitude_roll
//   str += '\nattitude_pitch:'
//   str += deviceInfo.value[onlineDevices.data[0].sn].attitude_pitch
//   console.log(str)
// }
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

</style>
