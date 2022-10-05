import { reqCartList, deleteGoods, changeCheckedState } from "@/api/index.js"
import { uuidToken } from '@/uuid'

const actions = {
    async getCartlist(context) {
        let res = await reqCartList()
        if (res.code == 200) {
            context.commit('GETCARTLIST', res.data)
        }
    },
    async deleteGoods(context, id) {
        let res = await deleteGoods(id)
        if (res.code == 200) {
            return true
        } else {
            return false
        }
    },
    async changeCheckedState(context, argu) {
        let res = await changeCheckedState(argu[0], argu[1])
        if (res.code == 200) {
            return true
        } else {
            return false
        }
    },
}
const mutations = {
    GETCARTLIST(state, data) {
        if (data[0]) {
            state.data = data
        }
    }
}
const state = {
    data: [{}],
    uuidToken
}
const getters = {
    data() {
        return state.data[0].cartInfoList || []
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}