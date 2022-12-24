import { AlarmModeEnum, BatteryStoreModeEnum, DroneBatteryModeEnum } from '/@/types/airport-tsa'
// 机场指令集
export var DeviceCmd;
(function (DeviceCmd) {
  // 简单指令
  DeviceCmd.DebugModeOpen = 'debug_mode_open'
  DeviceCmd.DebugModeClose = 'debug_mode_close'
  DeviceCmd.SupplementLightOpen = 'supplement_light_open'
  DeviceCmd.SupplementLightClose = 'supplement_light_close'
  DeviceCmd.ReturnHome = 'return_home'
  // 复杂指令
  DeviceCmd.DeviceReboot = 'device_reboot'
  DeviceCmd.DroneOpen = 'drone_open'
  DeviceCmd.DroneClose = 'drone_close'
  // DeviceCheck = 'device_check', // 一键排障（一键起飞自检）
  DeviceCmd.DeviceFormat = 'device_format'
  DeviceCmd.DroneFormat = 'drone_format'
  DeviceCmd.CoverOpen = 'cover_open'
  DeviceCmd.CoverClose = 'cover_close'
  DeviceCmd.PutterOpen = 'putter_open'
  DeviceCmd.PutterClose = 'putter_close'
  DeviceCmd.ChargeOpen = 'charge_open'
  DeviceCmd.ChargeClose = 'charge_close'
  DeviceCmd.AlarmStateSwitch = 'alarm_state_switch'
  DeviceCmd.BatteryStoreModeSwitch = 'battery_store_mode_switch'
  DeviceCmd.DroneBatteryModeSwitch = 'battery_maintenance_switch'
})(DeviceCmd || (DeviceCmd = {}))
// 机场指令
export const cmdList = [
  {
    // iconName: ,
    label: '机场系统',
    status: '工作中',
    operateText: '重启',
    cmdKey: DeviceCmd.DeviceReboot,
    func: 'deviceReboot',
    loading: false,
    // btnAnimationIconName: '',
    // operateTips: '',
    // statusColor: '',
  },
  {
    label: '飞行器',
    status: '关机',
    operateText: '开机',
    cmdKey: DeviceCmd.DroneOpen,
    oppositeCmdKey: DeviceCmd.DroneClose,
    func: 'droneStatus',
    loading: false,
  },
  {
    label: '舱盖',
    status: '关',
    operateText: '开启',
    cmdKey: DeviceCmd.CoverOpen,
    oppositeCmdKey: DeviceCmd.CoverClose,
    func: 'coverStatus',
    loading: false,
  },
  {
    label: '推杆',
    status: '闭合',
    operateText: '展开',
    cmdKey: DeviceCmd.PutterOpen,
    oppositeCmdKey: DeviceCmd.PutterClose,
    func: 'putterStatus',
    loading: false,
  },
  {
    label: '充电状态',
    status: '未充电',
    operateText: '充电',
    cmdKey: DeviceCmd.ChargeOpen,
    oppositeCmdKey: DeviceCmd.ChargeClose,
    func: 'chargeStatus',
    loading: false,
  },
  {
    label: '一键返航',
    status: '--',
    operateText: '返航',
    cmdKey: DeviceCmd.ReturnHome,
    func: 'returnHome',
    loading: false,
  },
  {
    label: '机场存储',
    status: '--',
    operateText: '格式化',
    cmdKey: DeviceCmd.DeviceFormat,
    func: 'deviceFormat',
    loading: false,
  },
  {
    label: '飞行器存储',
    status: '--',
    operateText: '格式化',
    cmdKey: DeviceCmd.DroneFormat,
    func: 'droneFormat',
    loading: false,
  },
  {
    label: '补光灯',
    status: '关',
    operateText: '打开',
    cmdKey: DeviceCmd.SupplementLightOpen,
    oppositeCmdKey: DeviceCmd.SupplementLightClose,
    func: 'supplementLightStatus',
    loading: false,
  },
  {
    label: '机场声光报警',
    status: '关',
    operateText: '打开',
    cmdKey: DeviceCmd.AlarmStateSwitch,
    action: AlarmModeEnum.OPEN,
    func: 'alarmState',
    loading: false,
  },
  {
    label: '机场电池存储模式',
    status: '计划',
    operateText: '应急',
    cmdKey: DeviceCmd.BatteryStoreModeSwitch,
    action: BatteryStoreModeEnum.BATTERY_EMERGENCY_STORE,
    func: 'batteryStoreMode',
    loading: false,
  },
  {
    label: '飞机电池保养',
    status: '--',
    operateText: '保养',
    cmdKey: DeviceCmd.DroneBatteryModeSwitch,
    action: DroneBatteryModeEnum.OPEN,
    func: 'droneBatteryMode',
    loading: false,
    disabled: true,
  },
]
export var DeviceCmdStatusText;
(function (DeviceCmdStatusText) {
  DeviceCmdStatusText.DeviceRebootNormalText = '\u5DE5\u4F5C\u4E2D'
  DeviceCmdStatusText.DeviceRebootInProgressText = '\u91CD\u542F\u4E2D...'
  DeviceCmdStatusText.DeviceRebootFailedText = '\u91CD\u542F\u5931\u8D25'
  DeviceCmdStatusText.DroneStatusOpenNormalText = '\u5F00'
  DeviceCmdStatusText.DroneStatusOpenInProgressText = '\u5F00\u673A\u4E2D...'
  DeviceCmdStatusText.DroneStatusOpenFailedText = '\u5173'
  DeviceCmdStatusText.DroneStatusOpenBtnText = '\u5173\u673A'
  DeviceCmdStatusText.DroneStatusCloseNormalText = '\u5173'
  DeviceCmdStatusText.DroneStatusCloseInProgressText = '\u5173\u673A\u4E2D...'
  DeviceCmdStatusText.DroneStatusCloseFailedText = '\u5F00'
  DeviceCmdStatusText.DroneStatusCloseBtnText = '\u5F00\u673A'
  DeviceCmdStatusText.DeviceCoverOpenNormalText = '\u5F00'
  DeviceCmdStatusText.DeviceCoverOpenInProgressText = '\u5F00\u542F\u4E2D...'
  DeviceCmdStatusText.DeviceCoverOpenFailedText = '\u5173'
  DeviceCmdStatusText.DeviceCoverOpenBtnText = '\u5173\u95ED'
  DeviceCmdStatusText.DeviceCoverCloseNormalText = '\u5173'
  DeviceCmdStatusText.DeviceCoverCloseInProgressText = '\u5173\u95ED\u4E2D...'
  DeviceCmdStatusText.DeviceCoverCloseFailedText = '\u5F00'
  DeviceCmdStatusText.DeviceCoverCloseBtnText = '\u5F00\u542F'
  DeviceCmdStatusText.DevicePutterOpenNormalText = '\u5C55\u5F00'
  DeviceCmdStatusText.DevicePutterOpenBtnText = '\u95ED\u5408'
  DeviceCmdStatusText.DevicePutterOpenInProgressText = '\u63A8\u6746\u5C55\u5F00\u4E2D'
  DeviceCmdStatusText.DevicePutterOpenFailedText = '\u95ED\u5408'
  DeviceCmdStatusText.DevicePutterCloseNormalText = '\u95ED\u5408'
  DeviceCmdStatusText.DevicePutterCloseInProgressText = '\u63A8\u6746\u95ED\u5408\u4E2D'
  DeviceCmdStatusText.DevicePutterCloseFailedText = '\u5C55\u5F00'
  DeviceCmdStatusText.DevicePutterCloseBtnText = '\u5C55\u5F00'
  DeviceCmdStatusText.DeviceChargeOpenNormalText = '\u5145\u7535'
  DeviceCmdStatusText.DeviceChargeOpenInProgressText = '\u5145\u7535\u4E2D...'
  DeviceCmdStatusText.DeviceChargeOpenFailedText = '\u672A\u5145\u7535'
  DeviceCmdStatusText.DeviceChargeOpenBtnText = '\u65AD\u7535'
  DeviceCmdStatusText.DeviceChargeCloseNormalText = '\u65AD\u7535'
  DeviceCmdStatusText.DeviceChargeCloseInProgressText = '\u65AD\u7535\u4E2D...'
  DeviceCmdStatusText.DeviceChargeCloseFailedText = '\u5145\u7535'
  DeviceCmdStatusText.DeviceChargeCloseBtnText = '\u5145\u7535'
  DeviceCmdStatusText.DeviceFormatInProgressText = '\u683C\u5F0F\u5316...'
  DeviceCmdStatusText.DeviceFormatFailedText = '\u683C\u5F0F\u5316\u5931\u8D25'
  DeviceCmdStatusText.DroneFormatInProgressText = '\u683C\u5F0F\u5316...'
  DeviceCmdStatusText.DroneFormatFailedText = '\u683C\u5F0F\u5316\u5931\u8D25'
  DeviceCmdStatusText.DeviceSupplementLightOpenNormalText = '\u5F00'
  DeviceCmdStatusText.DeviceSupplementLightOpenInProgressText = '\u5F00\u542F\u4E2D...'
  DeviceCmdStatusText.DeviceSupplementLightOpenFailedText = '\u5173'
  DeviceCmdStatusText.DeviceSupplementLightOpenBtnText = '\u5173\u95ED'
  DeviceCmdStatusText.DeviceSupplementLightCloseNormalText = '\u5173'
  DeviceCmdStatusText.DeviceSupplementLightCloseText = '\u5173\u95ED\u4E2D...'
  DeviceCmdStatusText.DeviceSupplementLightCloseFailedText = '\u5F00'
  DeviceCmdStatusText.DeviceSupplementLightCloseBtnText = '\u6253\u5F00'
  DeviceCmdStatusText.AlarmStateOpenNormalText = '\u5F00'
  DeviceCmdStatusText.AlarmStateOpenText = '\u5F00\u542F\u4E2D...'
  DeviceCmdStatusText.AlarmStateOpenFailedText = '\u5173'
  DeviceCmdStatusText.AlarmStateOpenBtnText = '\u5173\u95ED'
  DeviceCmdStatusText.AlarmStateCloseNormalText = '\u5173'
  DeviceCmdStatusText.AlarmStateCloseText = '\u5173\u95ED\u4E2D...'
  DeviceCmdStatusText.AlarmStateCloseFailedText = '\u5F00'
  DeviceCmdStatusText.AlarmStateCloseBtnText = '\u6253\u5F00'
  DeviceCmdStatusText.BatteryStoreModePlanNormalText = '\u8BA1\u5212'
  DeviceCmdStatusText.BatteryStoreModePlanText = '\u5207\u6362\u4E2D...'
  DeviceCmdStatusText.BatteryStoreModePlanFailedText = '\u5E94\u6025'
  DeviceCmdStatusText.BatteryStoreModePlanBtnText = '\u5E94\u6025'
  DeviceCmdStatusText.BatteryStoreModeEmergencyNormalText = '\u5E94\u6025'
  DeviceCmdStatusText.BatteryStoreModeEmergencyText = '\u5207\u6362\u4E2D...'
  DeviceCmdStatusText.BatteryStoreModeEmergencyFailedText = '\u8BA1\u5212'
  DeviceCmdStatusText.BatteryStoreModeEmergencyBtnText = '\u8BA1\u5212'
  DeviceCmdStatusText.DroneBatteryModeMaintenanceInProgressText = '\u4FDD\u517B\u4E2D'
  DeviceCmdStatusText.DroneBatteryModeMaintenanceNotNeedText = '\u65E0\u9700\u4FDD\u517B'
  DeviceCmdStatusText.DroneBatteryModeMaintenanceNeedText = '\u9700\u4FDD\u517B'
  DeviceCmdStatusText.DroneBatteryModeOpenBtnText = '\u4FDD\u517B'
  DeviceCmdStatusText.DroneBatteryModeCloseBtnText = '\u5173\u95ED\u4FDD\u517B'
})(DeviceCmdStatusText || (DeviceCmdStatusText = {}))
// cmd ws 消息状态
export var DeviceCmdExecuteStatus;
(function (DeviceCmdExecuteStatus) {
  DeviceCmdExecuteStatus.Sent = 'sent'
  DeviceCmdExecuteStatus.InProgress = 'in_progress'
  DeviceCmdExecuteStatus.OK = 'ok'
  DeviceCmdExecuteStatus.Failed = 'failed'
  DeviceCmdExecuteStatus.Canceled = 'canceled'
  DeviceCmdExecuteStatus.Timeout = 'timeout' // 超时
})(DeviceCmdExecuteStatus || (DeviceCmdExecuteStatus = {}))
// # sourceMappingURL=device-cmd.js.map
