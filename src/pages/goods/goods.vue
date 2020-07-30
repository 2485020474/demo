<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="adds"></v-add>
    <v-list @edit="edit"></v-list>
</div>
</template>
<script>
import vAdd from "./components/add"
import vList from "./components/list"
export default {
components: {
    vAdd,
    vList
},
data(){
return {
    info:{
        show:false,
        isAdd:true,
        title:"商品添加"
    }
}
},
methods: {
    add(){
        this.info.show=true;
    },
    edit(id){
        this.info.show=true;
        this.info.isAdd=true;
        this.info.title="商品编辑"
        this.$refs.adds.gttersDetail(id)
    }
},
mounted(){},
}
</script>
<style scoped>
</style>