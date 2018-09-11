const reducer = function (acc, cv, ci) {
  acc.push([cv[0], cv[1]], [cv[1], cv[0]])
  return acc
}

const toMap = function (obj) {
  const ret = new Map((Object.entries(obj)).reduce(reducer, []))
  for (let k in obj) {
    const v = obj[k]
    Object.defineProperties(ret, {
      [k]: {
        value: v
      },
      [v]: {
        value: v
      }
    })
  }
  return ret
}

const _getters = {
  isIphoneX: Symbol('GETTER_IS_IPHONE_X'),
  isIos: Symbol('GETTER_IS_IOS'),
  statusBarHeight: Symbol('GETTER_STATUS_BAR_HEIGHT'),
  config: Symbol('GETTER_CONFIG'),
  shareLog: Symbol('GETTER_SHARE_LOG')
}

const _actions = {}

const _mutations = {}

const getters = toMap(_getters)
const actions = toMap(_actions)
const mutations = toMap(_mutations)

export default {
  getters,
  actions,
  mutations
}

export {
  getters,
  actions,
  mutations
}
