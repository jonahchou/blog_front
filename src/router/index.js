import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/index',
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/index',
                name: "index",
                component:()=>import('@/views/index')
            },
            {
                path: '/XiangQing',
                name: "XiangQing",
                component:()=>import('@/views/XiangQing')
            }
        ]
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router;