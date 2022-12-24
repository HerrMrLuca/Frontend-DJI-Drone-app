import { createApp } from 'vue'
let root
let app = null
export function createInstance (App) {
  app = createApp(App)
  root = app.config.globalProperties
  return app
}
export function getRoot () {
  return root
}
export function getApp () {
  return app
}
// # sourceMappingURL=root.js.map
