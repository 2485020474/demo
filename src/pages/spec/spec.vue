<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info:{
        show:false,
        isAdd:true,
        title:"规格添加"
      }
    };
  },
  methods: {
    add(){
      this.info.show=true;
    },
    edit(id){
      this.info.show=true;
      this.info.title="规格编辑";
      this.info.isAdd=false;
      this.$refs.add.getDetail(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>