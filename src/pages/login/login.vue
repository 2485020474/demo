<template>
  <div class="cont">
    <div class="login_bgc">
      <form action>
        <h1>登录</h1>
        <div>
          <el-input placeholder="请输入内容" v-model="form.username" clearable></el-input>
        </div>
        <div>
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </div>
        <div>
          <el-button type="primary" plain @click="change">登录</el-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { requuestManageLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
        changeUser:"changeUser"
    }),
    change() {
      requuestManageLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // vuex保存了用户信息
          
          this.changeUser(res.data.list)
          this.$router.push("/index/home")
          
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login_bgc {
  width: 400px;
  height: 300px;
  background-color: #fff;
  margin: 150px auto;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px 50px;
}
.cont {
  background-image: linear-gradient(to right, #553443, #2f3d60);
  height: 100vh;
  overflow: hidden;
}
.login_bgc h1 {
  text-align: center;
  font-size: 30px;
}
form {
  width: 100%;
  height: 100%;
}
.login_bgc form > div {
  margin: 20px 0;
}
.login_bgc form > div button {
  width: 100%;
}
</style>