import request from '/@/api/http/request'
import { ELocalStorageKey } from '/@/types'
const MNG_API_PREFIX = '/manage/api/v1'
const workspaceId = localStorage.getItem(ELocalStorageKey.WorkspaceId) || ''
/**
 * 设置设备属性
 * @param params
 * @returns
 */
//  /manage/api/v1/devices/{{workspace_id}}/devices/{{device_sn}}/property
export async function putDeviceProps (deviceSn, body) {
  const resp = await request.put(`${MNG_API_PREFIX}/devices/${workspaceId}/devices/${deviceSn}/property`, body)
  return resp.data
}
// # sourceMappingURL=index.js.map
