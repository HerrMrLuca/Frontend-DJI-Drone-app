import { ELocalStorageKey } from '../types/enums'
import request from '/@/api/http/request'
import { mapLayers } from '/@/constants/mock-layers'
const PREFIX = '/map/api/v1'
const workspace_id = localStorage.getItem(ELocalStorageKey.WorkspaceId)
// get elements group
// export const getLayers = async (reqParams: elementGroupsReq): UnknownResponse => {
//   const url = `${PREFIX}/workspaces/${workspace_id}/element_groups`
//   const result = await request.get(url, {
//     params: {
//       group_id: reqParams.groupId,
//       is_distributed: reqParams.isDistributed
//     },
//   })
//   return result.data
// }
export const getLayers = async (reqParams) => {
  return mapLayers
}
// Get elements groups request
export const getElementGroupsReq = async (body) => {
  const url = `${PREFIX}/workspaces/` + workspace_id + '/element-groups'
  const result = await request.get(url, body)
  return result.data
}
// add element
export const postElementsReq = async (pid, body) => {
  const url = `${PREFIX}/workspaces/` + workspace_id + `/element-groups/${pid}/elements`
  const result = await request.post(url, body)
  return result.data
}
// Update map element request
export const updateElementsReq = async (id, body) => {
  const url = `${PREFIX}/workspaces/` + workspace_id + `/elements/${id}`
  const result = await request.put(url, body)
  return result.data
}
// Delete map element
export const deleteElementReq = async (id, body) => {
  const url = `${PREFIX}/workspaces/` + workspace_id + `/elements/${id}`
  const result = await request.delete(url, body)
  return result.data
}
// Delete layer elements
export const deleteLayerEleReq = async (id, body) => {
  const url = `${PREFIX}/workspaces/` + workspace_id + `/element-groups/${id}/elements`
  const result = await request.delete(url, body)
  return result.data
}
// # sourceMappingURL=layer.js.map
