import Vue from 'vue'
import Router from 'vue-router'
import seore from "../store/index"
import store from '../store/index'

Vue.use(Router)
function havePower(url) {

    return store.state.user.menus_url.some(i=>i==url)

}


let router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login.vue")
    },
    {
      path: "/index",
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: "home",
          component: () => import("../pages/home/home.vue"),

        },
        {
          path: "menu",
          component: () => import("../pages/menu/menu.vue"),
          name: "菜单列表",
          beforeEnter(to,from,next){
            havePower("/index/menu")?next():next("/index/home")
          }
        },
        {
          path: "role",
          component: () => import("../pages/role/role.vue"),
          name: "角色列表",
          beforeEnter(to,from,next){
            havePower("/index/role")?next():next("/index/home")
          }
        },
        {
          path: "manage",
          component: () => import("../pages/manage/manage.vue"),
          name: "管理员列表",
          beforeEnter(to,from,next){
            havePower("/index/manage")?next():next("/index/home")
          }
        },
        {
          path: "cate",
          component: () => import("../pages/cate/cate.vue"),
          name: "商品分类",
          beforeEnter(to,from,next){
            havePower("/index/cate")?next():next("/index/home")
          }
        },
        {
          path: "spec",
          component: () => import("../pages/spec/spec.vue"),
          name: "商品规格",
          beforeEnter(to,from,next){
            havePower("/index/spec")?next():next("/index/home")
          }
        },
        {
          path: "members",
          component: () => import("../pages/members/members.vue"),
          name: "会员管理",
          beforeEnter(to,from,next){
            havePower("/index/members")?next():next("/index/home")
          }
        },
        {
          path: "goods",
          component: () => import("../pages/goods/goods.vue"),
          name: "商品管理",
          beforeEnter(to,from,next){
            havePower("/index/goods")?next():next("/index/home")
          }
        },
        {
          path: "banner",
          component: () => import("../pages/banner/banner.vue"),
          name: "轮播图管理",
          beforeEnter(to,from,next){
            havePower("/index/banner")?next():next("/index/home")
          }
        },
        {
          path: "secka",
          component: () => import("../pages/secka/secka.vue"),
          name: "秒杀活动",
          beforeEnter(to,from,next){
            havePower("/index/secka")?next():next("/index/home")
          }
        }

      ]
    },
    {
      path: "/",
      redirect: "/index"
    }
  ]
})

// 登录拦截
router.beforeEach((to, from, next) => {
  // 如果前往的是登录，next
  if (to.path == "/login") {
    next();
    return;
  }

  // 如果不是就判断store.user 
  if (seore.state.user) {
    next();
    return;
  }
  next("/login")


})

export default router