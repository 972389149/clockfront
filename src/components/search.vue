<template>
  <div>
    <el-row>
	  <el-col :span="24" style='border-bottom: 1px solid #E6E6E6'>
	  	<el-row>
		  <el-col :span="10">
		  	<div class="grid-content bg-purple">
		  		<div class="title">
			  		<div>
			  			<el-breadcrumb separator-class="el-icon-arrow-right" style='font-size: 16px;'>
						  <el-breadcrumb-item v-for='index in bread'>{{index}}</el-breadcrumb-item>
						</el-breadcrumb>
			  		</div>
			  	</div>
		  	</div>
		  </el-col>
		  <el-col :span="4">
		  	<div>
		  		<div class='control' style="float: right;">
		  				<el-radio-group v-model="type">
					      <el-radio-button label="姓名"></el-radio-button>
					      <el-radio-button label="手机"></el-radio-button>
					    </el-radio-group>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span='9'>
		  	<div>
		  		<div class="control">
		  			<el-input placeholder="请输入内容" v-model="search" maxlength='11'>
					    	<el-button slot="append" icon="el-icon-search" :loading ='loading' @click='search_'></el-button>
					</el-input>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
	  </el-col>
	</el-row>
	<el-row v-if='dataExist' style='margin:10px 0 0 20px;'>
		<el-col :span='1'>
			<el-tag>{{_type}}</el-tag>
		</el-col>
		<el-col :span='1'>
			<el-tag>{{_search}}</el-tag>
		</el-col>
	</el-row>
	<el-row style='margin: 10px 10px 0 10px' v-if='dataExist'>
		<el-col :span="5" v-for='item in userList' style='margin: 10px 10px 0 10px'>
		    <el-card :body-style="{ padding: '0px' }" shadow="hover" style='border-color: #e6e6e6;'>
		      <img src="../../static/img/user.jpg" class="image">
		      <div style="padding: 14px;">
		        <span style='font-weight: bold;letter-spacing:5px '>{{item.name}}</span>
		        <div class="bottom clearfix" style='line-height: 18px;letter-spacing:2px'>
		          <time class="time">微信名称：{{item.nickName}}</time><br>
		          <time class="time">手机：{{item.phone}}</time><br>
		          <time class="time">年龄：{{item.age}}</time><br>
		          <time class="time">性别：{{item.sex}}</time><br>
		          <el-button type="primary" plain icon="el-icon-plus" size='small' 
		          @click='add(item)' style='margin-top: 6px;'>添加</el-button>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
	</el-row>
	<el-row v-if='!dataExist'>
		<el-col :span='24' style='margin-top: 15px;'>
			<span>
				<span style='font-size: 20px;letter-spacing: 7px;font-weight: bold;'>没有数据</span>
				<br>
				<span style='font-size: 12px;color: #606266'>搜索支持 “模糊查询”</span>
			</span>
		</el-col>
	</el-row>

	<!-- 点击添加弹开的dialog -->
	<el-dialog title="选择一个部门" :visible.sync="dialogFormVisible" width="35%"> 
	  <el-form :model="form">
	    <el-form-item label="部门" :label-width="formLabelWidth">
	      <el-select v-model="form.id" placeholder="请选择部门">
	        <el-option v-for='item in groupList' :label="item.deptName" :value="item.deptId"></el-option>
	      </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="cancelAdd">取 消</el-button>
	    <el-button type="primary" @click="submitAdd">确 定</el-button>
	  </div>
	</el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'search',
  data () {
    return {
      loading: false,
      bread: ['我的工作台','搜索'],
      type: '姓名',
      _type: '姓名',
      search: '',
      _search: '',
      userList: [],
      dataExist: false,
      groupList: [],
      user: {},
      dialogFormVisible: false,
  	  form: {
  	    id: '',
        name: ''
  	  },
      formLabelWidth: '120px'
    }
  },
  methods:{
  	search_ (){
  		this.loading = true;
      this.user = {};
  		if(this.type != '姓名' && this.type !='手机'){
  			this.$message.error('参数错误！');
  		}else{
  			if(this.search == ''){
  				this.$message.error('搜索内容不能为空！');
  			}else{
  				axios.get('user/searchUser',{
  					params:{
  						type: this.type,
  						value: this.search
  					}
  				}).then(function(res){
  					if(res.data.status == '1'){
  						this.userList = res.data.result;
  						for(var i=0; i<this.userList.length; i++){
  							if(this.userList[i].sex == 'male'){
  								this.userList[i].sex = '男';
  							}else{
  								this.userList[i].sex = '女';
  							}
  						}
  						if(res.data.result.length == 0){
  							this.$message.error(`搜索不到此用户！`);
  						}
  					}else{
  						this.$message.error(`搜索失败，${res.data.msg}！`);
  					}
  					this.loading = false;
  					this._type = this.type;
  					this.type = '姓名';
  					this._search = this.search;
  					this.search = '';
  				}.bind(this)).catch(function(err){
  					this.$message.error(`服务器异常，请联系管理员。`);
  					this.loading = false;
  				})
  			}
  		}
  	},
  	add (user){
  		axios.get('administrator/getGroup').then(function(res){
  			if(res.data.status == '1'){
  				if(res.data.result[0] == ''){
  					this.$message.error(`你目前不是部门管理员，请先创建部门。`);
  					this.dialogFormVisible = false;
  				}else{
	  				this.groupList= res.data.result[0];
	  				this.dialogFormVisible = true;
            this.user = user;
  				}
  			}else{
  				this.$message.error(`获取部门列表失败，请联系管理员。`);
  			}
  		}.bind(this)).catch(function(err){
  			this.$message.error(`服务器异常：${err}，请联系管理员。`);
  		}.bind(this));
  	},
  	cancelAdd (){
  		this.groupList = [];
  		this.form.id = '';
  		this.dialogFormVisible = false;
  	},
  	submitAdd (){
      // console.log(`用户信息：${this.user.name};${this.user.phone};${this.user._id}`);
      let choiceId = '';
      let choiceName= '';
      for(var i=0; i<this.groupList.length; i++){
        if(this.groupList[i].deptId == this.form.id){
          choiceId = this.groupList[i].deptId;
          choiceName = this.groupList[i].deptName;
        }else{
          continue;
        }
      }
      // console.log(`部门信息: ${choiceId}${choiceName}`);
      if(this.form.id == ''){
        this.$message.error(`请选择一个部门。`);
        return;
      }else{
        axios.post('administrator/inviteUser', {
          userId: this.user._id,
          userName: this.user.name,
          userPhone: this.user.phone,
          departmentId: choiceId,
          departmentName: choiceName,
        }).then(function(res){
          if(res.data.status == '1'){
            this.$message({
              message: '邀请成功，等待用户同意加入',
              type: 'success'
            });
          }else{
            this.$message.error(`添加异常`);
          }
        }.bind(this)).catch(function(err){
          this.$message.error(`服务器异常，请联系管理员。`);
        }.bind(this))
      }
  		this.groupList = [];
  		this.form.id = '';
  		this.dialogFormVisible = false;
  	}
  },
  watch: {
  	'userList': function(newVal){
  		if(this.userList.length == 0){
  			this.dataExist = false;
  		}else{
  			this.dataExist = true;
  		}
  	}
  },
  mounted (){

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
.time {
  font-size: 13px;
  color: #999;
}
  
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 170px;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.el-select .el-input {
	width: 130px;
}
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}
</style>
