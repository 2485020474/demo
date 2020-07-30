import axios from "axios"
import qs from "qs"
// import { config } from "vue/types/umd"
import store from "../store"
import {warningAlert} from "./alert"
import router from "../router/index"

axios.interceptors.request.use(config=>{
    if (config.url != baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.user.token;
    }
    return config
})


axios.interceptors.response.use(res => {
    if(res.data.msg==="登录已过期或访问权限受限"){
        warningAlert("登录已过期或访问权限受限")
        router.push("/login");
        return;
    }
    return res;
})

const baseUrl = "/api"
//菜单添加
export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//获取菜单列表

export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

//获取一个菜单
export const requestMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: params
    })
}

//编辑菜单
export const requestMenuEdit = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//菜单删除
export const requestMenuDel = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}

//添加角色
export const requestRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}

// 角色列表
export const requestRoleList = (params) => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
        params
    })
}

//角色获取一条
export const requestRoleDetail = (params) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params
    })
}

//角色修改

export const requestRoleUpdtte = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//角色删除

export const requestRoleDel = (params) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}

// 管理员添加
export const requestManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

// 管理员总数
export const requuestManageCont = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}

//管理员列表
export const requuestManageUserlist = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}

//管理员单条数据
export const requuestManageDetail = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: params
    })
}

// 管理员修改

export const requuestManageUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}
// 管理员删除
export const requuestManageDel = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员登录
export const requuestManageLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品添加
export const requestCateAdd = (params) => {
    //解决数据中有文件的问题
    //通过FormData构造函数创建一个空对象
    var formData = new FormData()
    for (let i in params) {
        //可以通过append()方法来追加数据
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}

//获取商品列表

export const requestCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}

//获取一个商品
export const requestCateDetail = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: params
    })
}

//编辑商品
export const requestCateEdit = (params) => {
    //解决数据中有文件的问题
    //通过FormData构造函数创建一个空对象
    var formData = new FormData()
    for (let i in params) {
        //可以通过append()方法来追加数据
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: formData
    })
}

//商品删除
export const requestCateDel = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//规格添加
export const requestSpecAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//规格列表
export const requestSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params
    })
}

//规格总数
export const requestSpecCont = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//规格一条
export const requestSpecDetail = (params) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params
    })
}

//规格修改
export const requestSpecUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//规格删除
export const requestSpecDel = (params) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品添加
export const requestGoodsAdd = (params) => {
    //解决数据中有文件的问题
    //通过FormData构造函数创建一个空对象
    let formData = new FormData();
    for (var i in params) {
        //可以通过append()方法来追加数据
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}

//商品列表查询（分页）
export const requestGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params
    })
}

//商品列表查询（yit一条）
export const requestGoodsDetial = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}

//商品列表修改
export const requestGoodsUpdate = (params) => {
    //解决数据中有文件的问题
    //通过FormData构造函数创建一个空对象
    let formData = new FormData();
    for (var i in params) {
        //可以通过append()方法来追加数据
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}

//商品列表总数
export const requestGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get"
    })
}

//商品列表删除
export const requestGoodsDel = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data:qs.stringify(params)
    })
}







//会员列表
export const requestMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}

//会员一条
export const requestMemberInfo = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params
    })
}

// 会员修改
export const requestMemberDdit = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}


//轮播图添加
export const requestBnnerAdd = (params) => {
    var formData= new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formData
    })
}


//轮播图列表
export const requestBnnerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
//轮播图修改
export const requestBnnerEdit = (params) => {
    var formData= new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: formData
    })
}

//轮播图一条
export const requestBnnerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}

//轮播图一条
export const requestBnnerDel = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data:qs.stringify(params)
    })
}



//秒杀列表
export const requestSeckList = (params) => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
        params
    })
}

//秒杀添加
export const requestSeckAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data:qs.stringify(params)
    })
}
//秒杀修改
export const requestSeckEdit = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data:qs.stringify(params)
    })
}
//秒杀查询一条
export const requestSeckDetail = (params) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}
//秒杀删除
export const requestSeckDel = (params) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data:qs.stringify(params)
    })
}


