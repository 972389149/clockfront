<template>
  <div v-loading="loading">
    <div class='registerTitle'>
  		Sign Up For System
  	</div>
  	<div class="registerForm">
  		<div class="demo-input-size">
  			<div class="account">
  				<el-input
				    size="medium"
				    placeholder="请输入账号"
				    suffix-icon="el-icon-document"
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
  			<div class="password">
  				<el-input
				    size="medium"
				    type='password'
				    placeholder="请再次输入密码"
				    suffix-icon="el-icon-edit"
				    v-model="clockRePassword"
				    maxlength=20>
				</el-input>
  			</div>
  			<div class="account">
  				<el-input
				    size="medium"
				    placeholder="请输入姓名"
				    suffix-icon="el-icon-document"
				    v-model="clockName"
				    maxlength=8>
				 </el-input>
  			</div>
  			<div class="account">
  				<el-input
				    size="medium"
				    placeholder="请输入手机号"
				    suffix-icon="el-icon-mobile-phone"
				    v-model="clockPhone"
				    maxlength=11
				    :disabled="phone_">
				 </el-input>
  			</div>
  			<div class="check">
  				<div class="checkCode">
  					<el-input
					    size="medium"
					    placeholder="手机验证码"
					    suffix-icon="el-icon-message"
					    v-model="clockPhonecheck"
					    maxlength=4
					    :disabled="check_">
					</el-input>
  				</div>
				<div class='checkCodeImg' @click='getCheckCode'>
					<el-button  :loading="codeIng">{{codeText}}</el-button>
				</div>
  			</div>
  			<div class="submitForm">
		  		<el-button type="primary" size='medium' style='width: 100%;' @click='register' :loading='loading_'>注册</el-button>
		  	</div>
		</div>
  	</div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'register',
  data () {
    return {
      loading: false,
      loading_: false,
      clockAccount: '',
      clockPassword: '',
      clockRePassword: '',
      clockName: '',
      clockPhone: '',
      phone_: false,
      clockPhonecheck: '',
      check_: true,
      codeIng: false,
      codeText: '获取验证码',
      time: 60
    }
  },
  methods: {
  	register (){
  		this.loading_ = true;
  		let regPhone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/; //手机正则
  		let regPassword = /^[0-9a-zA-Z_]{1,}$/; //密码正则
  		let regAccount = /^[0-9a-zA-Z_]{1,}$/; //账号正则
  		let regName =  /^[u4e00-u9fa5A-Za-z0-9_-]{3,10}$/ //名字正则
  		if(this.clockAccount == '' || this.clockPassword == '' || this.clockRePassword == '' || this.clockPhone == '' || this.clockPhonecheck == ''){
  			this.loading_ = true;
  			this.$notify({
	          title: '警告',
	          message: '信息填写未完整',
	          type: 'warning'
	        });
	        setTimeout(()=>{
	        	this.loading_ = false;
	        },5000);
  		}else{
  			if(this.clockPassword != this.clockRePassword){
  				this.$notify({
		          title: '警告',
		          message: '两次输入密码不一致',
		          type: 'warning'
		        });
		        this.clockPassword = '';
		        this.clockRePassword = '';
		        this.loading_ = false;
		        return;
  			};
  			if(regPassword.test(this.clockPassword) == false){
  				this.$notify({
		          title: '警告',
		          message: '密码格式错误，密码只包含数字和字母',
		          type: 'warning'
		        });
		        this.clockPassword = '';
		        this.clockRePassword = '';
		        this.loading_ = false;
		        return;
  			};
  			if(regName.test(this.clockName) == false){
  				this.$notify({
		          title: '警告',
		          message: '名字格式错误，名字只包含数字、字母和汉字',
		          type: 'warning'
		        });
		        this.clockName = '';
		        this.loading_ = false;
  				return;
  			};
  			if(regAccount.test(this.clockAccount) == false){
  				this.$notify({
		          title: '警告',
		          message: '账号格式错误，账号只包含数字、字母',
		          type: 'warning'
		        });
		        this.clockAccount = '';
		        this.loading_ = false;
  				return;
  			};

  			axios.post('administrator/register', {
  			  clockAccount: this.clockAccount,
		      clockPassword: this.clockPassword,
		      clockName: this.clockName,
		      clockPhone: this.clockPhone
  			}).then(function(res){
  				if(res.data.status == '1'){
  					this.$notify({
			          title: '注册成功',
			          message: `恭喜${this.clockName},即将跳转到首页`,
			          type: 'success'
			        });
			        setTimeout(()=>{
			          this.loading_ = false;
			          sessionStorage.setItem("Login", true);
		              this.$router.push({name:'chief',params :{name:res.data.result}});
		            },1000);
  				}else if(res.data.status == '0'){
  					this.$notify.error({
			          title: '注册失败',
			          message: '参数不能为空'
			        });
			        this.loading_ = false;
  				}else if(res.data.status == '-1'){
  					this.$notify.error({
			          title: '注册异常',
			          message: '注册失败，请联系管理员'
			        });
			        this.loading_ = false;
  				}
  			}.bind(this)).catch(function(err){
  				console.log(`${err}`);
  				this.$notify.error({
		          title: '服务器异常',
		          message: '注册失败，请联系管理员'
		        });
		        this.loading_ = false;
  			}.bind(this));
  		}
  	},
  	getCheckCode (){
  		this.check_ = false;
  		let regPhone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/; //手机正则
  		if(regPhone.test(this.clockPhone) == false){
			this.$notify({
	          title: '警告',
	          message: '手机号码格式错误',
	          type: 'warning'
	        });
	        this.clockPhone = '';
	        this.loading_ = false;
	        this.phone_ = false;
	        this.check_ = true;
	        return;
		};
		axios.post('administrator/phoneCheck',{
			clockPhone: this.clockPhone
		}).then(function(res){
			if(res.data.status == '1'){
				this.$notify({
		          title: '成功',
		          message: '手机验证码已发送，请留意手机',
		          type: 'success'
		        });
		        this.codeIng = true;
		        this.codeText = '';
		        this.phone_ = true;
		        this.check_ = false;
		  		let timing = setInterval(()=>{
		  			this.codeText = `  ${this.time} S`;
		  			this.time = this.time - 1;
		  			if(this.time == -2){
			  			clearInterval(timing);
			  			this.time = 5;
			  			this.codeText = '获取验证码';
			  			this.codeIng = false;
			  		}
		  		}, 1000);
			}else if(res.data.status == '0'){
				this.phone_ = false;
				this.$notify({
		          title: '错误',
		          message: '参数不能为空',
		          type: 'warning'
		        });
		        this.check_ = true;
			}else if(res.data.status == '-1'){
				this.phone_ = false;
				this.$notify({
		          title: '错误',
		          message: '数据库检索异常',
		          type: 'warning'
		        });
		        this.check_ = true;
			}else if(res.data.status == '-2'){
				this.phone_ = false;
				this.$notify({
		          title: '错误',
		          message: '该手机号已经注册',
		          type: 'warning'
		        });
		        this.clockPhone = '';
		        this.check_ = true;
			}
		}.bind(this)).catch(function(err){
			this.$notify({
	          title: '错误',
	          message: '发送验证码失败，服务器异常',
	          type: 'warning'
	        });
	        this.clockPhone = '';
	        this.phone_ = false;
	        this.check_ = true;
		}.bind(this))
  	}
  },
  mounted (){
  	// setTimeout(()=>{
  	// 	this.loading = false;
  	// },700);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerTitle{
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
.registerForm{
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
	margin-bottom: 15px;
}
.password{
	margin-bottom: 15px;
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
.checkCodeImg button{
	/*cursor: pointer;*/
	max-width: 100%;
	/*border-bottom: 15%;*/
	height: 35px;
	/*float: left;*/
	/*border:1px solid #E3E5EB;*/
}
.checkCodeImg{
	cursor: pointer;
	width: 36%;
	border-bottom: 15%;
	height: 35px;
	float: left;
	border:1px solid #E3E5EB;
}
</style>
