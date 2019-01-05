<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="head_" style="text-align: left;">
          <div class="logo">
            <img src="../../static/img/logo.png">
            <div class="headRight">
              <span>基本版 | English</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="body_">
          <el-row>
            <el-col :span="24">
              <div class="tree">
                <el-col :span='24'>
                  <span class='text-reflect'>欢迎来到 "小希打卡" 后台管理系统</span>
                </el-col>
                <!-- <canvas id='canvas'></canvas> -->
                <iframe scrolling="no" frameborder="0" width="10%" height="310px" src="../../static/jquery/examples/spiderweb.html" style='float:left;margin-left:0px;width: 460px;height: 370px;'></iframe>
                <iframe scrolling="no" frameborder="0" width="10%;" height="310px" src="../../static/jquery/examples/spiderweb.html" style='float:right;margin-right:0px;width: 460px;height: 370px;'></iframe>
                <iframe scrolling="no" frameborder="0" width="100%;" height="500px" src="../../static/jquery/examples/tree.html" style='position: relative;bottom:35px;left:0px;z-index: 1'></iframe>
              </div>
            </el-col>
            <el-col :span="10" >
              <div class="clockMain">
                <div class='choose_'>
                  <router-link to='login'>
                    <div :class="login" style='border-right: 2px solid #A0B1C4' @click='loginRoute'>登录</div>
                  </router-link>
                  <router-link to='register'>
                    <div :class="register" @click='registerRoute'>注册</div>
                  </router-link>
                </div>
                <div>
                  <router-view></router-view>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="wechat">
          <img src="../../static/img/wechat.jpg">
          <br>
          <span>开发者微信</span>
        </div>
        <div class="foot_">
         <a href="#">关于小希</a> | <a href="#">服务条款</a> | <a href="#">隐私策略</a> | <a href="#">客服中心</a> | <a href="#">联系我们</a> | <a href="#">帮助中心</a> | 
         <span>©2018 - 2019 Xiaoxi . All Rights Reserved.</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      login: 'oneChooseOne',
      register: 'chooseOne'
    }
  },
  methods: {
    loginRoute (){
      this.login = 'oneChooseOne';
      this.register = 'chooseOne';
    },
    registerRoute (){
      this.login = 'chooseOne';
      this.register = 'oneChooseOne';
    }
  },
  mounted(){
    $(".demo3 ").animatext();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head_{
  width: 100%;
  height: 64px;
  background-color: #EFF4FA;
  border-bottom: 1px solid #D6DFEA;
}
.headRight{
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 12px;
  cursor: pointer;
}
.body_{
  width: 100%;
  /*min-height: 21px;*/
}
.foot_{
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 27px;
  padding-top: 8px;
  background-color: #EFF4FA;
  border-top: 1px solid #D6DFEA;
}
.tree span{
  margin-left: 30px;
  margin-top: 10px;
}
/*canvas {
  width: 171%;
  cursor: pointer;
}*/
.logo{
  margin-left: 30px;
  height: 60px; 
}
.logo img{
  margin-top: 2px;
  height: 55px;
}
.text-reflect{
   font-size:22px;
   float:left;
   -webkit-box-reflect: below 10px 
   -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.5));
}
.foot_ {
  font-size: 12px;
  position: fixed;
}
.foot_ a{
  text-decoration-line: none;
  color: #1D5494;
}
.clockMain{
  position: absolute;
  z-index: 3;
  border:1px solid #000;
  width: 350px;
  height: 480px;
  top: 40px;
  right: 454px;
  background-color: #EFF4FA;
  border:1px solid #A0B1C4;
  border-radius: 5px;
  opacity: 0.8;
}
.choose_{
  width: 100%;
  height: 40px;
  cursor: pointer;
  /*border-bottom:1px solid #A0B1C4;*/
}
.chooseOne{
  float: left;
  width: 174px;
  padding-top: 10px;
  height: 29px;
  text-align:center;
  color: #679D7C;
  border-bottom:1px solid #A0B1C4;
}
.oneChooseOne{
  float: left;
  width: 174px;
  padding-top: 10px;
  height: 29px;
  text-align:center;
  border-bottom:1px solid #679D7C;
  color: #fff;
  background-color: #A0B1C4;
}
.wechat{
  position: fixed;
  z-index: 2;
  bottom: 40px;
  left: 20px;
}
.wechat img{
  width: 80px;
  height: 80px;
}
.wechat span{
  font-size: 12px;
}
</style>
