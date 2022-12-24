import request from '/@/api/http/request'
const CMD_API_PREFIX = '/control/api/v1'
/**
 * 发送机场控制指令
 * @param params
 * @returns
 */
// /control/api/v1/devices/{dock_sn}/jobs/{service_identifier}
export async function postSendCmd (params, body) {
  const postBody = body || {}
  const resp = await request.post(`${CMD_API_PREFIX}/devices/${params.dock_sn}/jobs/${params.device_cmd}`, {
    ...postBody
  })
  return resp.data
}
// # sourceMappingURL=index.js.map
