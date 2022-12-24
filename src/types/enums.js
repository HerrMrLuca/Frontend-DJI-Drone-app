export var ERouterName;
(function (ERouterName) {
  ERouterName.ELEMENT = 'element'
  ERouterName.PROJECT = 'project'
  ERouterName.HOME = 'home'
  ERouterName.BAMBI = 'bambi'
  ERouterName.TSA = 'tsa'
  ERouterName.BAMBIWORKSPACE = 'bambi-workspace'
  ERouterName.MAP = 'map'
  ERouterName.LAYER = 'layer'
  ERouterName.MEDIA = 'media'
  ERouterName.WAYLINE = 'wayline'
  ERouterName.LIVESTREAM = 'livestream'
  ERouterName.LIVING = 'living'
  ERouterName.WORKSPACE = 'workspace'
  ERouterName.MEMBERS = 'members'
  ERouterName.DEVICES = 'devices'
  ERouterName.TASK = 'task'
  ERouterName.CREATE_PLAN = 'create-plan'
  ERouterName.SELECT_PLAN = 'select-plan'
  ERouterName.PILOT = 'pilot-login'
  ERouterName.PILOT_HOME = 'pilot-home'
  ERouterName.PILOT_MEDIA = 'pilot-media'
  ERouterName.PILOT_LIVESHARE = 'pilot-liveshare'
  ERouterName.PILOT_BIND = 'pilot-bind'
})(ERouterName || (ERouterName = {}))
export var EStorageKey;
(function (EStorageKey) {
  EStorageKey.LANG_CODE = 'DJI_CREATE_VITE_H5_APP:lang_code'
  EStorageKey.TEST_TOOLS_POSITION_STORAGE_KEY = 'DJI_CREATE_VITE_H5_APP:test_tools_position'
  EStorageKey.SESSION_ID = 'DJI_CREATE_VITE_H5_APP:sess'
})(EStorageKey || (EStorageKey = {}))
export var EStatusValue;
(function (EStatusValue) {
  EStatusValue.CONNECTED = 'Connected'
  EStatusValue.DISCONNECT = 'Disconnect'
  EStatusValue.LIVING = 'Living'
})(EStatusValue || (EStatusValue = {}))
export var ELiveStatusValue;
(function (ELiveStatusValue) {
  ELiveStatusValue[ELiveStatusValue.DISCONNECT = 0] = 'DISCONNECT'
  ELiveStatusValue[ELiveStatusValue.CONNECTED = 1] = 'CONNECTED'
  ELiveStatusValue[ELiveStatusValue.LIVING = 2] = 'LIVING'
})(ELiveStatusValue || (ELiveStatusValue = {}))
export var EComponentName;
(function (EComponentName) {
  EComponentName.Thing = 'thing'
  EComponentName.Liveshare = 'liveshare'
  EComponentName.Api = 'api'
  EComponentName.Ws = 'ws'
  EComponentName.Map = 'map'
  EComponentName.Tsa = 'tsa'
  EComponentName.Media = 'media'
  EComponentName.Mission = 'mission'
})(EComponentName || (EComponentName = {}))
export var ELocalStorageKey;
(function (ELocalStorageKey) {
  ELocalStorageKey.Username = 'username'
  ELocalStorageKey.WorkspaceId = 'workspace_id'
  ELocalStorageKey.Token = 'x-auth-token'
  ELocalStorageKey.PlatformName = 'platform_name'
  ELocalStorageKey.WorkspaceName = 'workspace_name'
  ELocalStorageKey.WorkspaceDesc = 'workspace_desc'
  ELocalStorageKey.Flag = 'flag'
  ELocalStorageKey.UserId = 'user_id'
  ELocalStorageKey.Device = 'device'
  ELocalStorageKey.GatewayOnline = 'gateway_online'
})(ELocalStorageKey || (ELocalStorageKey = {}))
export var EPhotoType;
(function (EPhotoType) {
  EPhotoType[EPhotoType.Original = 0] = 'Original'
  EPhotoType[EPhotoType.Preview = 1] = 'Preview'
  EPhotoType[EPhotoType.Unknown = -1] = 'Unknown'
})(EPhotoType || (EPhotoType = {}))
export var EDownloadOwner;
(function (EDownloadOwner) {
  EDownloadOwner[EDownloadOwner.Mine = 0] = 'Mine'
  EDownloadOwner[EDownloadOwner.Others = 1] = 'Others'
  EDownloadOwner[EDownloadOwner.Unknown = -1] = 'Unknown'
})(EDownloadOwner || (EDownloadOwner = {}))
export var EUserType;
(function (EUserType) {
  EUserType[EUserType.Web = 1] = 'Web'
  EUserType[EUserType.Pilot = 2] = 'Pilot'
})(EUserType || (EUserType = {}))
export var EBizCode;
(function (EBizCode) {
  EBizCode.GatewayOsd = 'gateway_osd'
  EBizCode.DeviceOsd = 'device_osd'
  EBizCode.DockOsd = 'dock_osd'
  EBizCode.MapElementCreate = 'map_element_create'
  EBizCode.MapElementUpdate = 'map_element_update'
  EBizCode.MapElementDelete = 'map_element_delete'
  EBizCode.DeviceOnline = 'device_online'
  EBizCode.DeviceOffline = 'device_offline'
  EBizCode.FlightTaskProgress = 'flighttask_progress'
  EBizCode.DeviceHms = 'device_hms'
  // 设备指令
  EBizCode.DeviceReboot = 'device_reboot'
  EBizCode.DroneOpen = 'drone_open'
  EBizCode.DroneClose = 'drone_close'
  EBizCode.DeviceFormat = 'device_format'
  EBizCode.DroneFormat = 'drone_format'
  EBizCode.CoverOpen = 'cover_open'
  EBizCode.CoverClose = 'cover_close'
  EBizCode.PutterOpen = 'putter_open'
  EBizCode.PutterClose = 'putter_close'
  EBizCode.ChargeOpen = 'charge_open'
  EBizCode.ChargeClose = 'charge_close'
  // 设备升级
  EBizCode.DeviceUpgrade = 'ota_progress'
  // 设备日志
  EBizCode.DeviceLogUploadProgress = 'fileupload_progress' // 设备日志上传上传
})(EBizCode || (EBizCode = {}))
export var EDeviceTypeName;
(function (EDeviceTypeName) {
  EDeviceTypeName.Aircraft = 'sub-device'
  EDeviceTypeName.Gateway = 'gateway'
  EDeviceTypeName.Dock = 'dock'
})(EDeviceTypeName || (EDeviceTypeName = {}))
export var EHmsLevel;
(function (EHmsLevel) {
  EHmsLevel[EHmsLevel.NOTICE = 0] = 'NOTICE'
  EHmsLevel[EHmsLevel.CAUTION = 1] = 'CAUTION'
  EHmsLevel[EHmsLevel.WARN = 2] = 'WARN'
})(EHmsLevel || (EHmsLevel = {}))
// # sourceMappingURL=enums.js.map
