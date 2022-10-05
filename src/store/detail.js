import { reqDetail } from "@/api"
import { addToCart } from '@/api'

const actions = {
    async getDetail(context, id) {
        let res = await reqDetail(id)
        if (res.code == 200) {
            context.commit('GETDETAIL', res.data)
        }
    },
    async addToCart(context, info) {
        let res = await addToCart(info[1], info[0])
        if (res.code == 200) {
            return true
        } else {
            return false
        }
    }
}
const mutations = {
    GETDETAIL(state, data) {
        state.detailInfo = data
    },
}
const state = {
    detailInfo: {
        skuInfo: {}
    }
}
const getters = {
    skuInfo() {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || {}
    },
    skuImageList() {
        return state.detailInfo.skuInfo.skuImageList || {}
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}