// 舱盖状态
export var CoverStateEnum;
(function (CoverStateEnum) {
  CoverStateEnum[CoverStateEnum.Close = 0] = 'Close'
  CoverStateEnum[CoverStateEnum.Open = 1] = 'Open'
  CoverStateEnum[CoverStateEnum.HalfOpen = 2] = 'HalfOpen'
  CoverStateEnum[CoverStateEnum.Failed = 3] = 'Failed' // 失败
})(CoverStateEnum || (CoverStateEnum = {}))
// 推杆状态
export var PutterStateEnum;
(function (PutterStateEnum) {
  PutterStateEnum[PutterStateEnum.Close = 0] = 'Close'
  PutterStateEnum[PutterStateEnum.Open = 1] = 'Open'
  PutterStateEnum[PutterStateEnum.HalfOpen = 2] = 'HalfOpen'
  PutterStateEnum[PutterStateEnum.Failed = 3] = 'Failed' // 失败
})(PutterStateEnum || (PutterStateEnum = {}))
// 充电状态
export var ChargeStateEnum;
(function (ChargeStateEnum) {
  ChargeStateEnum[ChargeStateEnum.NotCharge = 0] = 'NotCharge'
  ChargeStateEnum[ChargeStateEnum.Charge = 1] = 'Charge'
})(ChargeStateEnum || (ChargeStateEnum = {}))
// 补光灯状态
export var SupplementLightStateEnum;
(function (SupplementLightStateEnum) {
  SupplementLightStateEnum[SupplementLightStateEnum.Close = 0] = 'Close'
  SupplementLightStateEnum[SupplementLightStateEnum.Open = 1] = 'Open'
})(SupplementLightStateEnum || (SupplementLightStateEnum = {}))
// 机场声光报警状态
export var AlarmModeEnum;
(function (AlarmModeEnum) {
  AlarmModeEnum[AlarmModeEnum.CLOSE = 0] = 'CLOSE'
  AlarmModeEnum[AlarmModeEnum.OPEN = 1] = 'OPEN'
})(AlarmModeEnum || (AlarmModeEnum = {}))
// 电池保养
export var BatteryStoreModeEnum;
(function (BatteryStoreModeEnum) {
  BatteryStoreModeEnum[BatteryStoreModeEnum.BATTERY_PLAN_STORE = 1] = 'BATTERY_PLAN_STORE'
  BatteryStoreModeEnum[BatteryStoreModeEnum.BATTERY_EMERGENCY_STORE = 2] = 'BATTERY_EMERGENCY_STORE'
})(BatteryStoreModeEnum || (BatteryStoreModeEnum = {}))
// 飞行器电池保养
export var DroneBatteryStateEnum;
(function (DroneBatteryStateEnum) {
  DroneBatteryStateEnum[DroneBatteryStateEnum.NoMaintenanceRequired = 0] = 'NoMaintenanceRequired'
  DroneBatteryStateEnum[DroneBatteryStateEnum.MaintenanceRequired = 1] = 'MaintenanceRequired'
  DroneBatteryStateEnum[DroneBatteryStateEnum.MaintenanceInProgress = 2] = 'MaintenanceInProgress'
})(DroneBatteryStateEnum || (DroneBatteryStateEnum = {}))
export var DroneBatteryModeEnum;
(function (DroneBatteryModeEnum) {
  DroneBatteryModeEnum[DroneBatteryModeEnum.CLOSE = 0] = 'CLOSE'
  DroneBatteryModeEnum[DroneBatteryModeEnum.OPEN = 1] = 'OPEN'
})(DroneBatteryModeEnum || (DroneBatteryModeEnum = {}))
// # sourceMappingURL=airport-tsa.js.map
