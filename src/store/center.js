import { reqOrderList } from "@/api"

const actions = {
    async getOrderList({ commit }, { page, limit }) {
        let res = await reqOrderList(page, limit)
        if (res.code == 200) {
            commit("GETORDERLIST", res.data)
        }
    }
}
const mutations = {
    GETORDERLIST(state, data) {
        state.orderData = data
    }
}
const state = {
    orderData: {
        records: []
    }
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