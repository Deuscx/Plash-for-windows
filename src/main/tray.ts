import { app, Menu, Tray } from 'electron'
import { trayIcon } from './constants'
import { windowManager } from './windows/manager'

let tray: Tray
// 设置顶部APP图标的操作和图标
export function setUpTray() {
  tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        restoreMainWindow()
      },
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ])
  tray.setToolTip(app.getName())
  tray.setContextMenu(contextMenu)

  // windows下双击托盘图标打开app
  tray.on('click', () => {
    restoreMainWindow()
  })
}

function restoreMainWindow() {
  const main = windowManager.get('main')
  if (!main)
    return
  main.restore()
  main.show()
}

export function destroyTray() {
  tray.destroy()
}
