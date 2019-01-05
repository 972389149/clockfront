<template>
  <div>
    <el-row>
  	  <el-col :span="24" style='border-bottom: 1px solid #E6E6E6'>
  	  	<el-row>
    		  <el-col :span="16">
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
    		  <el-col :span="8">
    		  	<div class="grid-content bg-purple">
    		  		<div class='control'>
    		  			<el-button type="primary" plain icon="el-icon-view" size='small' @click='look'>查看</el-button>
    		  			<el-button type="primary" plain icon="el-icon-circle-plus-outline" size='small' @click='add'>添加</el-button>
    					<el-button type="primary" plain icon="el-icon-delete" size='small' @click='del'>删除</el-button>
    					<el-button type="primary" plain icon="el-icon-edit" size='small' @click='edit'>编辑</el-button>
    		  		</div>
    		  	</div>
    		  </el-col>
    		</el-row>
    	</el-col>
  	  <el-col :span="24" v-loading="loading" v-if='dataExist'>
  	  	<el-row style='margin: 10px 10px 0 10px'>
    		  <el-col :span="5" v-for='(dep,$index) in department' style='margin: 10px 10px 0 10px'>
    		    <el-card :body-style="{ padding: '0px' }" shadow="hover" style='border-color: #e6e6e6;cursor: pointer;'>
    		      <img src="../../static/img/group.jpg" class="image" @click='open(dep.deptId,$index)'>
    		      <div style="padding: 14px;" @click='open(dep.deptId,$index)'>
    		        <span>{{dep.deptName}}</span>
    		        <div class="bottom clearfix">
    		          <time class="time">管理员 : {{dep.name}}</time>
    		          <!-- <br><br>
    		          <time class="time">部门人数： {{dep.quantity}}</time> -->
    		          <br>
    		          <span style='float: right;' v-if='view_'><i class="el-icon-view"></i></span>
    		          <span style='float: right;' v-if='delete_'><i class="el-icon-delete"></i></span>
    		          <span style='float: right;' v-if='edit_'><i class="el-icon-edit"></i></span>
    		        </div>
    		      </div>
    		    </el-card>
    		  </el-col>
    		</el-row>
  	  </el-col>
      <el-col :span='24' v-if='!dataExist' style='margin-top: 15px;'>
        <span  style='font-size: 20px;letter-spacing: 7px;font-weight: bold;'>没有部门</span>
      </el-col>
      <el-col :span='24' style='margin-top: 50px;'>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageSize"
          @current-change='sizeChange'>
        </el-pagination>
      </el-col>
	  </el-row>
	<!-- 这是'添加'弹出的内容 -->
	<el-dialog title="添加部门" :visible.sync="dialogFormVisibleAdd"  width="650px" top='10vh'>
	  <el-form :model="form">
	    <el-form-item label="部门名称" :label-width="formLabelWidth">
	      <el-input v-model="form.name" autocomplete="off" maxlength = '8'></el-input>
	    </el-form-item>
	    <el-form-item label="打卡日期" :label-width="formLabelWidth">
	      <el-date-picker
		      type="dates"
		      v-model="form.date"
		      format="yyyy 年 MM 月 dd 日"
      		  value-format="yyyy-MM-dd"
		      placeholder="选择一个或多个日期">
		    </el-date-picker>
	    </el-form-item>
	    <el-form-item label="打卡时间" :label-width="formLabelWidth">
	      <el-time-select
		    placeholder="起始时间"
		    v-model="form.startTime"
		    :picker-options="{
		      start: '06:00',
		      step: '00:15',
		      end: '22:00'
		    }">
		  </el-time-select>
		  <el-time-select
		    placeholder="结束时间"
		    v-model="form.endTime"
		    :picker-options="{
		      start: '06:00',
		      step: '00:15',
		      end: '22:00',
		      minTime: form.startTime
		    }">
		  </el-time-select>
	    </el-form-item>
	    <el-form-item label="地址" :label-width="formLabelWidth" maxlength = '50'>
	      <el-input v-model="form.address" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="cancelAdd">取 消</el-button>
	    <el-button type="primary" @click="submit_(typeOpen)">确 定</el-button>
	  </div>
	</el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'group',
  data () {
    return {
      loading: true,
      dataExist: true,
      bread: ['我的工作台','部门','查看'],
      department: [],
      department_: [],
      view_: true,
      delete_: false,
      edit_: false,
   	  dialogFormVisibleAdd: false,
      typeOpen: 0,
      form: {
      		name: '',
      		date: '',
      		address: '',
      		startTime: '',
      		endTime: '',
          id: ''
       },
       formLabelWidth: '80px',
       tableData:[],
       pageSize: 10
    }
  },
  methods: {
  	getGroup (){
  		if(sessionStorage.getItem("Login")){
  			axios.get('administrator/getGroup').then(function(res){
  				if(res.data.status == '1'){
  					if(res.data.result[0] == ''){
              this.dataExist = false;
            }else{
              this.dataExist = true;

              let deptArr = res.data.result[0];
              for(var i=0;i<deptArr.length;i++){
                deptArr[i].name = res.data.result[1];
              };

              if(deptArr.length <= 8){
                this.pageSize = 10;
              }else{
                this.pageSize = Math.floor(deptArr.length / 8) * 10 + 10;
              }

              if(deptArr.length <= 8){
                this.department = deptArr;
              }else{
                this.department_ = deptArr;
                for(let i=0; i<8; i++){
                  this.department[i] = deptArr[i];
                }
              }
            }

  					this.loading = false;
  				}else{
            this.dataExist =false;
  					this.$message.error('获取部门失败，请联系管理员');
  					this.loading = false;
  				}
  			}.bind(this)).catch(function(err){
          this.dataExist = false;
  				this.$message.error('服务器异常，获取部门失败，请联系管理员');
  				this.loading = false;
  			}.bind(this));
  		}else{	
        this.dataExist = false;
  			this.$message.error('非法进入，请先登录');
  		}
  	},
  	look (){
  		this.$message({
          message: '目前处于查看状态，点击部门查看详细信息',
          type: 'warning'
        });
        this.getGroup();
  		this.bread[2] = '查看';
  		this.view_ = true;
  		this.delete_ = false;
  		this.edit_ = false;
  	},
  	add (){
  		this.bread[2] = '删除';
      this.form = {
          name: '',
          date: '',
          address: '',
          startTime: '',
          endTime: '',
          id: ''
       };
      this.typeOpen = 0;
  		this.dialogFormVisibleAdd = true;
  	},
  	del (){
  		this.$message({
        message: '目前处于删除状态，选择点击部门可进行删除，请谨慎操作',
        type: 'warning'
      });
      this.bread[2] = '删除';
  		this.view_ = false;
  		this.delete_ = true;
  		this.edit_ = false;
  	},
  	edit (){
  		this.$message({
        message: '目前处于编辑状态，选择点击部门可进行编辑，请谨慎操作',
        type: 'warning'
      });
      this.bread[2] = '编辑';
  		this.view_ = false;
  		this.delete_ = false;
  		this.edit_ = true;
  	},
    editOne (key){
      axios.get('department/getOneGroup',{
        params: {
          'id': key
        }
      }).then(function(res){
        if(res.data.status == '1'){
          this.dialogFormVisibleAdd = true;
          // this.tableData = res.data.result.staffList;.
          this.form.name = res.data.result.name;
          this.form.date = res.data.result.clockDate.date;
          this.form.startTime = res.data.result.clockList[0].clockStart;
          this.form.endTime  = res.data.result.clockList[0].clockEnd;
          this.form.address = res.data.result.address[0];
          this.form.id = res.data.result._id;
        }else{
          this.$message.error('服务器异常，获取部门信息失败。');
        }
        this.loading = false;
      }.bind(this)).catch(function(err){
        this.$message.error('服务器异常，获取部门信息失败。');
        this.loading = false;
      }.bind(this));
    },
    submitEdit(){
      alert(this.form.id);
    },
  	open (key,index){
      this.form = {
          name: '',
          date: '',
          address: '',
          startTime: '',
          endTime: '',
          id: ''
       }
  		if(this.view_){
  			this.view(key);
  		}else if(this.delete_){
  			this.delete(key);
  		}else{
        this.typeOpen = 1;
        this.editOne(key);
  		}
  	},
  	view (key){
  		this.loading = true;
  		axios.get('department/getOneGroup',{
  			params: {
  		    'id': key
  			}
  		}).then(function(res){
  			if(res.data.status == '1'){
  				this.tableData = res.data.result.staffList;
  				console.log(this.tableData)
  				this.$alert('<p>部门名称：'+res.data.result.name+'</p><p>管理人：'+res.data.result.administrator.administratorName+'</p><p>管理人手机：'+res.data.result.administrator.administratorPhone+'</p><p>打卡天数：'+res.data.result.clockDate.duration+'</p><p>打卡日期：'+res.data.result.clockDate.date+'</p><p>打卡时间：'+res.data.result.clockList[0].clockStart+' 至 '+res.data.result.clockList[0].clockEnd+'</p><p>部门人数：'+res.data.result.quantity+'</p><p>地址：'+res.data.result.address[0]+'</p>', res.data.result.name, {
  	          dangerouslyUseHTMLString: true
  	        });
  			}else{
  				this.$message.error('服务器异常，获取部门信息失败。');
  			}
  			this.loading = false;
  		}.bind(this)).catch(function(err){
  			this.$message.error('服务器异常，获取部门信息失败。');
  			this.loading = false;
  		}.bind(this));
  	},
  	delete (key){
  		this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('department/deleteGroup',{
          	'id': key
          }).then(function(res){
          	if(res.data.status == '1'){
          		this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
          		this.getGroup();
          	}else{
          		this.$message.error('删除部门失败，请联系管理员。');
          	}
          }.bind(this)).catch(function(err){
          	this.$message.error('删除部门失败，请联系管理员。');
          }.bind(this));
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  	},
  	cancelAdd (){
  		this.dialogFormVisibleAdd = false;
  		this.look();
  	},
    submit_ (type){
      if(type == 0){
        this.submitAdd();
      }else{
        this.submitEdit();
      }
    },
  	submitAdd (){
  		axios.post('department/addGroup',{
  			'name': this.form.name,
  			'clockDate': {
  				'date': this.form.date,
  				'duration': this.form.date.length,
  				'type': 1,
  			},
  			'clockDayTimes': 1,
  			'clockList': [{
  				'clockStart': this.form.startTime,
  				'clockEnd': this.form.endTime
  			}],
  			'quantity': 0,
  			'staffList': [],
  			'address': [this.form.address,0,0]
  		}).then(function(res){
  			if(res.data.status == '1'){
  				this.$message({
		          message: '添加部门成功',
		          type: 'success'
		        });
  			}else{
  				this.$message.error('添加部门失败，请联系管理员。');
  			}
  		}.bind(this)).catch(function(err){
  			this.$message.error('服务器异常，请联系管理员。');
  		}.bind(this));

  		this.dialogFormVisibleAdd = false;
      this.pageSize = 10;
  		this.getGroup();
  		this.bread[2] = '查看';
  		this.view_ = true;
  		this.delete_ = false;
  		this.edit_ = false;
  	},
    sizeChange (index){
        this.department = [];
        for(let i=0; i<8; i++){
          if(this.department_[i+(index-1)*8] != undefined){
            this.department[i] = this.department_[i+(index-1)*8];
          }else{
            break;
          }
        }
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
	margin-top: 25px;
	margin-left: 20px;
}
.control{
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
</style>
