// import Icon from '@ant-design/icons-vue'
import * as antDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import svgIcon from '/@/components/svgIcon.vue'
export const antComponents = {
  install (app) {
    app.use(antDesign)
    // app.component('Icon', Icon)
    app.component('svg-icon', svgIcon)
  }
}
// # sourceMappingURL=antd.js.map
