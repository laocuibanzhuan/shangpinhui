import requests from './request'
import mockRequests from './mock'

export const reqCategoryList = () => {
    return requests({ url: "product/getBaseCategoryList", method: "get" })
}

export const mockBanner = () => {
    return mockRequests({ url: "banner", method: "get" })
}

export const mockFloor = () => {
    return mockRequests({ url: "floor", method: "get" })
}

export const reqSearchList = (params) => {
    return requests({ url: "list", method: "post", data: params || {} })
}

export const reqDetail = (params) => {
    return requests({ url: `/item/${params}`, method: "get" })
}

export const addToCart = (id, num) => {
    return requests({ url: `/cart/addToCart/${id}/${num}`, method: "post" })
}

export const reqCartList = () => {
    return requests({ url: '/cart/cartList', method: "get" })
}

export const deleteGoods = (id) => {
    return requests({ url: `/cart/deleteCart/${id}`, method: "delete" })
}

export const changeCheckedState = (id, state) => {
    return requests({ url: `/cart/checkCart/${id}/${state}`, method: "get" })
}

export const reqVerification = (phoneNumber) => {
    return requests({ url: `/user/passport/sendCode/${phoneNumber}`, method: "get" })
}

export const register = (userInfo) => {
    return requests({ url: '/user/passport/register', method: "post", data: userInfo})
}

export const login = (userInfo) => {
    return requests({ url: '/user/passport/login', method: "post", data: userInfo})
}

export const reqUserInfo = () => {
    return requests({ url: 'user/passport/auth/getUserInfo', method: "get"})
}

export const logout = () => {
    return requests({ url: 'user/passport/logout', method: "get"})
}

export const reqAddressInfo = () => {
    return requests({ url: '/user/userAddress/auth/findUserAddressList', method: "get"})
}

export const reqTradeInfo = () => {
    return requests({ url: '/order/auth/trade', method: "get"})
}

export const commitOrder = (data) => {
    return requests({ url: `/order/auth/submitOrder?tradeNo=${data.traderNo}`, method: "post", data})
}

export const reqOrderInfo = (orderId) => {
    return requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get"})
}

export const reqPayInfo = (orderId) => {
    return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get"})
}

export const reqOrderList = (page,limit) => {
    return requests({ url: `/order/auth/${page}/${limit}`, method: "get"})
}

