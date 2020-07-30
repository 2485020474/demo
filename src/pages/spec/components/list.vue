<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column  label="规格属性">
         <template slot-scope="scope">
             <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
         </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="clk"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { requestSpecDel } from "../../../util/request";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "spec/list",
      count: "spec/count",
      size: "spec/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestUserTotal:"spec/requestUserTotal",
      changePage:"spec/changePage"
    }),
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
          requestSpecDel({ id: id }).then((res) => {
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
    clk(a) {
      this.changePage(a);
      this.requestList();
      this.requestUserTotal();
    },
  },
  mounted() {
    this.requestList();
    this.requestUserTotal()
    console.log(this.count)
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 80px;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>