import { electronAPI } from '@electron-toolkit/preload'
// import { contextBridge } from 'electron'
import { contextBridge } from 'electron'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// eslint-disable-next-line node/prefer-global/process
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  window.electron = electronAPI
  window.api = api
}
