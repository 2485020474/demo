<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- <el-switch v-model="form.status"></el-switch> -->
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
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestManageAdd,
  requuestManageDetail,
  requuestManageUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      rolelist: "role/list",
      list: "manage/list",
    }),
  },
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestManageList: "manage/requestList",
      requestUserTotal: "manage/requestUserTotal",
    }),
    emay() {
      this.form = {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加
    add() {
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 重新请求
          this.requestManageList();
          // 弹框小时
          this.info.show = false;
          //清空内容
          this.emay();
          //重新请求总页数
          this.requestUserTotal();
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
    // 点击取消
    cancel() {
      this.info.show = false;
      this.emay();
    },
    //修改数据
    update() {
      // console.log(this.form);
      requuestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.emay();
          this.info.show = false;
          this.requestManageList();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取数据
    gttersDetail(uid) {
      requuestManageDetail({ uid: uid }).then((res) => {
        this.form = res.data.list;
      });
    },
  },
  mounted() {
    
    if (this.rolelist.length == "") {
      this.requestRoleList();
      
    }
  },
};
</script>
<style scoped>
</style>