<template>
  <div class="profile-wrapper">
    <img :src="drohnePic" alt="image of a drone">

    <div>
      <h2>Model</h2>
      <!--<p>{{ data.model }}</p>-->
      <!--Note: The code below might not work, please test it-->
      <p>{{ data.device[0].device_name }}</p>
    </div>

    <div>
      <h2>Firmware</h2>
      <!--<p>05.01.0000</p>-->
      <!--Note: The code below might not work, please test it-->
      <p>{{ data.device[0].firmware_version }}</p>
    </div>

    <div>
      <h2>SN</h2>
      <!--<p>{{ data.sn }}</p>-->
      <!--Note: The code below might not work, please test it-->
      <p>{{ data.device[0].device_sn }}</p>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { IPage } from '/@/api/http/type'
import { getBindingDevices } from '/@/api/manage'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'
import { Device, DeviceFirmwareStatusEnum } from '/@/types/device'
import { useDeviceUpgradeEvent } from '/@/components/devices/device-upgrade/use-device-upgrade-event'
import { DeviceCmdExecuteInfo, DeviceCmdExecuteStatus } from '/@/types/device-cmd'
import { message } from 'ant-design-vue'

import drohnePic from '/@/assets/icons/m30.png'

interface DeviceData {
  device: Device[]
}

const loading = ref(true)

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

// 获取分页信息
function getPaginationBody () {
  return {
    page: paginationProp.current,
    page_size: paginationProp.pageSize
  } as IPage
}

const workspaceId: string = localStorage.getItem(ELocalStorageKey.WorkspaceId) || ''
const current = ref([EDeviceTypeName.Aircraft])

function judgeCurrentType (type: EDeviceTypeName): boolean {
  return current.value.indexOf(type) !== -1
}

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
      const {
        status,
        progress
      } = payload.output
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
  getBindingDevices(workspaceId, getPaginationBody(), domain).then(res => {
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

// 选择设备
function select (item: any) {
  getDevices(item.key)
}

onMounted(() => {
  getDevices(current.value[0])
})

</script>

<style lang="scss" scoped>
.device-table-wrap {
  .editable-row-operations {
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
  border-top: 1px solid rgb(0, 0, 0, 0.06);
  border-bottom: 1px solid rgb(0, 0, 0, 0.06);
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

//
img {
  display: block;
  width: 300px;
  height: auto;
}

h2, p {
  text-align: center;
}

p {
  margin-bottom: 0.5em;
}

.profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
