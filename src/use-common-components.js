const components = {}
export const CommonComponents = {
  install (app) {
    Object.keys(components).forEach(name => {
      app.component(name, components[name])
    })
  }
}
// # sourceMappingURL=use-common-components.js.map
