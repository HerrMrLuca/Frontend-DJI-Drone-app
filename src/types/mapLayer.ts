export interface mapLayerStyle {
  background: string
}

// 拖拽事件
export interface DropEvent {
  node: {
    eventKey: string
    pos: string
    $parent: any
  }
  dragNode: {
    eventKey: string
  }
  dropPosition: number
  dropToGap: boolean
}

export interface mapLayer {
  key?: string
  title: string
  id: string
  name: string
  style: mapLayerStyle
  elements: any
}

export enum LayerType {
  Normal,
  Default,
  Share,
  Reconstruction
}
