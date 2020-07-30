<template>
<div>
    <el-button type="primary" @click="add" >添加</el-button>
    <v-add :info="info" ref="adds"></v-add>
    <v-list @edit="edit" ></v-list>
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
        title:"管理员添加",
        isAdd:true
    }
}
},
methods: {
    add(){
        this.info.show = true;
    },
    edit(id){
        this.info.show = true;
        this.info.title="管理员编辑";
        this.$refs.adds.getDetail(id);
        this.info.isAdd=false
    }
},
mounted(){},
}
</script>
<style scoped>
</style>