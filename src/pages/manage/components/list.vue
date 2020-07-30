<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="size" @current-change="clk"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requuestManageDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      count:"manage/count",
      size:"manage/size",
      
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestUserTotal:"manage/requestUserTotal",
      changePage:"manage/changePage"
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(id) {

        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            requuestManageDel({ uid: id }).then((res) => {
              if (res.data.code == 200) {
                successAlert("删除成功");
                // 重新请求页面
                this.requestList();
                // 重新获取页码
                this.requestUserTotal();
              } else {
                warningAlert(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      
    },
    clk(a){
      this.changePage(a);
      this.requestList();
      this.requestUserTotal();
    }
  },
  mounted() {
    this.requestList();
    this.requestUserTotal()
  },
};
</script>
<style scoped>
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>