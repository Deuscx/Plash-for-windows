import type { Router } from '~main/tipc'
import { createClient } from '@egoist/tipc/renderer'

export const client = createClient<Router>({
  // pass ipcRenderer.invoke function to the client
  // you can expose it from preload.js in BrowserWindow
  ipcInvoke: window.electron.ipcRenderer.invoke,
})
