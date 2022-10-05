import { register, login, reqUserInfo, logout } from "@/api/index.js"
const actions = {
    async register({ commit }, userInfo) {
        let res = await register(userInfo)
        if (res.code == 200) {
            return true
        } else {
            return res.message
        }
    },
    async login({ commit }, userInfo) {
        let res = await login(userInfo)
        if (res.code == 200) {
            commit('LOGIN', res.data.token)
            sessionStorage.setItem('token', res.data.token)
            return true
        } else {
            return false
        }
    },
    async logout({ commit }) {
        let res = await logout()
        if (res.code == 200) {
            commit('CLEAR')
            return true
        } else {
            return false
        }
    },
    async userInfo({ commit }) {
        let res = await reqUserInfo()
        if (res.code == 200) {
            commit('USERINFO', res.data)
            return true
        } else {
            return false
        }
    },
}
const mutations = {
    LOGIN(state, data) {
        state.token = data
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    CLEAR() {
        sessionStorage.removeItem('token')
        state.userInfo = {}
        state.token = (function () {
            let token = sessionStorage.getItem('token')
            if (token) {
                return token
            } else {
                return ''
            }
        }())
    }
}
const state = {
    token: (function () {
        let token = sessionStorage.getItem('token')
        if (token) {
            return token
        } else {
            return ''
        }
    }()),
    userInfo: {}
}
const getters = {

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}