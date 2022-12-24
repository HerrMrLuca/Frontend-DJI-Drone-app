// 夜航灯开关
export var NightLightsStateEnum;
(function (NightLightsStateEnum) {
  NightLightsStateEnum[NightLightsStateEnum.CLOSE = 0] = 'CLOSE'
  NightLightsStateEnum[NightLightsStateEnum.OPEN = 1] = 'OPEN'
})(NightLightsStateEnum || (NightLightsStateEnum = {}))
// 限远开关
export var DistanceLimitStatusEnum;
(function (DistanceLimitStatusEnum) {
  DistanceLimitStatusEnum[DistanceLimitStatusEnum.UNSET = 0] = 'UNSET'
  DistanceLimitStatusEnum[DistanceLimitStatusEnum.SET = 1] = 'SET'
})(DistanceLimitStatusEnum || (DistanceLimitStatusEnum = {}))
// 避障
export var ObstacleAvoidanceStatusEnum;
(function (ObstacleAvoidanceStatusEnum) {
  ObstacleAvoidanceStatusEnum[ObstacleAvoidanceStatusEnum.CLOSE = 0] = 'CLOSE'
  ObstacleAvoidanceStatusEnum[ObstacleAvoidanceStatusEnum.OPEN = 1] = 'OPEN'
})(ObstacleAvoidanceStatusEnum || (ObstacleAvoidanceStatusEnum = {}))
// 设备管理设置key
export var DeviceSettingKeyEnum;
(function (DeviceSettingKeyEnum) {
  DeviceSettingKeyEnum.NIGHT_LIGHTS_MODE_SET = 'night_lights_state'
  DeviceSettingKeyEnum.HEIGHT_LIMIT_SET = 'height_limit'
  DeviceSettingKeyEnum.DISTANCE_LIMIT_SET = 'distance_limit_status'
  DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_HORIZON = 'obstacle_avoidance_horizon'
  DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_UPSIDE = 'obstacle_avoidance_upside'
  DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_DOWNSIDE = 'obstacle_avoidance_downside'
})(DeviceSettingKeyEnum || (DeviceSettingKeyEnum = {}))
export const initDeviceSetting = {
  [DeviceSettingKeyEnum.NIGHT_LIGHTS_MODE_SET]: {
    label: '飞行器夜航灯',
    value: '',
    trueValue: NightLightsStateEnum.CLOSE,
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '为保证飞行器的作业安全，建议打开夜航灯',
      label: '飞行器夜航灯',
    },
    settingKey: DeviceSettingKeyEnum.NIGHT_LIGHTS_MODE_SET,
  },
  [DeviceSettingKeyEnum.HEIGHT_LIMIT_SET]: {
    label: '限高',
    value: '',
    trueValue: 120,
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '限高：20 - 1500m',
      // info: '修改限高会影响当前机场的所有作业任务，建议确认作业情况后再进行修改',
      label: '限高',
    },
    settingKey: DeviceSettingKeyEnum.HEIGHT_LIMIT_SET,
  },
  [DeviceSettingKeyEnum.DISTANCE_LIMIT_SET]: {
    label: '限远',
    value: '',
    trueValue: DistanceLimitStatusEnum.UNSET,
    // info: '限远（15 - 8000m）是约束飞行器相对机场的最大作业距离',
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '限远 (15- 8000m) 是约束飞行器相对机场的最大作业距离',
      // info: '修改限远会影响当前机场的所有作业任务，建议确认作业情况后再进行修改',
      label: '限远',
    },
    settingKey: DeviceSettingKeyEnum.DISTANCE_LIMIT_SET,
  },
  [DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_HORIZON]: {
    label: '水平避障',
    value: '',
    trueValue: ObstacleAvoidanceStatusEnum.CLOSE,
    // info: '飞行器的避障工作状态显示，可以快速开启/关闭飞行器避障，如需进一步设置请在设备运维页面设置',
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '飞行器避障是保障飞行作业安全的基础功能，建议保持飞行器避障开启',
      label: '水平避障',
    },
    settingKey: DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_HORIZON,
  },
  [DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_UPSIDE]: {
    label: '上视避障',
    value: '',
    trueValue: ObstacleAvoidanceStatusEnum.CLOSE,
    // info: '飞行器的避障工作状态显示，可以快速开启/关闭飞行器避障，如需进一步设置请在设备运维页面设置',
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '飞行器避障是保障飞行作业安全的基础功能，建议保持飞行器避障开启',
      label: '上视避障',
    },
    settingKey: DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_UPSIDE,
  },
  [DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_DOWNSIDE]: {
    label: '下视避障',
    value: '',
    trueValue: ObstacleAvoidanceStatusEnum.CLOSE,
    // info: '飞行器的避障工作状态显示，可以快速开启/关闭飞行器避障，如需进一步设置请在设备运维页面设置',
    editable: false,
    popConfirm: {
      visible: false,
      loading: false,
      // content: '飞行器避障是保障飞行作业安全的基础功能，建议保持飞行器避障开启',
      label: '下视避障',
    },
    settingKey: DeviceSettingKeyEnum.OBSTACLE_AVOIDANCE_DOWNSIDE,
  },
}
export const initDeviceSettingFormModel = {
  nightLightsState: false,
  heightLimit: 20,
  distanceLimitStatus: { state: false, distanceLimit: 15 },
  obstacleAvoidanceHorizon: false,
  obstacleAvoidanceUpside: false,
  obstacleAvoidanceDownside: false, // 飞行器避障-下视开关设置
}
// # sourceMappingURL=device-setting.js.map
