import { createRouter, createWebHistory } from 'vue-router'

import {loadLayoutMiddleware} from '@/middleware/loadLayoutMiddleware'

import { useUserStore } from '@/stores/user'

const routes = [
    { path: '/', redirect: 'eshop/dashboard' },
    /*{ path: '/eshop/dashboard', component: () => import('./views/admin/EshopDashboard.vue') },
    { path: '/eshop/sales', component: () => import('./views/admin/EshopSales.vue') },
    { path: '/eshop/customers', component: () => import('./views/admin/EshopCustomers.vue') },
    { path: '/eshop/products', component: () => import('./views/admin/EshopProducts.vue') },
    { path: '/eshop/:notifications*', component: () => import('./views/admin/EshopNotifications.vue') },
    { path: '/warehouse/products', component: () => import('./views/admin/WarehouseProducts.vue') },
    { path: '/warehouse/categories', component: () => import('./views/admin/WarehouseProducts.vue') },
    { path: '/warehouse/brands', component: () => import('./views/admin/WarehouseProducts.vue') },
    { path: '/member/feeds', component: () => import('./views/admin/MemberFeeds.vue') },
    { path: '/account/setting', component: () => import('./views/admin/AccountSetting.vue') },
    { path: '/exit', component: () => import('./views/admin/AccountSetting.vue') }, */

    { path: '/exit', redirect: '/login' },
    { path: '/login', name: 'AccessLogin', component: () => import('@/views/access/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => { //
    const store = useUserStore()
    //
    await store.initStore() // Make sure the user state is initialized.

    // Now, you can access the user's role and perform authorization checks.

    /* if (to.path === '/exit') {
        store.user.removeToken
    } */

    if (store.user.isAuthenticated === true) {
        to.meta.layout = 'AdminLayout'
        loadLayoutMiddleware(to)

        next()

    } else {
        store.user.removeToken

        to.meta.layout = 'AccessLayout'
        loadLayoutMiddleware(to)

        if (! document.cookie && to.path !== '/login') {
            next('/login')
        } else {
            next()
        }
    }

})

export default router