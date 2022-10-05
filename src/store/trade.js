import { reqAddressInfo, reqTradeInfo, commitOrder } from "@/api"

const actions = {
    async getAddress(context) {
        let res = await reqAddressInfo()
        if (res.code == 200) {
            context.commit('GETADDRESS', res.data)
        }
    },
    async getTradeInfo(context) {
        let res = await reqTradeInfo()
        if (res.code == 200) {
            context.commit('GETTRADEINFO', res.data)
        }
    },
    async commitOrder(context, data) {
        let res = await commitOrder(data)
        if (res.code == 200) {
            return res.data
        } else {
            return false
        }
    },
}
const mutations = {
    GETADDRESS(state, data) {
        if (data == []) {
            state.address = data
        }
    },
    GETTRADEINFO(state, data) {
        state.tradeInfo = data
    }
}
const state = {
    address: [
        { "id": 2254, "userAddress": "尚硅谷", "userId": 2, "provinceId": 6, "consignee": "小王", "phoneNum": "10086", "isDefault": "0", "regionId": 2, "fullAddress": "上海尚硅谷" },
        { "id": 2255, "userAddress": "123", "userId": 2, "provinceId": 1, "consignee": "232", "phoneNum": "123", "isDefault": "0", "regionId": 1, "fullAddress": "北京123" },
        { "id": 2257, "userAddress": "武汉科技大学", "userId": 2, "provinceId": 24, "consignee": "李华", "phoneNum": "12345678910", "isDefault": "1", "regionId": 4, "fullAddress": "湖北武汉科技大学" }
    ],
    tradeInfo: {}
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