import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Layout from './views/layout/index.vue'


Vue.use(Router)

/**
 * hidden:true          如果hidden为true则在左侧菜单栏展示，
 * 否则不显示
 * name:'router-name'   路由名称，必须填写
 * meta：{
 *    title:'title'     对应路由在左侧菜单栏的标题名称
 *    icon:'icon-class' 对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
 * }
 */

export const asyncRouterMap = [
  {
    path:'/',
    name:'dashboard',
    component:Layout,
    hidden:true,
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        meta:{title:'首页',icon:'fa fa-home'},
        component:() => import('@/views/Home.vue')
      }
    ]
  },
  {
    path:'/dataManage',
    name:'dataManage',
    hidden:true,
    meta:{title:'数据管理',icon:'fa fa-database'},
    component:Layout,
    redirect:'/tableData',
    children:[
      {
        path:'/tableData',
        name:'tableData',
        meta:{title:'表格管理',icon:'fa fa-table'},
        component:() => import('@/views/dataManage/tableData.vue')
      },
      {
        path:'/charsData',
        name:'charsData',
        meta:{title:'图表管理',icon:'fa fa-bar-chart'},
        component:() => import('@/views/dataManage/charsData.vue')
      },
      {
        path:'/formData',
        name:'formData',
        meta:{title:'表单管理',icon:'fa fa-file-text-o'},
        component:() => import('@/views/dataManage/formData.vue')
      }
    ]
  },
  {
    path:'/userManage',
    name:'userManage',
    component:Layout,
    hidden:true,
    redirect:'/accountData',
    children:[
      {
        path:'/accountData',
        name:'accountData',
        meta:{title:'账户管理',icon:'fa fa-user-plus'},
        component:() => import('@/views/userManage/accountData.vue')
      }
    ]
  },
  {
    path:'/user',
    component:Layout,
    hidden:false,
    redirect:'/userInfo',
    children:[
      {
        path:'/userInfo',
        name:'userInfo',
        meta:{title:'个人中心'},
        component:() => import('@/views/userManage/userInfo.vue')
      }
    ]
  },
  {
    path:'/404',
    name:'404',
    hidden:false,
    meta:{title:'404'},
    component:() =>import('@/views/404.vue')
  },
  {
    path:'*',
    redirect:'/404'
  },
  {
    path: '/login',
    name: 'login',
    hidden:false,
    meta:{title:'系统登录'},
    //按需加载
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    hidden:false,
    meta:{title:'找回密码'},
    //按需加载
    component: () => import('@/views/login/Password.vue')
  }
]

const router:any = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:asyncRouterMap
  //  [
  //   {
  //     path: '/',
  //     name: 'layout',
  //     component: Layout
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     //按需加载
  //     component: () => import('@/views/login/Login.vue')
  //   },
  //   {
  //     path: '/password',
  //     name: 'password',
  //     //按需加载
  //     component: () => import('@/views/login/Password.vue')
  //   }
  // ]
})

//路由拦截
router.beforeEach((to:any,from:any,next:any)=>{
  const isLogin = localStorage.tsToken ? true : false
  if(to.path =='/login'||to.path=='/password'){
    next()
  }else{
    isLogin ? next() :next('/login')
  }
})
export default router