import { createRouter, createWebHistory } from 'vue-router'

import { layoutMiddleware } from '@/middleware/layoutMiddleware'

import { useUserStore } from '@/stores/user'

const routes = [
    /* { path: '/', redirect: '/account/profile' },
    { path: '/account/profile', component: () => import('./views/admin/AccountProfile.vue') },
    { path: '/account/setting', component: () => import('./views/admin/AccountSetting.vue') }, */

    /*
    { path: '/blog/posts', component: () => import('./views/admin/BlogPosts.vue') },
    { path: '/blog/post', component: () => import('./views/admin/BlogPost.vue') },

    { path: '/warehouse/sales', component: () => import('./views/admin/BlogSales.vue') },
    { path: '/warehouse/customers', component: () => import('./views/admin/BlogCustomers.vue') },
    { path: '/warehouse/products', component: () => import('./views/admin/BlogProducts.vue') },
    { path: '/warehouse/:notifications*', component: () => import('./views/admin/BlogNotifications.vue') },

    { path: '/customers/accounts', component: () => import('./views/admin/WarehouseProducts.vue') },
    { path: '/customer/account', component: () => import('./views/admin/WarehouseProducts.vue') },
    { path: '/customer/accout/users', component: () => import('./views/admin/WarehouseProducts.vue') },


    { path: '/blog/dashboard', component: () => import('./views/admin/BlogDashboard.vue') },

    */

    { path: '/login', name: 'AccessLogin', component: () => import('@/views/access/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const Auth = useUserStore()

    await Auth.initStore()

    if (to.path == '/exit') {
        Auth.removeToken()
    }

    if (Auth.user.isAuthenticated === true || Auth.user.isAuthenticated === 1) {

        to.meta.layout = 'AdminLayout'
        layoutMiddleware(to)

        if (to.path == '/login') {
            next('/')
        } else {
            next()
        }

    } else {
        to.meta.layout = 'AccessLayout'
        layoutMiddleware(to)

        if (! document.cookie && to.path !== '/login') {
            next('/login')
        } else {
            next()
        }
    }
})

export default router