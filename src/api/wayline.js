import { message } from 'ant-design-vue/lib/components'
import request from '/@/api/http/request'
const HTTP_PREFIX = '/wayline/api/v1'
// Get Wayline Files
export const getWaylineFiles = async function (wid, body) {
  const url = `${HTTP_PREFIX}/workspaces/${wid}/waylines?order_by=${body.order_by}&page=${body.page}&page_size=${body.page_size}`
  const result = await request.get(url)
  return result.data
}
// Download Wayline File
export const downloadWaylineFile = async function (workspaceId, waylineId) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/waylines/${waylineId}/url`
  const result = await request.get(url, { responseType: 'blob' })
  if (result.data.type === 'application/json') {
    const reader = new FileReader()
    reader.onload = function (e) {
      const text = reader.result
      const result = JSON.parse(text)
      message.error(result.message)
    }
    reader.readAsText(result.data, 'utf-8')
  } else {
    return result.data
  }
}
// Delete Wayline File
export const deleteWaylineFile = async function (workspaceId, waylineId) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/waylines/${waylineId}`
  const result = await request.delete(url)
  return result.data
}
// Create Wayline Job
export const createPlan = async function (workspaceId, plan) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/flight-tasks`
  const result = await request.post(url, plan)
  return result.data
}
// Get Wayline Jobs
export const getWaylineJobs = async function (workspaceId, page) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/jobs?page=${page.page}&page_size=${page.page_size}`
  const result = await request.get(url)
  return result.data
}
// 取消机场任务
export async function deleteTask (workspaceId, params) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/jobs`
  const result = await request.delete(url, {
    params: params
  })
  return result.data
}
// Upload Wayline file
export const importKmzFile = async function (workspaceId, file) {
  const url = `${HTTP_PREFIX}/workspaces/${workspaceId}/waylines/file/upload`
  const result = await request.post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return result.data
}
// # sourceMappingURL=wayline.js.map
