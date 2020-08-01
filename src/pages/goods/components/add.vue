<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEdited">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst()">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secendCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImage"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品规格 -->
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changes()">
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option v-for="item in secendSpecArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="desc"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestGoodsAdd,
  requestGoodsDetial,
  requestGoodsUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      //分类列表
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  data() {
    return {
      // 用来存放二级分类
      secendCateArr: [],
      //用来存放商品规格属性
      secendSpecArr: [],
      imgUrl: "",
      editor: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
      formLabelWidth: "120px",
      rules: {
        first_cateid: [{ required: true, message: "请选择一级分类", trigger: "change" }],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      requestSpecList: "spec/requestList",
      requestGoodsList: "goods/requestList",
      requestUserTotal: "goods/requestUserTotal",
      changePage: "goods/changePage",
    }),
    //保存二级分类
    changeFirst(bool) {
      // list里的每一项和选中的哪一项的id进行对比，并且返回下标
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      //把对应下标的children 放到secendCateArr中

      this.secendCateArr = this.cateList[index].children;
      // 调用这个方法，如果传了true 就不置空
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //商品规格发生了改变
    changes(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );

      this.secendSpecArr = this.specList[index].attrs;
      // 调用这个方法，如果传了true 就不置空
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    emay() {
      (this.editor = null),
        // 用来存放二级分类
        (this.secendCateArr = []),
        //用来存放商品规格属性
        (this.secendSpecArr = []),
        (this.imgUrl = ""),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: "",
          market_price: "",
          img: null,
          description: "",
          specsid: "",
          specsattr: "",
          isnew: 1,
          ishot: 1,
          status: 1,
        });
    },
    //添加
    add(form) {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      this.$refs[form].validate((valid) => {
        if (valid) {
          requestGoodsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              // 重新请求
              this.requestGoodsList();
              // 弹框小时
              this.info.show = false;
              //清空内容
              this.emay();
              //重新请求总页数
              this.requestUserTotal();
              this.changePage();
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
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.emay();
          this.info.show = false;
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取数据
    gttersDetail(id) {
      requestGoodsDetial({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPro + this.form.img;
        this.changeFirst(true);
        this.changes(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },
    //图片发生修改
    changeImage(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 创建编辑器
    createEdited() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    this.requestSpecList(true);
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>