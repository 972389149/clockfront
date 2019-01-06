<template>
  <div>
    <el-row>
      <el-col :span="24" style='border-bottom: 1px solid #E6E6E6'>
	  	<el-row>
  		  <el-col :span="19">
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
  		  <el-col :span="5">
  		  	<div class="grid-content bg-purple">
  		  		<div class='control'>
  		  			<el-button type="primary" plain icon="el-icon-plus" size='small' @click='add'>添加</el-button>
  		  			<el-button type="primary" plain icon="el-icon-back" size='small' @click='back'>返回</el-button>
  		  		</div>
  		  	</div>
  		  </el-col>
  		</el-row>
  	  </el-col>
  	  <el-col :span="24" v-if='dataExist' style='min-height: 595px;' v-loading="loading" element-loading-text="拼命加载中..."  element-loading-spinner="el-icon-loading">
  	  	<el-row style='margin: 10px 10px 0 10px' v-if='turnInto'>
    		  <el-col :span="5" v-for='(dep,$index) in department' style='margin: 10px 10px 0 10px'  >
    		    <el-card :body-style="{ padding: '0px' }" style='border-color: #e6e6e6;cursor: pointer;'>
    		      <img src="../../static/img/group.jpg" class="image" @click='open(dep,$index)'>
    		      <div style="padding: 14px;" @click='open(dep.deptId,$index)'>
    		        <span>{{dep.deptName}}</span>
    		        <div class="bottom clearfix">
    		          <time class="time">管理员 : {{dep.name}}</time>
    		          <br>
    		          <span style='float: right;' v-if='view_'><i class="el-icon-rank"></i></span>
    		        </div>
    		      </div>
    		    </el-card>
    		  </el-col>
    		</el-row>
    		<el-row  style='margin: 10px 10px 0 10px' v-if='!turnInto'>
    			<el-col :span='24'>
    				<el-table
    				    :data="tableData"
    				    border
    				    style="width: 100%">
    				    <el-table-column
    				      prop="image"
    				      label="头像">
    				        <template slot-scope="scope">
    					        <img :src="scope.row.headImg" class="head_pic"/>
    					    </template>
    				    </el-table-column> 
    				    <el-table-column
    				      prop="name"
    				      label="姓名">
    				    </el-table-column>
    				    <el-table-column
    				      prop="sex"
    				      label="性别">
    				    </el-table-column>
    				    <el-table-column
    				      prop="age"
    				      label="年龄">
    				    </el-table-column>
    				    <el-table-column
    				      prop="phone"
    				      label="手机">
    				    </el-table-column>
    				    <el-table-column
    				      fixed="right"
    				      label="操作"
    				      width="100">
    				      <template slot-scope="scope">
    				      	<el-button
    				          size="mini"
    				          type="danger"
    				          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>  删除</el-button>
    				      </template>
    				    </el-table-column>
    				  </el-table>
    			</el-col>
  		  </el-row>
  	  </el-col>
      <el-col :span='24' v-if='!dataExist' style='margin-top: 15px;'>
        <span  style='font-size: 20px;letter-spacing: 7px;font-weight: bold;'>没有成员</span>
      </el-col>
      <el-col :span='24' style='margin-top: 10px;margin-bottom: 20px;'>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageSize"
          @current-change='sizeChange'
          v-if='turnInto'
          >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'user',
  data () {
    return {
      turnInto: true,
      loading: true,
      dataExist: true,
      bread: ['我的工作台','成员'],
      department: [],
      department_: [],
      view_: true,
      depdId: '',
      tableData: [],
      pageSize: 10
    }
  },
  methods: {
  	add (){
  		this.$router.push('search');
  	},
  	back (){
  		if(this.turnInto){
  			return;
  		}else{
  			this.turnInto = true;
  			this.tableData = [];
  			this.bread.pop();
  		}
  	},
  	open (key,index){
      if(key.deptId == undefined){
        return;
      }
      this.depdId = key.deptId;
  		this.turnInto = false;
  		this.bread.push(key.deptName);
  		axios.get('department/getStaffList',{
  			params: {
  				id: key.deptId
  			}
  		}).then(function(res){
  			if(res.data.status == '1'){
  				this.tableData = res.data.result;
  			}else{
  				this.$message.error(`错误：${res.data.msg},获取员工失败，请联系管理员`);
  			}
  		}.bind(this)).catch(function(err){
  			this.$message.error('服务器异常，获取员工失败，请联系管理员');
  		}.bind(this));
  	},
  	handleDelete (index, row){
      // alert(JSON.stringify(row)+'GroupId:'+this.depdId);
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('administrator/leaveGroup',{
            depdId: this.depdId,
            userId: row.userId
          }).then( function(res){
            if(res.data.status == '1'){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }else{
              this.$message({
                message: '删除失败',
                type: 'warning'
              });
            }
            let key_ = {'deptId':  this.depdId};
            this.open(key_ , 0);
          }.bind(this)).catch( function(err){
            this.$message({
                message: '服务器异常，请联系管理员',
                type: 'warning'
              });
          }.bind(this));
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          return;          
        });
  	},
  	getGroup (){
      if(sessionStorage.getItem("Login")){
        axios.get('administrator/getGroup').then(function(res){
          if(res.data.status == '1'){
            if(res.data.result[0] == ''){
              this.dataExist = false;
            }else{
              let deptArr = res.data.result[0];
              for(var i=0;i<deptArr.length;i++){
                deptArr[i].name = res.data.result[1];
              };
              
              if(deptArr.length <= 8){
                this.pageSize = 10;
              }else{
                this.pageSize = Math.floor(deptArr.length % 8) == 0?Math.floor(deptArr.length / 8) * 10:Math.floor(deptArr.length / 8) * 10 + 10;
              }

              if(deptArr.length <= 8){
                this.department = deptArr;
              }else{
                this.department_ = deptArr;
                for(let i=0; i<8; i++){
                  this.department[i] = deptArr[i];
                }
              }
              
              this.dataExist = true;
            }
            this.loading = false;
          }else{
            this.$message.error('获取部门失败，请联系管理员');
            this.loading = false;
            this.dataExist = false;
          }
        }.bind(this)).catch(function(err){
          this.$message.error('服务器异常，获取部门失败，请联系管理员');
          this.loading = false;
          this.dataExist = false;
        }.bind(this));
      }else{  
        this.$message.error('非法进入，请先登录');
        this.dataExist = false;
      }
    },
    sizeChange (index){
        this.department = [];
        this.loading = true;
        setTimeout(()=>{
          for(let i=0; i<8; i++){
            if(this.department_[i+(index-1)*8] != undefined){
              this.department[i] = this.department_[i+(index-1)*8];
            }else{
              break;
            }
          }
          this.loading = false;
        },500);
    }
  },
  mounted (){
  	this.getGroup();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	/*border:1px solid #000;*/
	/*height: 50px;*/
	margin-top: 25px;
	margin-left: 20px;
	/*padding-top: 10px;*/
}
.control{
	/*border:1px solid #000;*/
	margin-top: 15px;
	margin-bottom: 15px;
}
.time {
    font-size: 10px;
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
    height: 190px;
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
  .head_pic{
  	width: 50px;
  	height: 50px;
  }
</style>
