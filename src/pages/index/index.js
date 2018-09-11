/* eslint-disable */
import { NoseaPage } from '@nosea/core'
import * as Assets from '@/assets'

const data = {
  Assets,
  started: false
}

const indexMethods = {
  getIndexShareObject () {
    return {
      title: '111111111111111'
    }
  }
}

class IndexView extends NoseaPage {
  static data = data
  static methods = indexMethods
  static getters = {
    isIphoneX: 'isIphoneX',
    isIos: 'isIos',
    config: 'config',
    statusBarHeight: 'statusBarHeight',
    shareLog: 'shareLog'
  }

  share () {
    const _this = this
    return {
      enabled: true,
      default: 'default',
      scenes: {
        disabled: {
          sharable: false
        },
        default: {
          sharable: true,
          data (options, use) { return _this.getIndexShareObject() }
        }
      }
    }
  }

  onShow () {
  }

  onLoad () {
  }
}

Page(IndexView.init())
