<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 弹窗 -->
    <v-add :info=info ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
</div>
</template>
<script>
// import { requestMenuAdd } from "../../util/request"
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
components: {
    vAdd,
    vList
},
data(){
return {
    //定义弹框的状态
    info:{
        show:false,
        title:"添加菜单",
        isAdd:true
    }
}
},
methods: {
    // 点击添加
    add(){
        this.info.show = true
        this.info.title="添加菜单"
        // requestMenuAdd(this.info)
        this.info.isAdd=true
    },
    // 点击了编辑
    edit(id){
        this.info.show = true
        this.$refs.add.getDetail(id)
        this.info.title="编辑菜单"
         this.info.isAdd=false
    }
    
},
mounted(){},
}
</script>
<style scoped>
</style>