import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from "@/pages/home/Home.vue"
import Login from "@/pages/login/index.vue"
import Register from "@/pages/register/index.vue"
import Search from "@/pages/search/index.vue"
import Detail from '@/pages/detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue'
import MyOrder from '@/pages/Center/myOrder.vue';
import OtherOrder from '@/pages/Center/otherOrder.vue';

import user from '@/store/user'
import { reqUserInfo } from '@/api'

let orginPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, res, rej) {
    if (res && rej) {
        orginPush.call(this, location, res, rej)
    } else {
        orginPush.call(this, location, () => { }, () => { })
    }
}

Vue.use(VueRouter)

let router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    },
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            path: "/login",
            component: Login,
            meta: { show: true }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: "/search/:keyword?",
            name: "search",
            component: Search,
            meta: { show: true },
        },
        {
            path: "/detail/:goodsId?",
            name: "detail",
            component: Detail,
            meta: { show: true },
        },
        {
            path: "/AddCartSuccess/:id?/:num?",
            name: "addSuccess",
            component: AddCartSuccess,
            meta: { show: false },
        },
        {
            path: "/shopCart",
            name: "shopcart",
            component: ShopCart,
            meta: { show: true },
        },
        {
            path: "/trade",
            name: "trade",
            component: Trade,
            meta: { show: true },
        },
        {
            path: "/pay",
            name: "pay",
            component: Pay,
            meta: { show: true },
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: "/paysuccess",
            name: "paysuccess",
            component: PaySuccess,
            meta: { show: true },
            beforeEnter(to, from, next) {
                if (from.path == '/pay') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: "/center",
            component: Center,
            meta: { show: true },
            children: [
                {
                    path: "myOrder",
                    component: MyOrder,
                    meta: { show: true },
                },
                {
                    path: "otherOrder",
                    component: OtherOrder,
                    meta: { show: true },
                },
                {
                    path: "",
                    component: MyOrder,
                    meta: { show: true },
                },
            ]
        },
    ]
})


router.beforeEach(async (to, from, next) => {
    if (user.state.token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            if (user.state.userInfo.name) {
                next()
            } else {
                let res = await reqUserInfo()
                if (res.code == 200) {
                    user.state.userInfo = res.data
                }
                next()
            }
        }
    } else {
        let toPath = to.path
        if (to.path == '/pay' || to.path == '/paysuccess' || to.path == '/center' || to.path == '/trade') {
            next('login?redirect=' + toPath)
        }
        next()
    }
})

export default router