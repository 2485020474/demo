import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { state,mutations,getters } from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import cate from "./modules/cate"
import spec from "./modules/spec"
import members from "./modules/members"
import goods from "./modules/goods"
import banner from "./modules/banner"
import secka from "./modules/secka"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        spec,
        members,
        goods,
        banner,
        secka
        
    }
})