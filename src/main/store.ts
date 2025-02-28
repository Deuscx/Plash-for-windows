import type { LowSync } from 'lowdb'
import path from 'node:path'
import { app } from 'electron'
import { JSONFileSyncPreset } from 'lowdb/node'
import { isMacOS } from './constants'

const STORE_PATH = app.getPath('userData')

const defaultData = {
  minimizeToTray: !isMacOS,
}
interface AppConfig {
  minimizeToTray?: boolean
}

type ConfigKey = keyof AppConfig

export const storePath = path.join(STORE_PATH, './vue-electron-starter-conf.json')

class Store {
  db: LowSync<AppConfig>
  constructor() {
    this.db = JSONFileSyncPreset<AppConfig>(storePath, defaultData)
    this.db.write()
  }

  get(name: ConfigKey) {
    return this.db.data[name]
  }

  set(name: ConfigKey, value: AppConfig[ConfigKey]) {
    this.db.read()
    this.db.data[name] = value
    this.db.write()
  }
}

export const store = new Store()
