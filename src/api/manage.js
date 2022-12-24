import request from '/@/api/http/request'
const HTTP_PREFIX = '/manage/api/v1'
export const login = async function (body) {
  const url = `${HTTP_PREFIX}/login`
  const result = await request.post(url, body)
  return result.data
}
// Refresh Token
export const refreshToken = async function (body) {
  const url = `${HTTP_PREFIX}/token/refresh`
  const result = await request.post(url, body)
  return result.data
}
// Get Platform Info
export const getPlatformInfo = async function () {
  const url = `${HTTP_PREFIX}/workspaces/current`
  const result = await request.get(url)
  return result.data
}
// Get User Info
export const getUserInfo = async function () {
  const url = `${HTTP_PREFIX}/users/current`
  const result = await request.get(url)
  return result.data
}
// Get Device Topo
export const getDeviceTopo = async function (workspace_id) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices`
  const result = await request.get(url)
  return result.data
}
// Get Livestream Capacity
export const getLiveCapacity = async function (body) {
  const url = `${HTTP_PREFIX}/live/capacity`
  const result = await request.get(url, body)
  return result.data
}
// Start Livestream
export const startLivestream = async function (body) {
  const url = `${HTTP_PREFIX}/live/streams/start`
  const result = await request.post(url, body)
  return result.data
}
// Stop Livestream
export const stopLivestream = async function (body) {
  const url = `${HTTP_PREFIX}/live/streams/stop`
  const result = await request.post(url, body)
  return result.data
}
// Update Quality
export const setLivestreamQuality = async function (body) {
  const url = `${HTTP_PREFIX}/live/streams/update`
  const result = await request.post(url, body)
  return result.data
}
export const getAllUsersInfo = async function (wid, body) {
  const url = `${HTTP_PREFIX}/users/${wid}/users?&page=${body.page}&page_size=${body.page_size}`
  const result = await request.get(url)
  return result.data
}
export const updateUserInfo = async function (wid, user_id, body) {
  const url = `${HTTP_PREFIX}/users/${wid}/users/${user_id}`
  const result = await request.put(url, body)
  return result.data
}
export const bindDevice = async function (body) {
  const url = `${HTTP_PREFIX}/devices/${body.device_sn}/binding`
  const result = await request.post(url, body)
  return result.data
}
export const unbindDevice = async function (device_sn) {
  const url = `${HTTP_PREFIX}/devices/${device_sn}/unbinding`
  const result = await request.delete(url)
  return result.data
}
export const getDeviceBySn = async function (workspace_id, device_sn) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/${device_sn}`
  const result = await request.get(url)
  return result.data
}
/**
 * 获取绑定设备信息
 * @param workspace_id
 * @param body
 * @param domain
 * @returns
 */
export const getBindingDevices = async function (workspace_id, body, domain) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/bound?&page=${body.page}&page_size=${body.page_size}&domain=${domain}`
  const result = await request.get(url)
  return result.data
}
export const updateDevice = async function (body, workspace_id, device_sn) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/${device_sn}`
  const result = await request.put(url, body)
  return result.data
}
export const getUnreadDeviceHms = async function (workspace_id, device_sn) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms/${device_sn}`
  const result = await request.get(url)
  return result.data
}
export const updateDeviceHms = async function (workspace_id, device_sn) {
  const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms/${device_sn}`
  const result = await request.put(url)
  return result.data
}
export const getDeviceHms = async function (body, workspace_id, pagination) {
  let url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms?page=${pagination.page}&page_size=${pagination.page_size}` +
        `&level=${body.level ?? ''}&begin_time=${body.begin_time ?? ''}&end_time=${body.end_time ?? ''}&message=${body.message ?? ''}&language=${body.language}`
  body.sns.forEach((sn) => {
    if (sn !== '') {
      url = url.concat(`&device_sn=${sn}`)
    }
  })
  const result = await request.get(url)
  return result.data
}
export const changeLivestreamLens = async function (body) {
  const url = `${HTTP_PREFIX}/live/streams/switch`
  const result = await request.post(url, body)
  return result.data
}
// # sourceMappingURL=manage.js.map
