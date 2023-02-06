export function consoleWarn (...args: Parameters<typeof console.warn>) {
  if (import.meta.env.VITE_APP_ENVIRONMENT !== 'PROD') {
    console.warn.apply(null, args) // eslint-disable-line no-console
  }
}
