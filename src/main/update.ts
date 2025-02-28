import type { AppUpdaterEvents } from 'electron-updater/out/AppUpdater'
import { join, resolve } from 'node:path'
import { app, BrowserWindow } from 'electron'
import logger from 'electron-log'
import pkg from 'electron-updater'
import { isDev } from './constants'

// https://github.com/electron-userland/electron-builder/issues/7976
const { autoUpdater } = pkg

const updaterCacheDirName = 'starter-updater'
const updatePath = join(app.getAppPath(), updaterCacheDirName, 'pending')
logger.info(`[update][init] path:${updatePath}`)

autoUpdater.autoDownload = false // 关闭自动下载
autoUpdater.autoInstallOnAppQuit = false // 关闭自动安装

if (isDev) {
  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true
    },
  })
  autoUpdater.updateConfigPath = resolve(__dirname, '../../dev-app-update.yml')
}

export function checkUpdate() {
  return autoUpdater.checkForUpdates()
}

export function downloadUpdate() {
  return autoUpdater.downloadUpdate()
}

export function applyUpdate() {
  return autoUpdater.quitAndInstall()
}

function sendToAllBrowserWindows(channel: string, ...args: unknown[]) {
  const browserWindows = BrowserWindow.getAllWindows()
  browserWindows.forEach(bw => bw.webContents.send(channel, ...args))
}

function init() {
  // 日志
  logger.transports.file.level = 'info'
  autoUpdater.logger = logger

  // 监听事件并发送到渲染进程
  const events = [
    'error',
    'checking-for-update',
    'update-available',
    'update-not-available',
    'download-progress',
    'update-downloaded',
  ] as (keyof AppUpdaterEvents)[]

  events.forEach(eventName => autoUpdater.on(eventName, sendToAllBrowserWindows.bind(null, 'APP_UPDATER/STATUS_CHANGE')))
}

app.once('will-finish-launching', init)
