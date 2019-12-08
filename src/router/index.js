import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes:[{
    path: '/',
    redirect:'/author'
  },
    {
      path: '/resgin',
      component: resolve => require(['@/pages/public/resgin.vue'], resolve),
    },
    {
      path: '/yijian',
      component: resolve => require(['@/pages/public/yijian.vue'], resolve)
    },
    {
      path: '/changepsw',
      component: resolve => require(['@/pages/public/changepsw.vue'], resolve)
    },
    {
      path: '/author',
      component: resolve => require(['@/pages/public/author.vue'], resolve)
    },
    {
      path: '/person',
      component: resolve => require(['@/pages/public/person.vue'], resolve)
    },
    {
      path: '/pay',
      component: resolve => require(['@/pages/public/pay.vue'], resolve)
    },
    {
      path: '/qishou_money',
      component: resolve => require(['@/pages/qishou/qishou_money.vue'], resolve)
    },
    {
      path: '/qishou_index',
      component: resolve => require(['@/pages/qishou/qishou_index.vue'], resolve)
    },
    {
      path: '/shop_index',
      component: resolve => require(['@/pages/shop/shop_index.vue'], resolve)
    },
    {
      path: '/shop_money',
      component: resolve => require(['@/pages/shop/shop_money.vue'], resolve)
    },
    {
      path: '/shoplist',
      component: resolve => require(['@/pages/public/shoplist.vue'], resolve)
    }
  ]
})