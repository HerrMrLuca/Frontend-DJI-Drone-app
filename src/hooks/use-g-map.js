import AMapLoader from '@amap/amap-jsapi-loader'
import { reactive } from 'vue'
import { AMapConfig } from '/@/constants/index'
export function useGMapManage () {
  const state = reactive({
    aMap: null,
    map: null,
    mouseTool: null,
  })
  async function initMap (container, app) {
    AMapLoader.load({
      ...AMapConfig
    }).then((AMap) => {
      state.aMap = AMap
      state.map = new AMap.Map(container, {
        center: [113.935913, 22.525335],
        zoom: 15
      })
      state.mouseTool = new AMap.MouseTool(state.map)
      // 挂在到全局
      app.config.globalProperties.$aMap = state.aMap
      app.config.globalProperties.$map = state.map
      app.config.globalProperties.$mouseTool = state.mouseTool
    }).catch(e => {
      console.log(e)
    })
  }
  function globalPropertiesConfig (app) {
    initMap('g-container', app)
  }
  return {
    globalPropertiesConfig,
  }
}
// # sourceMappingURL=use-g-map.js.map
