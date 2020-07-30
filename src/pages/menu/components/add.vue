<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="--请选择--" disabled :value="55"></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option v-for="item in lisurl" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="unDate" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestMenuAdd,
  requestMenuDetail,
  requestMenuEdit
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  data() {
    return {
      form: {
        id: 0,
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      //图标集合
      icons: ["el-icon-setting", "el-icon-goods"],
      //路由集合
      lisurl: ["/index/menu", "/index/role", "/index/manage", "/index/cate", "/index/spec", "/index/goods", "/index/members","/index/banner","index/secka"],
      dialogTableVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions({
      request: "menu/requestList"
    }),

    // 重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    add() {
      // 添加成功
      this.info.show = false;
      requestMenuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          // 弹出成功
          successAlert(res.data.msg);
          // 重置
          this.empty();
          // 重新请求/刷新
          this.request();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.info.show = false;
      // console.log(this.info.isAdd)
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    getDetail(id) {
      requestMenuDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    unDate() {
      requestMenuEdit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.request();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>