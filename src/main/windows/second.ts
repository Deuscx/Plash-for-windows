import type { WindowCreateConfig } from './manager'
import { screen } from 'electron'
import { attach } from 'electron-as-wallpaper'

export const secondWindowConfig: WindowCreateConfig = {
  options: {
    show: false,
    frame: false,
    enableLargerThanScreen: true,
    autoHideMenuBar: true,
    transparent: true,
  },
  callback(window) {
    const size = screen.getPrimaryDisplay().bounds
    window.on('ready-to-show', () => {
      window.show()
      window.setBounds(size)

      // don't forward mouse input https://github.com/meslzy/electron-as-wallpaper/issues/29
      attach(window, {
        transparent: true,
        // forwardKeyboardInput: true,
        // forwardMouseInput: true,
      })
    })
  },
}
