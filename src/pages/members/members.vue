<template>
<div>
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
        title:"会员编辑"
    }
}
},
methods: {
    edit(uid){
        this.info.show = true;
        this.$refs.adds.gttersDetail(uid);
    }
},
mounted(){},
}
</script>
<style scoped>
</style>