import request from '/@/api/http/request';
import { ELocalStorageKey } from '/@/types';
const MNG_API_PREFIX = '/manage/api/v1';
const workspaceId = localStorage.getItem(ELocalStorageKey.WorkspaceId) || '';
/**
 * 获取设备上传日志列表信息
 * @param params
 * @returns
 */
export async function getDeviceUploadLogList(params) {
    const resp = await request.get(`${MNG_API_PREFIX}/workspaces/${workspaceId}/devices/${params.device_sn}/logs-uploaded`, {
        params: params
    });
    return resp.data;
}
/**
 * 获取设备日志列表信息
 * @param params
 * @returns
 */
export async function getDeviceLogList(params) {
    const domain = params.domain ? params.domain : [];
    const resp = await request.get(`${MNG_API_PREFIX}/workspaces/${workspaceId}/devices/${params.device_sn}/logs`, {
        params: {
            domain_list: domain.join(',')
        }
    });
    return resp.data;
}
/**
 * 上传设备日志
 * @param body
 * @returns
 */
export async function postDeviceUpgrade(body) {
    const resp = await request.post(`${MNG_API_PREFIX}/workspaces/${workspaceId}/devices/${body.device_sn}/logs`, body);
    return resp.data;
}
// 取消上传
export async function cancelDeviceLogUpload(body) {
    const url = `${MNG_API_PREFIX}/workspaces/${workspaceId}/devices/${body.device_sn}/logs`;
    const result = await request.delete(url, {
        data: body
    });
    return result.data;
}
// 取消上传
export async function deleteDeviceLogUpload(body) {
    const url = `${MNG_API_PREFIX}/workspaces/${workspaceId}/devices/${body.device_sn}/logs/${body.logs_id}`;
    const result = await request.delete(url, {
        data: body
    });
    return result.data;
}
// export interface GetUploadDeviceLogRsp{
//   url: string
// }
/**
 * 获取设备上传日志url
 * @param params
 * @returns
 */
export async function getUploadDeviceLogUrl(params) {
    const resp = await request.get(`${MNG_API_PREFIX}/workspaces/${workspaceId}/logs/${params.logs_id}/url/${params.file_id}`);
    return resp.data;
}
//# sourceMappingURL=index.js.map