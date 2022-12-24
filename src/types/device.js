import { commonColor } from '/@/utils/color'
// domain
export var DOMAIN;
(function (DOMAIN) {
  DOMAIN.DRONE = '0'
  DOMAIN.PAYLOAD = '1'
  DOMAIN.RC = '2'
  DOMAIN.DOCK = '3'
})(DOMAIN || (DOMAIN = {}))
// DJI飞机类型
export var DRONE_TYPE;
(function (DRONE_TYPE) {
  DRONE_TYPE[DRONE_TYPE.M30 = 67] = 'M30'
  DRONE_TYPE[DRONE_TYPE.M300 = 60] = 'M300'
  DRONE_TYPE[DRONE_TYPE.Phantom4 = 11] = 'Phantom4'
  DRONE_TYPE[DRONE_TYPE.Phantom4Pro = 18] = 'Phantom4Pro'
  DRONE_TYPE[DRONE_TYPE.Phantom4RTK = 59] = 'Phantom4RTK'
  DRONE_TYPE[DRONE_TYPE.Phantom4Advanced = 27] = 'Phantom4Advanced'
  DRONE_TYPE[DRONE_TYPE.Mavic3EnterpriseAdvanced = 77] = 'Mavic3EnterpriseAdvanced'
})(DRONE_TYPE || (DRONE_TYPE = {}))
// DJI负载类型枚举值
export var PAYLOAD_TYPE;
(function (PAYLOAD_TYPE) {
  PAYLOAD_TYPE[PAYLOAD_TYPE.FPV = 39] = 'FPV'
  PAYLOAD_TYPE[PAYLOAD_TYPE.H20 = 42] = 'H20'
  PAYLOAD_TYPE[PAYLOAD_TYPE.H20T = 43] = 'H20T'
  PAYLOAD_TYPE[PAYLOAD_TYPE.H20N = 61] = 'H20N'
  PAYLOAD_TYPE[PAYLOAD_TYPE.EP600 = 50] = 'EP600'
  PAYLOAD_TYPE[PAYLOAD_TYPE.EP800 = 90742] = 'EP800'
  PAYLOAD_TYPE[PAYLOAD_TYPE.M30D = 52] = 'M30D'
  PAYLOAD_TYPE[PAYLOAD_TYPE.M30T = 53] = 'M30T'
  PAYLOAD_TYPE[PAYLOAD_TYPE.XT2 = 26] = 'XT2'
  PAYLOAD_TYPE[PAYLOAD_TYPE.XTS = 41] = 'XTS'
  PAYLOAD_TYPE[PAYLOAD_TYPE.Z30 = 20] = 'Z30'
  PAYLOAD_TYPE[PAYLOAD_TYPE.DockTopCamera = 165] = 'DockTopCamera'
  PAYLOAD_TYPE[PAYLOAD_TYPE.M3E = 66] = 'M3E'
  PAYLOAD_TYPE[PAYLOAD_TYPE.M3T = 67] = 'M3T'
  // UNKNOWN = 65535
})(PAYLOAD_TYPE || (PAYLOAD_TYPE = {}))
// RC type
export var RC_TYPE;
(function (RC_TYPE) {
  RC_TYPE[RC_TYPE.RC = 56] = 'RC'
  RC_TYPE[RC_TYPE.RCPlus = 119] = 'RCPlus'
  RC_TYPE[RC_TYPE.RC144 = 144] = 'RC144'
})(RC_TYPE || (RC_TYPE = {}))
// DOCK type
export var DOCK_TYPE;
(function (DOCK_TYPE) {
  DOCK_TYPE[DOCK_TYPE.Dock = 1] = 'Dock'
})(DOCK_TYPE || (DOCK_TYPE = {}))
// 设备sub_type 从0升序
export var DEVICE_SUB_TYPE;
(function (DEVICE_SUB_TYPE) {
  DEVICE_SUB_TYPE[DEVICE_SUB_TYPE.ZERO = 0] = 'ZERO'
  DEVICE_SUB_TYPE[DEVICE_SUB_TYPE.ONE = 1] = 'ONE'
  DEVICE_SUB_TYPE[DEVICE_SUB_TYPE.TWO = 2] = 'TWO'
  DEVICE_SUB_TYPE[DEVICE_SUB_TYPE.THREE = 3] = 'THREE'
  DEVICE_SUB_TYPE[DEVICE_SUB_TYPE.UNKNOWN = 65535] = 'UNKNOWN'
})(DEVICE_SUB_TYPE || (DEVICE_SUB_TYPE = {}))
export const DEVICE_MODEL_KEY = {
  M30: `${DOMAIN.DRONE}-${DRONE_TYPE.M30}-${DEVICE_SUB_TYPE.ZERO}`,
  M30T: `${DOMAIN.DRONE}-${DRONE_TYPE.M30}-${DEVICE_SUB_TYPE.ONE}`,
  M3E: `${DOMAIN.DRONE}-${DRONE_TYPE.Mavic3EnterpriseAdvanced}-${DEVICE_SUB_TYPE.ZERO}`,
  M3T: `${DOMAIN.DRONE}-${DRONE_TYPE.Mavic3EnterpriseAdvanced}-${DEVICE_SUB_TYPE.ONE}`,
  M300: `${DOMAIN.DRONE}-${DRONE_TYPE.M300}-${DEVICE_SUB_TYPE.ZERO}`,
  Phantom4: `${DOMAIN.DRONE}-${DRONE_TYPE.Phantom4}-${DEVICE_SUB_TYPE.ZERO}`,
  Phantom4Pro: `${DOMAIN.DRONE}-${DRONE_TYPE.Phantom4Pro}-${DEVICE_SUB_TYPE.ZERO}`,
  Phantom4RTK: `${DOMAIN.DRONE}-${DRONE_TYPE.Phantom4RTK}-${DEVICE_SUB_TYPE.ZERO}`,
  Phantom4Advanced: `${DOMAIN.DRONE}-${DRONE_TYPE.Phantom4Advanced}-${DEVICE_SUB_TYPE.ZERO}`,
  FPV: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.FPV}-${DEVICE_SUB_TYPE.ZERO}`,
  H20: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.H20}-${DEVICE_SUB_TYPE.ZERO}`,
  H20T: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.H20T}-${DEVICE_SUB_TYPE.ZERO}`,
  H20N: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.H20N}-${DEVICE_SUB_TYPE.ZERO}`,
  EP600: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.EP600}-${DEVICE_SUB_TYPE.UNKNOWN}`,
  EP800: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.EP800}-${DEVICE_SUB_TYPE.ZERO}`,
  M30Camera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.M30D}-${DEVICE_SUB_TYPE.ZERO}`,
  M30TCamera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.M30T}-${DEVICE_SUB_TYPE.ZERO}`,
  M3ECamera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.M3E}-${DEVICE_SUB_TYPE.ZERO}`,
  M3TCamera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.M3T}-${DEVICE_SUB_TYPE.ZERO}`,
  // M3MCamera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.M3M}-${DEVICE_SUB_TYPE.ZERO}`,
  XT2: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.XT2}-${DEVICE_SUB_TYPE.ZERO}`,
  XTS: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.XTS}-${DEVICE_SUB_TYPE.ZERO}`,
  Z30: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.Z30}-${DEVICE_SUB_TYPE.ZERO}`,
  DockTopCamera: `${DOMAIN.PAYLOAD}-${PAYLOAD_TYPE.DockTopCamera}-${DEVICE_SUB_TYPE.ZERO}`,
  RC: `${DOMAIN.RC}-${RC_TYPE.RC}-${DEVICE_SUB_TYPE.ZERO}`,
  RCPlus: `${DOMAIN.RC}-${RC_TYPE.RCPlus}-${DEVICE_SUB_TYPE.ZERO}`,
  Dock: `${DOMAIN.DOCK}-${DOCK_TYPE.Dock}-${DEVICE_SUB_TYPE.ZERO}`,
}
export const DEVICE_NAME = {
  // drone
  [DEVICE_MODEL_KEY.M30]: 'M30',
  [DEVICE_MODEL_KEY.M30T]: 'M30T',
  [DEVICE_MODEL_KEY.M3E]: 'Mavic 3E',
  [DEVICE_MODEL_KEY.M3T]: 'Mavic 3T',
  // [DEVICE_MODEL_KEY.M3M]: 'Mavic 3M',
  [DEVICE_MODEL_KEY.M300]: 'M300 RTK',
  [DEVICE_MODEL_KEY.Phantom4]: 'Phantom 4',
  [DEVICE_MODEL_KEY.Phantom4Pro]: 'Phantom 4 Pro',
  [DEVICE_MODEL_KEY.Phantom4RTK]: 'Phantom 4 RTK',
  [DEVICE_MODEL_KEY.Phantom4Advanced]: 'Phantom 4 Advanced',
  // payload
  [DEVICE_MODEL_KEY.FPV]: 'FPV',
  [DEVICE_MODEL_KEY.H20]: 'H20',
  [DEVICE_MODEL_KEY.H20T]: 'H20T',
  [DEVICE_MODEL_KEY.H20N]: 'H20N',
  [DEVICE_MODEL_KEY.EP600]: 'P1',
  [DEVICE_MODEL_KEY.EP800]: 'L1',
  [DEVICE_MODEL_KEY.M30Camera]: 'M30 Camera',
  [DEVICE_MODEL_KEY.M30TCamera]: 'M30T Camera',
  [DEVICE_MODEL_KEY.M3ECamera]: 'Mavic 3E',
  [DEVICE_MODEL_KEY.M3TCamera]: 'Mavic 3T',
  // [DEVICE_MODEL_KEY.M3MCamera]: 'Mavic 3M',
  [DEVICE_MODEL_KEY.XT2]: 'XT2',
  [DEVICE_MODEL_KEY.XTS]: 'XTS',
  [DEVICE_MODEL_KEY.Z30]: 'Z30',
  [DEVICE_MODEL_KEY.DockTopCamera]: 'Dock Camera',
  // rc
  [DEVICE_MODEL_KEY.RC]: 'RC',
  [DEVICE_MODEL_KEY.RCPlus]: 'RC Plus',
  // dock
  [DEVICE_MODEL_KEY.Dock]: 'Dock',
}
// 固件升级类型
export var DeviceFirmwareTypeEnum;
(function (DeviceFirmwareTypeEnum) {
  DeviceFirmwareTypeEnum[DeviceFirmwareTypeEnum.ToUpgraded = 3] = 'ToUpgraded'
  DeviceFirmwareTypeEnum[DeviceFirmwareTypeEnum.ConsistencyUpgrade = 2] = 'ConsistencyUpgrade'
})(DeviceFirmwareTypeEnum || (DeviceFirmwareTypeEnum = {}))
// 固件升级状态
export var DeviceFirmwareStatusEnum;
(function (DeviceFirmwareStatusEnum) {
  DeviceFirmwareStatusEnum[DeviceFirmwareStatusEnum.None = 1] = 'None'
  DeviceFirmwareStatusEnum[DeviceFirmwareStatusEnum.ToUpgraded = 2] = 'ToUpgraded'
  DeviceFirmwareStatusEnum[DeviceFirmwareStatusEnum.ConsistencyUpgrade = 3] = 'ConsistencyUpgrade'
  DeviceFirmwareStatusEnum[DeviceFirmwareStatusEnum.DuringUpgrade = 4] = 'DuringUpgrade'
})(DeviceFirmwareStatusEnum || (DeviceFirmwareStatusEnum = {}))
export const DeviceFirmwareStatus = {
  [DeviceFirmwareStatusEnum.None]: '',
  [DeviceFirmwareStatusEnum.ToUpgraded]: '待升级',
  [DeviceFirmwareStatusEnum.ConsistencyUpgrade]: '一致性升级',
  [DeviceFirmwareStatusEnum.DuringUpgrade]: '升级中',
}
export const DeviceFirmwareStatusColor = {
  [DeviceFirmwareStatusEnum.None]: commonColor.WHITE,
  [DeviceFirmwareStatusEnum.ToUpgraded]: commonColor.BLUE,
  [DeviceFirmwareStatusEnum.ConsistencyUpgrade]: commonColor.WARN,
  [DeviceFirmwareStatusEnum.DuringUpgrade]: commonColor.NORMAL,
}
export var EModeCode;
(function (EModeCode) {
  EModeCode[EModeCode.Standby = 0] = 'Standby'
  EModeCode[EModeCode.Preparing = 1] = 'Preparing'
  EModeCode[EModeCode.Ready = 2] = 'Ready'
  EModeCode[EModeCode.Manual = 3] = 'Manual'
  EModeCode[EModeCode.Automatic = 4] = 'Automatic'
  EModeCode[EModeCode.Waypoint = 5] = 'Waypoint'
  EModeCode[EModeCode.Panoramic = 6] = 'Panoramic'
  EModeCode[EModeCode.Active_Track = 7] = 'Active_Track'
  EModeCode[EModeCode.ADS_B = 8] = 'ADS_B'
  EModeCode[EModeCode.Return_To_Home = 9] = 'Return_To_Home'
  EModeCode[EModeCode.Landing = 10] = 'Landing'
  EModeCode[EModeCode.Forced_Landing = 11] = 'Forced_Landing'
  EModeCode[EModeCode.Three_Blades_Landing = 12] = 'Three_Blades_Landing'
  EModeCode[EModeCode.Upgrading = 13] = 'Upgrading'
  EModeCode[EModeCode.Disconnected = 14] = 'Disconnected'
})(EModeCode || (EModeCode = {}))
export var EGear;
(function (EGear) {
  EGear[EGear.A = 0] = 'A'
  EGear[EGear.P = 1] = 'P'
  EGear[EGear.NAV = 2] = 'NAV'
  EGear[EGear.FPV = 3] = 'FPV'
  EGear[EGear.FARM = 4] = 'FARM'
  EGear[EGear.S = 5] = 'S'
  EGear[EGear.F = 6] = 'F'
  EGear[EGear.M = 7] = 'M'
  EGear[EGear.G = 8] = 'G'
  EGear[EGear.T = 9] = 'T'
})(EGear || (EGear = {}))
export var EDeviceType;
(function (EDeviceType) {
  EDeviceType[EDeviceType.M30 = '0-67-0'] = 'M30'
  EDeviceType[EDeviceType.M30T = '0-67-1'] = 'M30T'
  EDeviceType[EDeviceType.M300 = '0-60-0'] = 'M300'
  EDeviceType[EDeviceType.Z30 = '1-20-0'] = 'Z30'
  EDeviceType[EDeviceType.XT2 = '1-26-0'] = 'XT2'
  EDeviceType[EDeviceType.FPV = '1-39-0'] = 'FPV'
  EDeviceType[EDeviceType.XTS = '1-41-0'] = 'XTS'
  EDeviceType[EDeviceType.H20 = '1-42-0'] = 'H20'
  EDeviceType[EDeviceType.H20T = '1-43-0'] = 'H20T'
  EDeviceType[EDeviceType.P1 = '1-50-65535'] = 'P1'
  EDeviceType[EDeviceType.M30_Camera = '1-52-0'] = 'M30_Camera'
  EDeviceType[EDeviceType.M30T_Camera = '1-53-0'] = 'M30T_Camera'
  EDeviceType[EDeviceType.H20N = '1-61-0'] = 'H20N'
  EDeviceType[EDeviceType.DJI_Dock_Camera = '1-165-0'] = 'DJI_Dock_Camera'
  EDeviceType[EDeviceType.L1 = '1-90742-0'] = 'L1'
  EDeviceType[EDeviceType.M3E = '0-77-0'] = 'M3E'
  EDeviceType[EDeviceType.M3D = '0-77-1'] = 'M3D'
  EDeviceType[EDeviceType.M3E_Camera = '1-66-0'] = 'M3E_Camera'
  EDeviceType[EDeviceType.M3T_Camera = '1-67-0'] = 'M3T_Camera'
})(EDeviceType || (EDeviceType = {}))
export var EDockModeCode;
(function (EDockModeCode) {
  EDockModeCode[EDockModeCode.Disconnected = -1] = 'Disconnected'
  EDockModeCode[EDockModeCode.Idle = 0] = 'Idle'
  EDockModeCode[EDockModeCode.Debugging = 1] = 'Debugging'
  EDockModeCode[EDockModeCode.Remote_Debugging = 2] = 'Remote_Debugging'
  EDockModeCode[EDockModeCode.Upgrading = 3] = 'Upgrading'
  EDockModeCode[EDockModeCode.Working = 4] = 'Working'
})(EDockModeCode || (EDockModeCode = {}))
// # sourceMappingURL=device.js.map
