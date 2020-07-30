// 引入
import {requestMenuList} from "../../util/request"

const state ={
    // 列表数据
    list:[]
}

const mutations={
    // 修改list
    //state 当前仓库状态集合 就是上边state里的东西
    //arr从数据库就是传过来的值
    changeList(state,arr){
        state.list = arr
       
    }
}

const actions ={
    // context是当前仓库本身，但是不能修改
    requestList(context){
        requestMenuList({istree:true}).then((res)=>{
            //第二个参数就是传给mutations 的arr
            context.commit("changeList",res.data.list)
        })
    }
}
const getters ={
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}
