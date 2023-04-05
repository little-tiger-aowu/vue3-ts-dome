import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../views/login.vue')
        },
        {
            path: '/index.vue',
            name: 'index',
            component: () => import('../views/index.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/home.vue'),
            children: [
                {
                    path: 'goods',
                    name: 'goods',
                    meta: {
                        title: '商品管理',
                        isShow: true
                    },
                    component: () => import('@/views/goods/goods.vue')
                },
                {
                    path: 'user',
                    name: 'user',
                    meta: {
                        title: '用户管理',
                        isShow: false
                    },
                    component: () => import('@/views/user/user.vue')
                },
                {
                    path: 'role',
                    name: 'role',
                    meta: {
                        title: '角色管理',
                        isShow: false
                    },
                    component: () => import('@/views/role/role.vue')
                },
                {
                    path: 'test',
                    meta: {
                        title: '选择器',
                        isShow: true
                    },
                    component: () => import('@/views/test/test.vue')
                },
                {
                    path: 'gitTest',
                    meta: {
                        title: '富文本编辑器',
                        isShow: true
                    },
                    component: () => import('@/views/gitTest/index.vue')
                },
                {
                    path: 'authority',
                    meta: {
                        title: '权限分配',
                        isShow: true
                    },
                    component: () => import('@/views/Authority/index.vue')
                },
                {
                    path: 'ECharts',
                    meta: {
                        title: 'ECharts图表',
                        isShow: true
                    },
                    component: () => import('@/views/ECharts/index.vue'),
                },
                {
                    path: 'map1',
                    meta: {
                        title: 'ECharts',
                        isShow: false
                    },
                    component: () => import('@/views/map/index.vue'),
                },
                {
                    path: 'map',
                    meta: {
                        title: 'ECharts中国地图',
                        isShow: true
                    },
                    component: () => import('@/views/map/map2.vue'),
                    children: [
                        {
                            path: 'map',
                            meta: {
                                title: 'ECharts中国地图',
                                isShow: false
                            },
                            component: () => import('@/views/map/map2.vue'),
                        },
                        {
                            path: "map1",
                            meta: {
                                title: 'ECharts中国地图1',
                                isShow: false
                            },
                            component: () => import('@/views/map/index.vue')
                        },
                    ]
                },
                {
                    path: 'photo',
                    meta: {
                        title: '图片裁剪',
                        isShow: true
                    },
                    component: () => import('@/views/pictureCropping/index.vue')
                },
                {
                    path: 'canvas',
                    meta: {
                        title: 'canvas',
                        isShow: true
                    },
                    component: () => import('@/views/canvas/index.vue')
                },
                {
                    path: 'waterfall',
                    meta: {
                        title: '瀑布流',
                        isShow: true
                    },
                    component: () => import('@/views/waterfall/index.vue')
                },
                {
                    path: 'Music',
                    meta: {
                        title: '音乐播放效果',
                        isShow: true
                    },
                    component: () => import('@/views/music/index.vue')
                },
                {
                    path: 'dev',
                    meta: {
                        title: 'dev',
                        isShow: true
                    },
                    component: () => import('@/views/dev/index.vue')
                }
            ]
        },
    ]
})

export default router
