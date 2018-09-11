import { NoseaApp } from '@nosea/core'
import injectedMethods from '@/utils/injected-methods'

import store from '@/store'
import share from '@/share'

class TanoApp extends NoseaApp {
  static plugins = { store, share }
  static pageMethods = [injectedMethods]
  static pageData = {}
}

App(TanoApp.init())
