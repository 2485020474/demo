<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth" prop="roleid">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
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
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
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
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: "用户名格式为4到16位（字母，数字，下划线，减号）",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message: "至少8-16个字符，至少1个大写字母，1个小写字母和1个数字",
            trigger: "blur",
          },
        ],
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
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
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
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          warningAlert("请按照格式填写");
          return false;
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
        } else {
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
    // 用户名正则
    usname() {
      if (!this.$reg.uPattern.test(this.form.username)) {
        this.$message({
          message: "用户名必须为4到16位（字母，数字，下划线，减号）",
          type: "warning",
        });
      }
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