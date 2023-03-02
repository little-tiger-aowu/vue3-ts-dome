import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component:() => import('../views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component:() => import('../views/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component:() => import('../views/home.vue'),
      children:[
        {
          path:'goods',
          name:'goods',
          meta:{
            title:'商品管理',
            isShow:true
          },
          component:() => import('@/views/goods/goods.vue')
        },
        {
          path:'user',
          name:'user',
          meta:{
            title:'用户管理',
            isShow:true
          },
          component:() => import('@/views/user/user.vue')
        },
        {
          path:'role',
          name:'role',
          meta:{
            title:'角色管理',
            isShow:true
          },
          component:() => import('@/views/role/role.vue')
        },
        {
          path:'test',
          meta:{
            title: '测试页面',
            isShow: true
          },
          component: ()=> import('@/views/test/test.vue')
        },
        {
         path:'gitTest' ,
          meta:{
           title: 'git测试',
            isShow: true
          },
          component: ()=> import('@/views/gitTest/index.vue')
        },
        {
          path:'authority',
          meta:{
            title:'权限分配',
            isShow: true
          },
          component:()=>import('@/views/Authority/index.vue')
        }
      ]
    },
  ]
})

export default router
