<template>
  <div>
    <el-table :data="seckaList" style="width: 100%" row-key="id"  border
      >
      <el-table-column prop="title" label="活动名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { requestSeckDel } from "../../../util/request";
export default {
  components: {},
  computed: {
    ...mapGetters({
      seckaList: "secka/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "secka/requestList",
    }),
    // 点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestSeckDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.requestList();
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
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
img{
    width: 100px;
    height: 80px;
}
</style>