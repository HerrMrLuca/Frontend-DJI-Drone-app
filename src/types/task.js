import { commonColor } from '/@/utils/color'
// 任务类型
export var TaskType;
(function (TaskType) {
  TaskType[TaskType.Immediate = 0] = 'Immediate'
  TaskType[TaskType.Single = 1] = 'Single'
})(TaskType || (TaskType = {}))
export const TaskTypeMap = {
  [TaskType.Immediate]: 'Immediate',
  [TaskType.Single]: 'Timed & One-Time',
}
// 失控动作
export var OutOfControlAction;
(function (OutOfControlAction) {
  OutOfControlAction[OutOfControlAction.ReturnToHome = 0] = 'ReturnToHome'
  OutOfControlAction[OutOfControlAction.Hover = 1] = 'Hover'
  OutOfControlAction[OutOfControlAction.Land = 2] = 'Land'
})(OutOfControlAction || (OutOfControlAction = {}))
export const OutOfControlActionMap = {
  [OutOfControlAction.ReturnToHome]: 'Return to Home',
  [OutOfControlAction.Hover]: 'Hover',
  [OutOfControlAction.Land]: 'Land',
}
export const OutOfControlActionOptions = [
  { value: OutOfControlAction.ReturnToHome, label: OutOfControlActionMap[OutOfControlAction.ReturnToHome] },
  { value: OutOfControlAction.Hover, label: OutOfControlActionMap[OutOfControlAction.Hover] },
  { value: OutOfControlAction.Land, label: OutOfControlActionMap[OutOfControlAction.Land] },
]
// 任务状态
export var TaskStatus;
(function (TaskStatus) {
  TaskStatus[TaskStatus.Wait = 1] = 'Wait'
  TaskStatus[TaskStatus.Carrying = 2] = 'Carrying'
  TaskStatus[TaskStatus.Success = 3] = 'Success'
  TaskStatus[TaskStatus.CanCel = 4] = 'CanCel'
  TaskStatus[TaskStatus.Fail = 5] = 'Fail'
})(TaskStatus || (TaskStatus = {}))
export const TaskStatusMap = {
  [TaskStatus.Wait]: 'To be performed',
  [TaskStatus.Carrying]: 'In progress',
  [TaskStatus.Success]: 'Task completed',
  [TaskStatus.CanCel]: 'Task canceled',
  [TaskStatus.Fail]: 'Task failed',
}
export const TaskStatusColor = {
  [TaskStatus.Wait]: commonColor.BLUE,
  [TaskStatus.Carrying]: commonColor.BLUE,
  [TaskStatus.Success]: commonColor.NORMAL,
  [TaskStatus.CanCel]: commonColor.FAIL,
  [TaskStatus.Fail]: commonColor.FAIL,
}
// 任务执行 ws 消息状态
export var TaskProgressStatus;
(function (TaskProgressStatus) {
  TaskProgressStatus.Sent = 'sent'
  TaskProgressStatus.inProgress = 'in_progress'
  TaskProgressStatus.Paused = 'paused'
  TaskProgressStatus.Rejected = 'rejected'
  TaskProgressStatus.Canceled = 'canceled'
  TaskProgressStatus.Timeout = 'timeout'
  TaskProgressStatus.Failed = 'failed'
  TaskProgressStatus.OK = 'ok'
})(TaskProgressStatus || (TaskProgressStatus = {}))
// ws status => log status
export const TaskProgressWsStatusMap = {
  [TaskProgressStatus.Sent]: TaskStatus.Carrying,
  [TaskProgressStatus.inProgress]: TaskStatus.Carrying,
  [TaskProgressStatus.Rejected]: TaskStatus.Fail,
  [TaskProgressStatus.OK]: TaskStatus.Success,
  [TaskProgressStatus.Failed]: TaskStatus.Fail,
  [TaskProgressStatus.Canceled]: TaskStatus.CanCel,
  [TaskProgressStatus.Timeout]: TaskStatus.Fail,
  [TaskProgressStatus.Paused]: TaskStatus.Wait,
}
// # sourceMappingURL=task.js.map
