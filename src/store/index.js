/* eslint-disable no-unused-var */
import { NoseaStore } from '@nosea/store'
import types from './types'
// import config from '../utils/default-config.yaml'

const config = {}
const _info = wx.getSystemInfoSync()

const getConfig = function () {
  try {
    const _savedConfig = wx.getStorageSync('configCache')
    if (typeof _savedConfig.strings !== 'object') {
      throw new TypeError('Invalid cache.')
    }
    return _savedConfig
  } catch (e) {
    console.warn(e)
    return config
  }
}

const setConfig = function (obj) {
  try {
    wx.setStorageSync('configCache', obj)
    return obj
  } catch (e) {
    return undefined
  }
}

const getShareLog = function () {
  try {
    const _savedConfig = wx.getStorageSync('shareLog')
    if (typeof _savedConfig.count !== 'number') {
      throw new TypeError('Invalid cache.')
    }
    return _savedConfig
  } catch (e) {
    console.warn(e)
    return { count: 0 }
  }
}

const setShareLog = function (obj) {
  try {
    wx.setStorageSync('shareLog', obj)
    return obj
  } catch (e) {
    return { count: 0 }
  }
}

export default new NoseaStore({
  types,
  getters: {
    [types.getters.statusBarHeight] (state) {
      try {
        return _info.statusbarHeight || _info.statusBarHeight
      } catch (e) {
        return 20
      }
    },
    [types.getters.isIphoneX] (state) {
      try {
        return (_info.platform === 'ios' || _info.system.toLowerCase().includes('ios')) && (_info.statusbarHeight > 20 || _info.statusBarHeight > 20)
      } catch (e) {
        return false
      }
    },
    [types.getters.isIos] (state) {
      try {
        return _info.platform === 'ios' || _info.system.toLowerCase().includes('ios')
      } catch (e) {
        return false
      }
    },
    [types.getters.config] (state) {
      getCurrentPages().forEach(p => {
        if (p.onConfigUpdate) {
          return p.onConfigUpdate(state.config)
        }
      })
      return state.config
    },
    [types.getters.shareLog] (state) {
      return state.shareLog
    }
  },
  actions: {
    SetConfig (state, newConfig) {
      return new Promise(function (resolve, reject) {
        try {
          const _config = JSON.parse(newConfig)
          if (_config.strings) {
            setConfig(_config)
            state.config = _config
            return resolve(state)
          } else {
            throw new TypeError('Invalid config.')
          }
        } catch (e) {
          return reject(e)
        }
      })
    },
    TouchShareConfig (state) {
      return new Promise(function (resolve, reject) {
        try {
          let shareLog = Object.assign({}, state.shareLog)
          if (!(shareLog || typeof shareLog === 'number')) {
            shareLog = { count: 0 }
          }
          shareLog.count += 1
          setShareLog(shareLog)
          state.shareLog = shareLog
          return resolve(state)
        } catch (e) {
          return reject(e)
        }
      })
    }
  },
  state: {
    config: getConfig(),
    shareLog: getShareLog()
  }
})

export { default as types } from './types'
