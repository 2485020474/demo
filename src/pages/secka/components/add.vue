<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst()">
            <el-option
              v-for="item in Catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeTwo()">
            <el-option
              v-for="item in CateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 三级分类 -->
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in secendSpecArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { requestSeckAdd, requestSeckDetail,requestSeckEdit,requestGoodsList} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      // 一级列表
      Catelist: "cate/list",
      GoodsList: "goods/list",
    }),
  },
  data() {
    return {
      formLabelWidth: "80px",
      time: [],
      //   存放二级目录分类
      CateArr: [],
      //存放三级目录分类
      secendSpecArr: [],
      //提交给后端的数据
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      // 分类一级列表
      requestCateList: "cate/requestList",
      requestBannerList: "banner/requestList",
      requestGoodsList: "goods/requestList",
      requestSeckaList: "secka/requestList",
    }),
    cancel() {
      this.info.show = false;
      this.empty();
    },
    // 重置内容
    empty() {
      (this.time = []),
        //   存放二级目录分类
        (this.CateArr = []),
        //存放三级目录分类
        (this.secendSpecArr = []),
        //提交给后端的数据
        (this.form = {
          title: "",
          begintime: "",
          endtime: "",
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1,
        });
    },
    //点击添加
    add() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
      requestSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestSeckaList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取数据
    gttersDetail(id) {
      requestSeckDetail({ id: id }).then((res) => { 
        this.form = res.data.list;
        this.form.id = id;
        let begintimes = new Date(Number(res.data.list.begintime))
        let endtimes = new Date(Number(res.data.list.endtime))
        this.time= [begintimes,endtimes]
        this.changeFirst(true);
        this.changeTwo(true);
        
      });
    },
    //修改
    Update() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
      requestSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.requestSeckaList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 一级分类修改
    changeFirst(bool) {
      let index = this.Catelist.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.CateArr = this.Catelist[index].children;
      if(!bool){
          this.form.second_cateid = "";
      }
    },
    // 二级分类修改
    changeTwo(bool) {
      requestGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.secendSpecArr = res.data.list;
        
      });
      if(!bool){
          this.form.goodsid =""
      }
    },
  },
  mounted() {
    this.requestCateList();
    this.requestBannerList();
    this.requestGoodsList();
  },
};
</script>
<style scoped >
</style>