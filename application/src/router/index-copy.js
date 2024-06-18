import {createRouter, createWebHistory} from 'vue-router'

import {loadLayoutMiddleware} from "../middleware/loadLayoutMiddleware";

import DefaultLayout from '../views/layout/DefaultLayout.vue'
import AdminLayout from '../views/layout/AdminLayout.vue'

const routes = [
    { path: '/', name: 'Default', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/home.html', name: 'DefaultHome', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/about.html', name: 'DefaultAbout', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Blog.vue')},
    { path: '/blog.html', name: 'DefaultBlog', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Blog.vue')},
    { path: '/post.html', name: 'DefaultPost', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Blog.vue')},
    { path: '/catalog.html', name: 'DefaultCatalog', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Catalog.vue')},
    { path: '/product.html', name: 'DefaultProduct', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/cart.html', name: 'DefaultCart', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/delivery.html', name: 'DefaultDelivery', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/payment.html', name: 'DefaultPayment', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/completed.html', name: 'DefaultCompleted', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/account.html', name: 'DefaultAccount', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},
    { path: '/contact.html', name: 'DefaultContact', meta: {layout: 'DefaultLayout'}, component: () => import('../views/default/Home.vue')},

    /* {
        path: '/admin',
        name: 'Admin',
        component: AdminLayout,
        meta: {layout: 'AdminLayout'},
        children: [
            { path: '', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'dashboard', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'products', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'categories', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'brands', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'account', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
            { path: 'settings', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') }
        ]
    }, */
    { path: '/admin', name: 'Admin', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/dashboard', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/products', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/categories', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/brands', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/account', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') },
    { path: '/admin/settings', name: 'AdminDashboard', meta: {layout: 'AdminLayout'}, component: () => import('../views/admin/Dashboard.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Before route loaded
/* router.beforeEach((to, from) => {
    //console.log(`afterEach: ${from.path} to ${to.path}`)
}) */
router.beforeEach(loadLayoutMiddleware)

// After route loaded, before navigation
/* router.beforeResolve((to, from) => {
    console.log(`afterEach: ${from.path} to ${to.path}`)
    console.log(to.name)
}) */

// After navigation once route is loaded
/* router.afterEach((to, from) => {
    //console.log(`afterEach: ${from.path} to ${to.path}`)
}) */

export default router