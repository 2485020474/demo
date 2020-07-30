<template>
  <div class="cont">
    <el-container>
      <el-aside width="200px" class="cont">
        <!-- 导航开始 -->
        <!-- 
            router 路由模式
            index 是唯一标识，配置了路由，就改为自己的path
        -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 有目录的循环 -->
          <!-- <el-submenu v-show="isChildren" :index="item.id+''" v-for="item in user.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
          </el-submenu>
          没有目录循环
          <el-menu-item v-show="!isChildren" :index="i.url+''" v-for="i in user.menus" :key="i.id">{{i.title}}</el-menu-item>-->
          <template v-for="item in user.menus">
            <el-submenu v-if="item.children" :index="item.id+''" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!item.children" :index="item.url+''"  :key="item.id">{{item.title}}</el-menu-item>
          </template>


        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-arrow-left">返回</span>
          <div class="fr">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
    isChildren() {
      return this.user.menus[0].children ? true : false;
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    exit() {
      this.changeUser(null);
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside {
  background-color: #20222a;
}
.el-header {
  background-color: #b3c0d1;
}
.cont {
  height: 100vh;
}
.fr {
  float: right;
  line-height: 60px;
}
.view {
  padding: 20px 0;
}
.el-header {
  line-height: 60px;
}
</style>