<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {requestMemberInfo,requestMemberDdit} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      membersList:"members/list"
    }),
  },
  data() {
    return {
      form: {
       
        nickname: "",
        phone: 1,
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
         requestList:"members/requestList"
    }),
    emay() {
      this.form = {
        nickname: "",
        phone: 1,
        password: "",
        status: 1,
      };
    },
    // 点击取消
    cancel() {
      this.info.show = false;
      this.emay();
    },
    //修改数据
    update() {
      requestMemberDdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.emay();
          this.info.show = false;
          this.requestList();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取数据
    gttersDetail(uid) {
        console.log(this.membersList)
      requestMemberInfo({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.uid=uid
      });
    },
  },
  mounted() {
       this.requestList();
  },
};
</script>
<style scoped>
</style>