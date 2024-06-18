import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

const routes = [/*
    { path: '/', redirect: 'eshop/dashboard' },
    { path: '/eshop/dashboard', component: () => import('./views/admin/EshopDashboard.vue') },
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
    { path: '/', name: 'Login', component: () => import('./views/access/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const store = useUserStore()
    //
    await store.initStore() // Make sure the user state is initialized.

    // Now, you can access the user's role and perform authorization checks.

    // You can implement your authorization logic here.
    // For example, check if the userRole has access to the route.
    // You can also handle cases like redirecting to a login page if not authenticated.

    // For simplicity, let's assume all users can access all routes.
    // Replace this with your actual authorization logic.

    if (store.user.role !== null) {
        next()// Allow navigation.
    } else {
        next('/login')
    }
})

export default router