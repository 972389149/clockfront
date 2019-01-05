<template>
  <div v-loading="loading">
  	<div class='loginTitle'>
  		Login In System
  	</div>
  	<div class="loginForm">
  		<div class="demo-input-size">
  			<div class="account">
  				<el-input
				    size="medium"
				    placeholder="请输入账号"
				    suffix-icon="el-icon-mobile-phone"
				    v-model="clockAccount"
				    maxlength=11>
				 </el-input>
  			</div>
  			<div class="password">
  				<el-input
				    size="medium"
				    type='password'
				    placeholder="请输入密码"
				    suffix-icon="el-icon-edit"
				    v-model="clockPassword"
				    maxlength=20>
				</el-input>
  			</div>
  			<div class="check">
  				<div class="checkCode">
  					<el-input
					    size="medium"
					    placeholder="验证码"
					    suffix-icon="el-icon-message"
					    v-model="clockcheck"
					    maxlength=4>
					</el-input>
  				</div>
				<div class='checkCodeImg' v-html='codeImg' @click='getCheckCode'>
					{{codeImg}}
				</div>
  			</div>
  			<div class="notice" v-if='notice'>
  				{{noticeText}}
  			</div>
  			<div class="noticesuccess" v-if='noticesuc'>
  				{{noticeText}}
  			</div>
		</div>
  	</div>
  	<div class="submitForm">
  		<el-button type="primary" size='medium' style='width: 100%;' @click='login' :loading='loading_'>登陆</el-button>
  	</div>
  	<div class="footText">
  		<span @click='toResetPwd'>
  			忘记密码?
  		</span>  &nbsp;&nbsp;|&nbsp;&nbsp; 
  		<span>
  			<el-button type="text" @click="open">意见反馈</el-button>
  		</span>
  	</div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'login',
  data () {
    return {
        loading: false,
      	clockAccount: '',   //账号
      	clockPassword: '',  //密码
      	clockcheck: '', //验证码
      	noticeText: '',  //登录提示文字
      	notice: false,  //登录提示信息
      	noticesuc: false, // 登录成功信息
      	loading_: false, // 登录按钮旋转
      	codeImg: ''  //验证码路径
    }
  },
  methods: {
  	// 登录函数
  	login (){
  		this.loading_ = true;
  		if(this.clockAccount == '' || this.clockPassword == ''){
  			this.noticeText = '账号密码不能为空！'
  			this.notice = true
  			this.loading_ = false
  			this.noticesuc = false
  		}else if(this.clockcheck == '' || this.clockcheck.length != 4){
  			this.noticeText = '验证码填写错误！'
  			this.notice = true
  			this.loading_ = false
  			this.noticesuc = false
  		}else{
  			this.noticeText = ''
  			this.notice = false

  			axios.post('administrator/login', {
  				clockAccount: this.clockAccount,
  				password: this.clockPassword,
  				checkCode: this.clockcheck
  			}).then(function (res) {
  				if(res.data.status == '0'){
  					this.noticeText = res.data.msg
    					this.notice = true
    					this.noticesuc = false
    					this.clockAccount = ''
    					this.clockPassword = ''
    					this.clockcheck = ''
              this.loading_ = false
    					this.getCheckCode();
  				}else if(res.data.status == '-1'){
  					alert(res.data.status)
  					this.noticeText = '登录失败。原因：未知'
    					this.notice = true
    					this.noticesuc = false
              this.loading_ = false
    					this.getCheckCode();
  				}else if(res.data.status == '-2'){
  					this.noticeText = '验证码错误！'
    					this.notice = true
    					this.noticesuc = false
    					this.clockcheck = ''
              this.loading_ = false
    					this.getCheckCode();
  				}else if(res.data.status == '1'){
            this.$notify({
              title: '成功',
              message: `登录成功，你好${res.data.result.name}`,
              type: 'success'
            });
  					this.noticesuc = true
  					this.noticeText = '登录成功，正在跳转...'
    				this.notice = false
    				sessionStorage.setItem("Login", true);
    				setTimeout(()=>{
              this.loading_ = false
              sessionStorage.setItem("name",res.data.result.name);
              this.$router.push({name:'chief'});
            },800);
  				}
  			}.bind(this)).catch(function (error) {
  				console.log(error);
  				this.noticeText = '登录失败。原因：未知'
    				this.notice = true
    				this.loading_ = false
    				this.noticesuc = false
  			}.bind(this));
  		}
  	},
  	// 获取验证码函数
  	getCheckCode (){
  		axios.get('administrator/checkCode').then((req)=>{
  			this.codeImg = req.data.img;
  		}).catch((err)=>{
  			console.log(err)
  		})
  	},
  	open() {
        this.$prompt('请输入您的意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
	    	if(value.length > 100){
	    		this.$message({
		          message: '注意，文本过长',
		          type: 'warning'
		        });
	    	}else {
	    		this.$message({
	            	type: 'success',
	            	message: '感谢您的宝贵意见'
	            });	
	    	}
        }).catch(() => {
                
        });
      },
      toResetPwd (){
      	this.$router.push('resetPwd');
      }
  },
  mounted (){
  	sessionStorage.setItem("Login", false);
  	this.getCheckCode();
    // setTimeout(()=>{
    //   this.loading = false;
    // },700);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginTitle{
	width: 100%; 
	height: 30px;
	text-align: center;
	font-size: 25px;
	margin-top: 20px;
	margin-bottom: 35px;
	/*border:1px solid #000;*/
	font-family: Monospace;
	color: #303133;
	font-weight: bold;
}
.loginForm{
	/*border:1px solid #000;*/
	/*height: 200px;*/
	margin-left: 5%;
	margin-right: 5%;
	width: 90%;
	text-align: center;
}
.submitForm{
	/*border:1px solid #000;*/
	height: 100px;
	width: 90%;
	margin-left: 5%;
	margin-right: 5%;
}
.account{
	margin-bottom: 25px;
}
.password{
	margin-bottom: 25px;
}
.check{
	/*display: inline;*/
	margin-bottom: 5px;
	/*border:1px solid #000;*/
	width: 100%;
	height: 50px;
}
.checkCode{
	float: left;
	width: 63%;
	/*border:1px solid #000;*/
}
.checkCodeImg{
	cursor: pointer;
	width: 35%;
	border-bottom: 15%;
	height: 35px;
	float: left;
	border:1px solid #E3E5EB;
}
.checkCodeImg svg{
	width: 100%;
	height: 35px;
}
.footText{
	/*border:1px solid #E3E5EB;*/
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
	bottom: 5px;
	font-size: 14px;
  text-align: center;
}
.footText span{
	cursor: pointer;
}
.notice{
	width: 100%;
	margin-bottom: 15px;
	color: #FF0400;
	font-size: 12px;
}
.noticesuccess{
	width: 100%;
	margin-bottom: 15px;
	color: green;
	font-size: 12px;
}
</style>
