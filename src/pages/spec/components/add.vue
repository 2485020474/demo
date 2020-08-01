<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item,index) in attrArr"
          :key="index"
        >
          <el-input v-model="item.value" autocomplete="off"></el-input>
          <el-button type="primary" v-if="index==0" @click="pus">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delArr">删除</el-button>
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
        <el-button type="primary" @click="Update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestSpecDetail,
  requestSpecUpdate,
  requestSpecAdd,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
      //商品规格属性
      attrArr: [
        {
          value: "",
        },
      ],
      formLabelWidth: "80px",
    };
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
    }),
    pus() {
      this.attrArr.push({
        value: "",
      });
    },
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    cancel() {
      this.info.show = false;
    },
    // 重置内容
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    //点击添加
    add(form) {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      this.$refs[form].validate((valid) => {
        if (valid) {
          requestSpecAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.empty();
              this.cancel();
              this.requestList();
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
    //获取数据
    getDetail(id) {
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => {
          return {
            value: item,
          };
        });
      });
    },

    //修改
    Update() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("输入框不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecUpdate(this.form).then((res) => {
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
  mounted() {},
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>