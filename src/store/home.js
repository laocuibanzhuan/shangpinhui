import { mockBanner, mockFloor, reqCategoryList } from '../api/index'


const actions = {
    async categoryList(context) {
        let res = await reqCategoryList()
        // console.log(res);
        if (res.code == 200) {
            context.commit('CATEGORYLIST', res.data)
        }
    },
    async banner(context) {
        let res = await mockBanner()
        if (res.code == 200) {
            context.commit('BANNER', res.data)
        }
    },
    async floor(context) {
        let res = await mockFloor()
        if (res.code == 200) {
            context.commit('FLOOR', res.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    BANNER(state, data) {
        state.banner = data
    },
    FLOOR(state, data) {
        state.floor = data
    },

}
const state = {
    categoryList: [],
    banner: [],
    floor: []
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