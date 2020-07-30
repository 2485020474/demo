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
            title:"商品分类添加"
        }
    };
  },
  methods: {
    add() {
        this.info.show = true;
        this.info.isAdd =true

    },
    edit(id){
         this.info.isAdd =false;
         this.info.show = true;
         this.info.title="商品分类编辑";
        this.$refs.add.getDetail(id);
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>