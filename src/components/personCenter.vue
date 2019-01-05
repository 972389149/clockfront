<template>
  <div>
    <el-row>
    	<el-col :span="24" style='border-bottom: 1px solid #E6E6E6'>
  	  		<el-row>
    		  <el-col :span="span1">
    		  	<div>
    		  		<div class="title">
    			  		<div>
    			  			<el-breadcrumb separator-class="el-icon-arrow-right" style='font-size: 16px;'>
    						  <el-breadcrumb-item v-for='index in bread'>{{index}}</el-breadcrumb-item>
    						</el-breadcrumb>
    			  		</div>
    			  	</div>
    		  	</div>
    		  </el-col>
    		  <el-col :span="span2">
    		  	<div>
    		  		<div class='control'>
    					<el-button type="primary" plain icon="el-icon-edit" size='small' @click='edit' v-if='editing'>编辑</el-button>
    					<el-button type="primary" plain size='small' @click='cancel' v-if='!editing'>取消</el-button>
    					<el-button type="primary" plain size='small' @click='finish' v-if='!editing'>完成</el-button>
    		  		</div>
    		  	</div>
    		  </el-col>
    		</el-row>
    	</el-col>
    	<el-col :span='12' style='margin: 15px 0 10px 10px'>
    		<el-col :span='6'>
	    		<div class="inputWord">账号：</div>
	    	</el-col>
	    	<el-col :span='15'>
	    		<el-input
				  placeholder="请输入内容"
				  v-model="clockAccount"
				  disabled
				  clearable>
				</el-input>
	    	</el-col>
	    	<el-col :span='6' style='margin: 15px 0 10px 0px'>
	    		<div class="inputWord">姓名：</div>
	    	</el-col>
	    	<el-col :span='15' style='margin: 15px 0 10px 0px'>
	    		<el-input
				  placeholder="请输入姓名"
				  v-model="name"
				  :disabled='editing'
				  clearable>
				</el-input>
	    	</el-col>
	    	<el-col :span='13' style='margin: 15px 0 10px 10px'>
		    		<div class="inputWord" style='color:#999999'>*修改姓名可能会影响用户对您的识别</div>
	    	</el-col>
    	</el-col>
    	<el-col :span='8' style='border-left: 1px solid #E6E6E6;padding-left: 30px;'>
    		<el-col :span='10' style='margin: 18px 0 10px 0px'>
	    		<div class="inputWord" style='margin-top: 7px;'>手机号：{{oldPhone}}</div>
	    	</el-col>
	    	<el-col :span='14' style='margin: 18px 0 10px 0px'>
	    		<el-button type="primary" plain size='small' @click='editPhone'>{{editPhoneWord}}</el-button>
	    	</el-col>
	    	<el-col :span='24' style='margin: 15px 0 10px 20px;border:1px solid #e6e6e6;padding: 15px 0 15px 0;box-shadow: darkgrey 10px 10px 30px 5px ;' v-if='showPhoneEdit'>
	    		<el-col :span='5' style='font-size: 14px;padding-top: 6px;'>
	    			<span>新手机：</span>
	    		</el-col>
	    		<el-col :span='13'>
	    			<el-input
					  placeholder="请输入新的手机号"
					  v-model="newPhone"
					  size="small"
					  clearable
					  maxLength='11'>
					</el-input>
	    		</el-col>
	    		<el-col :span='5'>
	    			<el-button type="primary" plain size='small' @click='editPhoneCheck' :disabled='!check_'>验证码</el-button>
	    		</el-col>
	    		<el-col :span='5' style='font-size: 14px;padding-top: 6px;margin-top: 15px;'>
	    			<span>验证码：</span>
	    		</el-col>
	    		<el-col :span='7' style='margin-top: 15px;'>
	    			<el-input
					  placeholder="验证码"
					  v-model="phoneCheck"
					  size="small"
					  :disabled="check_"
					  clearable
					  maxLength='6'>
					</el-input>
	    		</el-col>
	    	</el-col>
	    	<el-col :span='10' style='margin: 18px 0 10px 0px'>
	    		<div class="inputWord" style='margin-top: 7px;'>密码：*</div>
	    	</el-col>
	    	<el-col :span='14' style='margin: 18px 0 10px 0px'>
	    		<el-button type="primary" plain size='small' @click='editPassword'>{{editPasswordWord}}</el-button>
	    	</el-col>
	    	<el-col :span='24' style='margin: 15px 0 10px 20px;border:1px solid #e6e6e6;padding: 15px 0 15px 0;box-shadow: darkgrey 10px 10px 30px 5px ;' v-if='showPasswordEdit'>
	    		<el-col :span='8' style='font-size: 14px;padding-top: 6px;'>
	    			<span>原密码 ：</span>
	    		</el-col>
	    		<el-col :span='15'>
	    			<el-input
					  placeholder="请输入原密码"
					  v-model="oldPassword"
					  size="small"
					  clearable
					  maxLength='20'>
					</el-input>
	    		</el-col>
	    		<el-col :span='8' style='font-size: 14px;padding-top: 6px;margin-top: 15px;'>
	    			<span>新密码：</span>
	    		</el-col>
	    		<el-col :span='15' style='margin-top: 15px;'>
	    			<el-input
					  placeholder="请输入新密码"
					  v-model="newPassword"
					  size="small"
					  clearable
					  maxLength='20'>
					</el-input>
	    		</el-col>
	    		<el-col :span='8' style='font-size: 14px;padding-top: 6px;margin-top: 15px;'>
	    			<span>再次输入新密码：</span>
	    		</el-col>
	    		<el-col :span='15' style='margin-top: 15px;'>
	    			<el-input
					  placeholder="请再次输入新密码"
					  v-model="reNewPassword"
					  size="small"
					  clearable
					  maxLength='20'>
					</el-input>
	    		</el-col>
	    	</el-col>
    	</el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'personCenter',
  data () {
    return {
      bread: ['个人中心'],
      editing: true,
      showPhoneEdit: false,
      editPhoneWord: '点击更改',
      editPasswordWord: '点击更改',
      showPasswordEdit: false,
      span1: '22',
      span2: '2',
      check_: true,
      clockAccount: '', //
	    backupsClockAccount: '',
      name: '', //
      backupsName: '',
      oldPhone: '', //
      backupsOldPhone: '',
      newPhone: '',
      phoneCheck: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
      newObj: {
      	clockAccount: '',
      	name: '',
      	phone: '',
      	password: ''
      }
    }
  },
  mounted (){
  	this.getAdmin();
  },
  methods: {
  	getAdmin (){
  		axios.get('administrator/getAdmin').then(function(res){
  			if(res.data.status == '1'){
  				this.backupsClockAccount = res.data.result.clockAccount;
  				this.backupsName = res.data.result.name;
  				this.backupsOldPhone = res.data.result.phone;
  				this.clockAccount = res.data.result.clockAccount;
  				this.name = res.data.result.name;
  				this.oldPhone = res.data.result.phone;
  				this.password = res.data.result.clockPassword;
  			}else{
  				this.$message.error(`获取信息异常:${res.data.msg}，请联系管理员`);
  			}
  		}.bind(this)).catch(function(err){
  			this.$message.error('服务器异常，请联系管理员');
  		}.bind(this))
  	},
  	edit (){
  		this.editing = false;
  		this.span1 = '21';
  		this.span2 = '3';
  		this.bread.push('编辑');
  	},
  	cancel (){
  		this.$confirm('此操作将放弃编辑, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.editing = true;
      			this.span1 = '22';
      			this.span2 = '2';
      			this.bread.pop();
      			this.showPhoneEdit = false;
      			this.showPasswordEdit = false;
      			this.editPhoneWord = '点击更改';
      			this.editPasswordWord = '点击更改';
      			this.clockAccount = this.backupsClockAccount;
    			  this.name = this.backupsName;
    			  this.oldPhone = this.backupsOldPhone;
    			  this.check_ = true;
          }).catch(() => {
                  
        });
  	},
  	finish (){

  		// 判断开启手机更改后，新手机号和验证码是否为空
  		if(this.showPhoneEdit && (this.newPhone == '' || this.phoneCheck == '')){
  			this.$message({
	          message: '新手机号内容不能为空',
	          type: 'warning'
	        });
	        this.newPhone = '';
	        this.phoneCheck = '';
	        return;
  		}else{
  			if(this.showPhoneEdit){
  				// 这里添加验证码的逻辑代码
  				this.newObj.phone = this.newPhone;
  			}else{
  				this.newObj.phone = this.oldPhone; 
  			}
  		};
  		// 判断开启密码更改后，密码是否为空
  		if(this.showPasswordEdit && (this.oldPassword == '' || this.newPassword == '' || this.reNewPassword == '') ){
  			this.$message({
	          message: '密码不能为空',
	          type: 'warning'
	        });
	        this.oldPassword = '';
	        this.newPassword = '';
	        this.reNewPassword = '';
	        return;
  		}else{
  			if(this.showPasswordEdit){
  				// 判断原密码是否正确
		  		if(this.password != this.oldPassword){
		  			this.$message({
			          message: '原密码错误',
			          type: 'warning'
			        });
			        this.oldPassword = '';
			        return;
		  		}
  				// 判断新旧密码是否相同 
		  		if (this.oldPassword == this.newPassword){
		  			this.$message({
			          message: '新密码不能和旧密码相同',
			          type: 'warning'
			        });
			        this.newPassword = '';
			        this.reNewPassword = '';
			        return;
		  		};
		  		// 判断两次输入密码是否一致
		  		if(this.newPassword != this.reNewPassword){
		  			this.$message({
			          message: '两次输入的密码不一致',
			          type: 'warning'
			        });
			        this.newPassword = '';
			        this.reNewPassword = '';
			        return;
		  		}else{
		  			this.newObj.password = this.newPassword;
		  		};
  			}else{
  				this.newObj.password = this.password; 
  			}
  		};

  		if(this.name != ''){
  			this.newObj.name = this.name;
  			this.newObj.clockAccount = this.clockAccount;
        // alert(JSON.stringify(this.newObj));
        axios.post('administrator/editAdmin', {
          clockAccount: this.newObj.clockAccount,
          name: this.newObj.name,
          clockPassword: this.newObj.password,
          phone: this.newObj.phone
        }).then( (res)=> {
          if(res.data.status == '1'){
             this.getAdmin();
             this.$message({
                type: 'success',
                message: '修改成功!'
              });
             this.editing = true;
              this.span1 = '22';
              this.span2 = '2';
              this.bread.pop();
              this.showPhoneEdit = false;
              this.showPasswordEdit = false;
              this.editPhoneWord = '点击更改';
              this.editPasswordWord = '点击更改';
              this.clockAccount = this.backupsClockAccount;
              this.name = this.backupsName;
              this.oldPhone = this.backupsOldPhone;
              this.check_ = true;
          }else{
            this.$message({
              message: '修改失败',
              type: 'warning'
            });
          }

        }).catch( (err)=>{
          this.$message({
            message: '修改异常',
            type: 'warning'
          });
        })
  		}else{
  			this.$message({
	          message: '名字不能为空',
	          type: 'warning'
	        });
	        return;
  		};
  	},
  	editPhone (){
  		if(this.editing){
  			this.$message({
	          message: '请先开启编辑状态',
	          type: 'warning'
	        });
  			return;
  		}
  		if(this.showPhoneEdit){
  			this.showPhoneEdit = false;
  			this.editPhoneWord = '点击更改';
  			// 放弃更改
  			this.newPhone = '';
  			this.phoneCheck = '';
  			this.check_ = true;
  		}else{
  			this.showPhoneEdit = true;
  			this.editPhoneWord = '放弃更改';
  		}
  	},
  	editPhoneCheck (){
  		if(this.oldPhone == this.newPhone){
  			this.$message({
	          message: '新手机号码不能和旧手机号码一样',
	          type: 'warning'
	        });
	        this.newPhone = '';
  		}else{
  			this.check_ = false;
  			this.$message({
	          message: '手机验证码已发送，请留意手机短信',
	          type: 'success'
	        });
  		}
  	},
  	editPassword (){
  		if(this.editing){
  			this.$message({
	          message: '请先开启编辑状态',
	          type: 'warning'
	        });
  			return;
  		}
  		if(this.showPasswordEdit){
  			this.showPasswordEdit = false;
  			this.editPasswordWord = '点击更改';
  			// 放弃更改
  			this.oldPassword = '';
  			this.newPassword = '';
  			this.reNewPassword = '';
  		}else{
  			this.showPasswordEdit = true;
  			this.editPasswordWord = '放弃更改';
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	margin-top: 25px;
	margin-left: 20px;
}
.control{
	margin-top: 15px;
	margin-bottom: 15px;
}
.inputWord{
	margin-top: 10px;
	font-size: 14px;
}
</style>
