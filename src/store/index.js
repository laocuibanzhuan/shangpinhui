import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import trade from './trade'
import center from './center'

Vue.use(Vuex)

const actions = {

}
const mutations = {

}
const state = {

}
const getters = {

}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {
        home,
        search,
        detail,
        cart,
        user,
        trade,
        center
    }
})