<template>
  <div>
    <el-table :data="membersList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="count" :page-size="size" @current-change="clk"></el-pagination> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
     membersList:"members/list"
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList:"members/requestList"
    }),
    edit(uid) {
      this.$emit("edit", uid);

    }
  },
  mounted() {
    this.requestList();

  },
};
</script>
<style scoped>
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>