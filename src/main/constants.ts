import { resolve } from 'node:path'
import process from 'node:process'

export const isDev = process.env.NODE_ENV === 'development'
export const preloadPath = resolve(__dirname, '../preload/index.mjs')
export const trayIcon = resolve(__dirname, '../../resources/icon.png')

const { platform } = process
export const isMacOS = platform === 'darwin'
export const isWindows = platform === 'win32'
