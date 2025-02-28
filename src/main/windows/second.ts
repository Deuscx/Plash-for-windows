import type { WindowCreateConfig } from './manager'

export const secondWindowConfig: WindowCreateConfig = {
  options: {
    width: 400,
    height: 300,
    autoHideMenuBar: true,
    show: false,
  },
  callback(window) {
    window.on('ready-to-show', () => {
      window.show()
    })
  },
}
