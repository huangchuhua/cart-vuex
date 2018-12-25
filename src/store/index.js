import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import * as plugins from './plugins'

import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    state,
    mutations,
    actions,
    getters,
    modules: {
        cart,
        products
    },
    // plugins: [plugins.logger]
    plugins: debug ? [createLogger()] : []//内置插件
    // plugins: [createPersistedState()]//第三方插件，数据缓存
})