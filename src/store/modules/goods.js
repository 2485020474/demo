// 引入
import { requestGoodsList,requestGoodsCount } from "../../util/request"

const state = {
    // 列表数据
    list: [],
    // 总数量
    count: 1,
    //一页数量
    size:4,
    //当前页码
    page:1
}

const mutations = {
    // 修改list
    //state 当前仓库状态集合 就是上边state里的东西
    //arr从数据库就是传过来的值
    changeList(state, arr) {
        state.list = arr

    },
    //商品总的数量
    changeTotal(state, num) {
        state.count = num

    },
    changePage(state,page){
        state.page=page
    }
}
const actions = {
    // context是当前仓库本身，但是不能修改
    //获取商品列表
    requestList(context) {
        const params ={
            page:context.state.page,
            size:context.state.size
        }
        requestGoodsList(params).then((res) => {
            //第二个参数就是传给mutations 的arr
            context.commit("changeList", res.data.list)
        })
    },
    // 获取总的
    requestUserTotal(context) {
        requestGoodsCount().then((res) => {
            //第二个参数就是传给mutations 的arr
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    // 修改页码
    changePage(context,page){
        context.commit("changePage",page)
    }
}
const getters = {
    list(state) {
        return state.list
    },
    count(state){
        return state.count
    },
    size(state){
        return state.size
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}
