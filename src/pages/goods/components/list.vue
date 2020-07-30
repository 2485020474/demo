<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="80"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPro+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="120">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="120">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
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
import { requestGoodsDel } from "../../../util/request";
import { successAlert,warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
      goodsList: "goods/list",
      count: "goods/count",
      size: "goods/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      requestUserTotal: "goods/requestUserTotal",
      changePage: "goods/changePage",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    clk(a) {
      this.changePage(a);
      this.requestList();
      this.requestUserTotal();
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestGoodsDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.requestList();
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
  },
  mounted() {
    this.requestList();
    this.requestUserTotal();
    // this.changePage()
  },
};
</script>
<style scoped>
img {
  height: 80px;
}
</style>