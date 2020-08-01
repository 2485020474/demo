<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :default-checked-keys="skey"
            highlight-current
            :props="defaultProps"
          ></el-tree>
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
        <el-button type="primary" @click="Update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdtte,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      //提交给后端的数据
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
      skey: [],
      formLabelWidth: "120px",
      //树形结构

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      requeMenuList: "menu/requestList",
      requestList: "role/requestList",
    }),
    cancel() {
      this.info.show = false;
      this.empty();
    },

    // 重置内容
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.skey = this.$refs.tree.setCheckedKeys([]);
    },
    //点击添加
    add() {
      if (this.form.rolename.length != 0) {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        //   console.log(this.form);
        requestRoleAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.empty();
            this.cancel();
            this.requeMenuList();
            this.requestList();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }else{
        warningAlert("请确保输入框不能为空");
      }
      //    获取tree的key赋值
    },
    //获取数据
    getDetail(id) {
      requestRoleDetail({ id: id }).then((res) => {
        // this.empty()
        this.skey = JSON.parse(res.data.list.menus);
        // console.log(res.data.list.menus)
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    //修改
    Update() {
      //    获取tree的key赋值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdtte(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.requeMenuList.length == 0) {
      this.requeMenuList();
    }
  },
};
</script>
<style scoped>
</style>