import { IWorkspaceResponse } from '/@/api/http/request'
import { mapLayers } from '/@/constants/mock-layers'

type UnknownResponse = Promise<IWorkspaceResponse<unknown>>
export const getLayers = async (): UnknownResponse => {
  return mapLayers
}
