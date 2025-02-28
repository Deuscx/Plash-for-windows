import process from 'node:process'
import { registerIpcMain } from '@egoist/tipc/main'
import { app, BrowserWindow } from 'electron'
// import icon from '../../resources/icon.png?asset'
import { router } from './tipc'
import { setUpTray } from './tray'
import { windowManager } from './windows/manager'

function run() {
  // https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock
  // 请求单例锁，避免打开多个electron实例
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
    return
  }

  app.whenReady().then(() => {
  // Set app user model id for windows
  // electronApp.setAppUserModelId('com.electron')

    windowManager.create('main')
    setUpTray()
    registerIpcMain(router)

    app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0)
        windowManager.create('main')
    })
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('before-quit', () => {
    const windows = BrowserWindow.getAllWindows()
    windows.forEach(window => window.destroy())
  })
}

run()
