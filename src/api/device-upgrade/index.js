import request from '/@/api/http/request';
const MNG_API_PREFIX = '/manage/api/v1';
/**
 * 获取设备升级信息
 * @param params
 * @returns
 */
export async function getDeviceUpgradeInfo(params) {
    const resp = await request.get(`${MNG_API_PREFIX}/workspaces/firmware-release-notes/latest`, {
        params: params
    });
    return resp.data;
}
/**
 * 设备升级
 * @param workspace_id
 * @param body
 * @returns
 */
export async function postDeviceUpgrade(workspace_id, body) {
    const resp = await request.post(`${MNG_API_PREFIX}/devices/${workspace_id}/devices/ota`, body);
    return resp.data;
}
//# sourceMappingURL=index.js.map