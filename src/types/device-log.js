import { commonColor } from '/@/utils/color';
// 日志上传状态
export var DeviceLogUploadStatusEnum;
(function (DeviceLogUploadStatusEnum) {
    DeviceLogUploadStatusEnum[DeviceLogUploadStatusEnum["Uploading"] = 1] = "Uploading";
    DeviceLogUploadStatusEnum[DeviceLogUploadStatusEnum["Done"] = 2] = "Done";
    DeviceLogUploadStatusEnum[DeviceLogUploadStatusEnum["Canceled"] = 3] = "Canceled";
    DeviceLogUploadStatusEnum[DeviceLogUploadStatusEnum["Failed"] = 4] = "Failed";
})(DeviceLogUploadStatusEnum || (DeviceLogUploadStatusEnum = {}));
export const DeviceLogUploadStatusMap = {
    [DeviceLogUploadStatusEnum.Uploading]: '上传中',
    [DeviceLogUploadStatusEnum.Done]: '上传成功',
    [DeviceLogUploadStatusEnum.Canceled]: '取消上传',
    [DeviceLogUploadStatusEnum.Failed]: '上传失败',
};
export const DeviceLogUploadStatusColor = {
    [DeviceLogUploadStatusEnum.Uploading]: commonColor.BLUE,
    [DeviceLogUploadStatusEnum.Done]: commonColor.NORMAL,
    [DeviceLogUploadStatusEnum.Canceled]: commonColor.WARN,
    [DeviceLogUploadStatusEnum.Failed]: commonColor.FAIL,
};
// 设备日志上传 ws 消息状态
export var DeviceLogUploadStatus;
(function (DeviceLogUploadStatus) {
    DeviceLogUploadStatus["FilePull"] = "file_pull";
    DeviceLogUploadStatus["FileZip"] = "file_zip";
    DeviceLogUploadStatus["FileUploading"] = "file_uploading";
    DeviceLogUploadStatus["Canceled"] = "canceled";
    DeviceLogUploadStatus["Timeout"] = "timeout";
    DeviceLogUploadStatus["Failed"] = "failed";
    DeviceLogUploadStatus["OK"] = "ok";
    // Paused = 'paused' // 暂停
})(DeviceLogUploadStatus || (DeviceLogUploadStatus = {}));
// ws status => log status
export const DeviceLogUploadWsStatusMap = {
    [DeviceLogUploadStatus.FilePull]: DeviceLogUploadStatusEnum.Uploading,
    [DeviceLogUploadStatus.FileZip]: DeviceLogUploadStatusEnum.Uploading,
    [DeviceLogUploadStatus.FileUploading]: DeviceLogUploadStatusEnum.Uploading,
    [DeviceLogUploadStatus.OK]: DeviceLogUploadStatusEnum.Done,
    [DeviceLogUploadStatus.Failed]: DeviceLogUploadStatusEnum.Failed,
    [DeviceLogUploadStatus.Canceled]: DeviceLogUploadStatusEnum.Canceled,
    [DeviceLogUploadStatus.Timeout]: DeviceLogUploadStatusEnum.Failed,
};
//# sourceMappingURL=device-log.js.map