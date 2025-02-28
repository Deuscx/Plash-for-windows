import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow } from 'electron'
import { isDev } from '~main/constants'
import { mainWinConfig } from './main'
import { secondWindowConfig } from './second'

export type WindowType = 'main' | 'second'

export interface WindowCreateConfig {
  options: Partial<BrowserWindowConstructorOptions>
  callback: (window: BrowserWindow, windowManager: WindowManager) => void
}

const windowConfigs: Record<string, WindowCreateConfig> = {
  main: mainWinConfig,
  second: secondWindowConfig,
}

class WindowManager {
  private windowMap: Map<WindowType, BrowserWindow> = new Map()

  create(name: WindowType) {
    const windowConfig = windowConfigs[name]

    const win = new BrowserWindow(windowConfig.options)
    this.windowMap.set(name, win)

    isDev && win.webContents.openDevTools({ mode: 'detach' })
    win.on('closed', () => {
      this.windowMap.delete(name)
    })

    windowConfig.callback(win, this)

    return win
  }

  get(name: WindowType) {
    if (this.windowMap.has(name)) {
      return this.windowMap.get(name)!
    }

    const window = this.create(name)
    return window
  }
}

export const windowManager = new WindowManager()
