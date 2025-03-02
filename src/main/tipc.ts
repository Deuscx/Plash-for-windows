import { tipc } from '@egoist/tipc/main'
import { shell } from 'electron'
import { attach } from 'electron-as-wallpaper'
import { windowManager } from '~main/windows/manager'
import { storePath } from './store'
import { applyUpdate, checkUpdate, downloadUpdate } from './update'

const t = tipc.create()

export const router = {
  newWindow: t.procedure
    .input<string>()
    .action(async ({ input }) => {
      windowManager.get('second').loadURL(input)
    }),

  attachWallpaper: t.procedure
    .action(async () => {
      const secondWindow = windowManager.get('second')
      if (!secondWindow)
        return
      attach(secondWindow, {
        transparent: true,
        forwardKeyboardInput: true,
        forwardMouseMove: true,
        forwardMouseClick: true,
        // forwardMouseInput: true,
      })
    }),

  // detachWallpaper: t.procedure
  //   .action(async () => {
  //     const secondWindow = windowManager.get('second')
  //     if (!secondWindow)
  //       return

  //     detach(secondWindow)
  //   }),

  openStoreFile: t.procedure
    .action(async () => {
      shell.openPath(storePath)
    }),

  checkUpdate: t.procedure
    .action(async () => {
      await checkUpdate()
    }),

  downloadUpdate: t.procedure
    .action(async () => {
      downloadUpdate()
    }),

  applyUpdate: t.procedure
    .action(async () => {
      applyUpdate()
    }),
}

export type Router = typeof router
