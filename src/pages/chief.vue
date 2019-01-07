<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="head_" style="text-align: left;">
          <div class="logo">
            <img src="../../static/img/logo.png">
            <div class="headRight">
              <span><span>你好，{{name}}</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span style="cursor: pointer;"><el-button type="text" @click="dialogVisible = true">退出</el-button></span></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span='4'>
      	<div class="navHead">
      		后台管理系统
      	</div>
      	<div class="navBody">
      		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" :router=true>
			     <el-menu-item index="/chief/index"><i class="el-icon-tickets"></i>首页中心</el-menu-item>
			     <el-submenu index="">
			     <template slot="title"><i class="el-icon-menu"></i>我的工作台</template>
			     <el-menu-item index="/chief/search"><i class="el-icon-search"></i>搜索</el-menu-item>
			     <el-menu-item index="/chief/message"><i class="el-icon-bell"></i>消息</el-menu-item>
           <el-menu-item index="/chief/group"><i class="el-icon-zoom-in"></i>部门</el-menu-item>
           <el-menu-item index="/chief/user"><i class="el-icon-zoom-in"></i>成员</el-menu-item>
           <el-menu-item index="/chief/record"><i class="el-icon-date"></i>记录</el-menu-item>
			  </el-submenu>
			  <el-menu-item index="/chief/personCenter"><i class="el-icon-tickets"></i>个人中心</el-menu-item>
			  <el-menu-item index="/chief/about"><i class="el-icon-more"></i>关于</el-menu-item>
			</el-menu>
        <iframe src="../../static/clock/index.html" scrolling="no" frameborder="0" width="100%" height="200px"></iframe>
      	</div>
      </el-col>
      <el-col :span='20'>
      	<router-view></router-view>
      </el-col>
    </el-row>
    <el-dialog
	  title="提示"
	  :visible.sync="dialogVisible"
	  width="25%"
	  :before-close="handleClose">
	  <span>您确定退出登录吗？</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="loginOut">退出</el-button>
	  </span>
	</el-dialog>
  </div>
</template>
<script>
import axios from 'axios';	
export default {
  name: 'chief',
  data () {
    return {
      name: '',
      dialogVisible: false,
      activeIndex: '1',
      index:'',
      group:'',
      search:'',
      message:'',
      about:'',
      groupEdit:'',
      groupAdd:'',
      groupDel:'',
      personCenter:''
    }
  },
  methods: {
  	loginOut (){
  		this.dialogVisible = false;
  		axios.post('administrator/loginOut', {
  			'status': '1'
  		}).then((res) => {
  			if(res.data.status == '1'){
  				this.$notify({
		          title: '成功',
		          message: '退出成功',
		          type: 'success'
		        });
		    	sessionStorage.setItem("Login", false);
          sessionStorage.setItem("name", '');
		    	this.$router.push({name:'login'});
  			}else{
  				 this.$notify.error({
		          title: '错误',
		          message: '退出失败'
		        });
  			}
  		}).catch((error) => {
  			console.log(error);
  		})
  	},
  	handleClose(done) {
		this.dialogVisible = false;
    // this.$confirm('确认关闭？')
    //   .then(_ => {
    //     done();
    //   })
    //   .catch(_ => {});
  	},
  	handleOpen(key, keyPath) {
        console.log(key, keyPath);
  	},
  	handleClose(key, keyPath) {
    	console.log(key, keyPath);
  	}

  },
  mounted(){
  	this.name = sessionStorage.getItem("name");
  	this.index = this.$route.params.name + '/index';
  	this.$router.push({name:'index'});
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
  top: 14px;
  font-size: 15px;
  /*cursor: pointer;*/
}
.logo{
  margin-left: 30px;
  height: 60px; 
}
.logo img{
  margin-top: 2px;
  height: 55px;
}
.navHead{
	width: 99.5%;
	border-right: 1px solid #E6E6E6;
	height: 50px;
	padding-top: 10px;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	font-size: 28px;
	color: #303133;
	/*font-weight: bold;*/
	/*background-color: #EFF4FA; */
	letter-spacing:5px;
}
.navBody{

}
</style>
