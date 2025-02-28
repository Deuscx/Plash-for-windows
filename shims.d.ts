import type { ElectronAPI } from '@electron-toolkit/preload'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: any
  }
}
