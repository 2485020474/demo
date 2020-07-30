<template>
<div>
    <el-button type="primary" @click="add" >添加</el-button>
        <!-- 弹窗 -->
    <v-add :info="info" ref="adds"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
</div>
</template>
<script>
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
components: {
    vAdd,
    vList
},
data(){
return {
    info:{
        show:false,
        title:"添加角色",
        isAdd:true
    },
    
}
},
methods: {
    add(){
        this.info.show = true;
        this.info.isAdd=true
        this.info.title="添加角色";
    },
    //点击编辑
    edit(id){
        this.info.show = true;
        this.info.title="编辑角色";
        this.$refs.adds.getDetail(id);
        this.info.isAdd=false
    }
},
mounted(){},
}
</script>
<style scoped>
</style>