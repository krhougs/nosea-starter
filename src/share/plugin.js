import { NoseaPlugin } from '@nosea/core'

class TanoShareManagerPlugin extends NoseaPlugin {
  static events = ['share']

  constructor (options) {
    super(options)

    this.hooks = {
      page: {
        onLoad: this.installPage.bind(this),
        onShareAppMessage: this.hookOnShareAppMessage.bind(this)
      }
    }
  }

  hookOnShareAppMessage (noseaApp, noseaPage, wxOptions) {
    return this.getShareObject(wxOptions)
  }

  installPage (noseaApp, noseaPage) {
    const minaPage = noseaPage.$minaPage

    Object.defineProperty(noseaPage, '$shareManager', {
      configurable: true,
      get: () => this
    })
    Object.defineProperty(minaPage, '$shareManager', {
      configurable: true,
      get: () => this
    })

    switch (typeof noseaPage.share) {
      case 'object':
        noseaPage._shareOptions = noseaPage.share
        break
      case 'function':
        noseaPage._shareOptions = noseaPage.share.bind(minaPage)()
        break
      default:
        noseaPage._shareOptions = {
          enabled: false
        }
        break
    }

    Object.defineProperties(this, {
      currentPage: {
        configurable: true,
        get () {
          return noseaPage
        }
      },
      currentOptions: {
        configurable: true,
        get () {
          return noseaPage._shareOptions
        }
      },
      currentScene: {
        configurable: true,
        get () {
          return noseaPage._shareScene
        }
      },
      shareObject: {
        configurable: true,
        get () {
          return noseaPage._shareObject
        }
      }
    })

    if (noseaPage._shareOptions['enabled']) {
      this.setDefaultScene()
    }
    this.updateShareMenuStatus()
  }

  hide () { wx.hideShareMenu() }
  show () { wx.showShareMenu() }

  getShareObject (options) {
    this.currentPage._shareObject = this.currentScene(options, this.useScene)
    return this.currentPage._shareObject
  }

  setDefaultScene () {
    if (this.currentOptions.enabled) {
      if (
        this.currentOptions.scenes &&
        this.currentOptions.default &&
        this.currentOptions.scenes[this.currentOptions.default]
      ) {
        this.setScene(this.currentOptions.default)
      } else {
        this.setDirect()
      }
    } else {
      this.setDisabled()
    }
  }

  useScene (sceneName, options) {
    return this.resolveScene(sceneName)(options, this.useScene)
  }

  resolveScene (sceneName) {
    const target = this.currentOptions.scenes[sceneName]
    if (!target) { throw new TypeError(`Scene ${sceneName} not found in this page.`) }
    if (target.data) {
      switch (typeof target.data) {
        case 'object':
          return () => target.data
        case 'function':
          return (options, use) => target.data(options, use.bind(this))
        default:
          throw new TypeError(`Invalid scene ${sceneName}.`)
      }
    } else {
      throw new TypeError(`Invalid scene ${sceneName}.`)
    }
  }

  setScene (sceneName) {
    const target = this.currentOptions.scenes[sceneName]
    if (!target) { throw new TypeError(`Scene ${sceneName} not found in this page.`) }
    if (target.sharable) {
      if (target.data) {
        this.currentPage._shareScene = this.resolveScene(sceneName)
        this.updateShareMenuStatus()
      } else {
        this.setDirect()
      }
    } else {
      this.setDisabled()
    }
  }

  setDirect () {
    this.currentPage._shareScene = function () {
      return {}
    }
    this.updateShareMenuStatus()
  }

  setDisabled () {
    this.currentPage._shareScene = null
    this.updateShareMenuStatus()
  }

  updateShareMenuStatus () {
    if (this.currentScene) {
      this.show()
    } else {
      this.hide()
    }
  }
}

export default TanoShareManagerPlugin
