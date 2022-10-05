import { reqSearchList } from '@/api/index'


const actions = {
    async searchList(context, params) {
        let result = await reqSearchList(params)
        if (result.code == 200) {
            context.commit('SEARCHLIST', result.data)
        }
    }
}
const mutations = {
    SEARCHLIST(state, data) {
        state.searchList = data
    }
}
const state = {
    searchList: {}
}
const getters = {
    goodsList() {
        return state.searchList.goodsList
    },
    trademarkList() {
        return state.searchList.trademarkList
    },
    attrsList() {
        return state.searchList.attrsList
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}