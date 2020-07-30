<template>
<div>
    <el-button type="primary" @click="add" >添加</el-button>
    <v-add :info="info" ref="adds"></v-add>
    <v-list @edit="edit"></v-list>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components: {
    vList,
    vAdd
},
data(){
return {
    info:{
        show:false,
        title:"秒杀添加",
        isAdd:true
    }
}
},
methods: {
      add(){
        this.info.show = true;
    },
    edit(uid){
        this.info.show = true;
        this.$refs.adds.gttersDetail(uid);
        this.info.title="秒杀修改",
        this.info.isAdd=false
    }
},
mounted(){},
}
</script>
<style scoped>
</style>