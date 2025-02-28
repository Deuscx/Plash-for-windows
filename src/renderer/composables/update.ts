import { client } from '../client'

export function useAppUpdate() {
  const status = ref<string | null>(null)
  const updateInfo = ref<any>(null)
  const updateProgressInfo = ref<any>(null)
  const error = ref<Error | null>(null)

  const checkUpdate = () => client.checkUpdate()
  const downloadUpdate = () => client.downloadUpdate()
  const applyUpdate = () => client.applyUpdate()

  const handleStatusChange = (_event: any, updateEventName: string, ...args: any[]) => {
    status.value = updateEventName

    switch (updateEventName) {
      case 'error':
        error.value = args[0]
        break
      case 'checking-for-update':
        break
      case 'update-available':
        updateInfo.value = args[0]
        break
      case 'update-not-available':
        break
      case 'download-progress':
        updateProgressInfo.value = args[0]
        break
      case 'update-downloaded':
        updateInfo.value = args[0]
        break
      default:
        break
    }
  }

  onMounted(() => {
    window.electron.ipcRenderer.on('APP_UPDATER/STATUS_CHANGE', handleStatusChange)
  })

  onUnmounted(() => {
    window.electron.ipcRenderer.removeListener('APP_UPDATER/STATUS_CHANGE', handleStatusChange)
  })

  return {
    status,
    updateInfo,
    updateProgressInfo,
    error,
    checkUpdate,
    downloadUpdate,
    applyUpdate,
  }
}
