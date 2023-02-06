import request, { IListWorkspaceResponse, IPage, IWorkspaceResponse } from '/@/api/http/request'
import { Device } from '/@/types/device'

const HTTP_PREFIX = '/manage/api/v1'

// login
export interface LoginBody {
  username: string,
  password: string,
  flag: number,
}

export interface HmsQueryBody {
  sns: string[],
  children_sn: string,
  device_sn: string,
  language: string,
  level: number | string,
  begin_time: number,
  end_time: number,
  message: string,
  domain: string,
}

export const login = async function (body: LoginBody): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/login`
  const result = await request.post(url, body)
  return result.data
}

// Get Platform Info
export const getPlatformInfo = async function (): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/workspaces/current`
  const result = await request.get(url)
  return result.data
}

// Get Device Topo
export const getDeviceTopo = async function (workspace_id: string): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices`
  const result = await request.get(url)
  return result.data
}

// Get Livestream Capacity
export const getLiveCapacity = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/live/capacity`
  const result = await request.get(url, body)
  return result.data
}

// Start Livestream
export const startLivestream = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/live/streams/start`
  const result = await request.post(url, body)
  return result.data
}

// Stop Livestream
export const stopLivestream = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/live/streams/stop`
  const result = await request.post(url, body)
  return result.data
}
// Update Quality
export const setLivestreamQuality = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/live/streams/update`
  const result = await request.post(url, body)
  return result.data
}

/**
 * 获取绑定设备信息
 * @param workspace_id
 * @param body
 * @param domain
 * @returns
 */
export const getBindingDevices = async function (workspace_id: string, body: IPage, domain: string): Promise<IListWorkspaceResponse<Device>> {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/bound?&page=${body.page}&page_size=${body.page_size}&domain=${domain}`
  const result = await request.get(url)
  return result.data
}

export const getUnreadDeviceHms = async function (workspace_id: string, device_sn: string): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms/${device_sn}`
  const result = await request.get(url)
  return result.data
}

export const getDeviceHms = async function (body: HmsQueryBody, workspace_id: string, pagination: IPage): Promise<IListWorkspaceResponse<any>> {
  let url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms?page=${pagination.page}&page_size=${pagination.page_size}` +
    `&level=${body.level ?? ''}&begin_time=${body.begin_time ?? ''}&end_time=${body.end_time ?? ''}&message=${body.message ?? ''}&language=${body.language}`
  body.sns.forEach((sn: string) => {
    if (sn !== '') {
      url = url.concat(`&device_sn=${sn}`)
    }
  })
  const result = await request.get(url)
  return result.data
}
