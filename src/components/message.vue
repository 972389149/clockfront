<template>
  <div>
    <el-row>
    	<el-col :span="24" style='border-bottom: 1px solid #E6E6E6'>
  	  		<el-row>
    		  <el-col :span="17">
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
    		  <el-col :span="6">
    		  	<div>
    		  		<div class='control' style="float: right;">
		  				<el-radio-group v-model="treat">
					      <el-radio-button label="已处理" ></el-radio-button>
					      <el-radio-button label="待处理" ></el-radio-button>
					    </el-radio-group>
		  			</div>
    		  	</div>
    		  </el-col>
  		    </el-row>
	    </el-col>
	    <el-col :span="24" v-if='showTreat'>
	    	<div>
	    		<el-table
				    :data="tableData1"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="date"
				      label="日期"
				      sortable>
				    </el-table-column>
				    <el-table-column
				      prop="departmentName"
				      label="申请部门">
				    </el-table-column> 
				    <el-table-column
				      prop="administratorName"
				      label="管理者">
				    </el-table-column>
				    <el-table-column
				      prop="userName"
				      label="用户">
				    </el-table-column>
				    <el-table-column
				      prop="userPhone"
				      label="用户手机">
				    </el-table-column>
				    <el-table-column
				      prop="type"
				      label="内容"
				      width="400">
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      label="操作"
				      width="100">
				      <template slot-scope="scope">
				      	<el-button
    				          size="mini"
    				          type="danger"
    				          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>  删除
    				    </el-button>
				      </template>
				    </el-table-column>
				</el-table>	
	    	</div>
	    </el-col>
	    <el-col :span="24" v-if='!showTreat'>
	    	<div>
	    		<el-table
				    :data="tableData2"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="date"
				      label="日期"
				      sortable>
				    </el-table-column>
				    <el-table-column
				      prop="departmentName"
				      label="申请部门">
				    </el-table-column> 
				    <el-table-column
				      prop="administratorName"
				      label="管理者">
				    </el-table-column>
				    <el-table-column
				      prop="userName"
				      label="用户">
				    </el-table-column>
				    <el-table-column
				      prop="userPhone"
				      label="用户手机">
				    </el-table-column>
				    <el-table-column
				      prop="type"
				      label="内容"
				      width="400">
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      label="操作"
				      width="100">
				      <template slot-scope="scope">
				      	<el-button
    				          size="mini"
    				          type="danger"
    				          @click="handleCancel(scope.$index, scope.row)"><i class="el-icon-delete"></i>  取消
    				    </el-button>
				      </template>
				    </el-table-column>
				</el-table>	
	    	</div>
	    </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'message',
  data () {
    return {
      bread: ['我的工作台','消息','已处理'],
      treat: '已处理',
      showTreat: true,
      tableData1: [],
      tableData2: []
    }
  },
  methods: {
  	getMsg (){
  		this.tableData1 = [];
  		this.tableData2 = [];
  		axios.get('initiativeMsg/getMsg').then(function(res){
  			if(res.data.status == '1'){
  				if(res.data.result.length == 0){
  					this.$message({
			          message: '没有消息哟',
			          type: 'warning'
			        });
  				}else{
  					for(var i=0; i<res.data.result.length ; i++){
  						if(res.data.result[i].type == -1){
  							let msgType = '你向'+ res.data.result[i].userName + '发出了邀请';
  							let msgObj = res.data.result[i];
  							msgObj.type = msgType;
  							msgObj.date = msgObj.date.slice(0,10);
  							this.tableData2.push(msgObj);
  						}else{
  							switch(res.data.result[i].type){
  								case 0:
  									var msgType = '你成功邀请' + res.data.result[i].userName + '加入' + res.data.result[i].departmentName;
  									var msgObj = res.data.result[i];
  									msgObj.type = msgType;
  									msgObj.date = msgObj.date.slice(0,10);
  									this.tableData1.push(msgObj);
  									break;
  								case 1:
  									var msgType = res.data.result[i].userName + '拒绝加入' + res.data.result[i].departmentName;
  									var msgObj = res.data.result[i];
  									msgObj.type = msgType;
  									msgObj.date = msgObj.date.slice(0,10);
  									this.tableData1.push(msgObj);
  									break;
  								case 2:
  									var msgType = '取消邀请' + res.data.result[i].userName + '加入' + res.data.result[i].departmentName;
  									var msgObj = res.data.result[i];
  									msgObj.type = msgType;
  									msgObj.date = msgObj.date.slice(0,10);
  									this.tableData1.push(msgObj);
  									break;
  								case 3:
  									var msgType = res.data.result[i].userName + '退出了' + res.data.result[i].departmentName;
  									var msgObj = res.data.result[i];
  									msgObj.type = msgType;
  									msgObj.date = msgObj.date.slice(0,10);
  									this.tableData1.push(msgObj);
  									break;
                  case 4:
                    var msgType = res.data.result[i].userName + '被踢出了' + res.data.result[i].departmentName;
                    var msgObj = res.data.result[i];
                    msgObj.type = msgType;
                    msgObj.date = msgObj.date.slice(0,10);
                    this.tableData1.push(msgObj);
                    break;
  							};
  						}
  					}
  				}
  			}else{
  				this.$message.error(`获取异常:${res.data.msg}，请联系管理员`);
  			}
  		}.bind(this)).catch(function(err){
  			this.$message.error('服务器异常，请联系管理员');
  		}.bind(this));
  	},
	handleDelete(index, row) {
	    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	axios.post('initiativeMsg/deleteMsg', {
			    'id': row._id
        	}).then(function(res){
        		if(res.data.status == '1'){
        			this.$message({
			            type: 'success',
			            message: '删除成功!'
			        });
			        this.getMsg();
        		}else{
        			this.$message({
			            type: 'success',
			            message: `删除失败!原因:${res.data.msg}`
			        });
        		}
        	}.bind(this)).catch(function(err){
        		this.$message.error('服务器异常，请联系管理员');
        	}.bind(this));
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          });          
        });
	},
	handleCancel(index, row) {
	    this.$confirm('此操作将取消邀请该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	axios.post('administrator/cancelInvite', {
			    'id': row._id,
			    'passivityMsgId': row.passivityMsgId
        	}).then(function(res){
        		if(res.data.status == '1'){
        			this.$message({
			            type: 'success',
			            message: '取消成功!'
			        });
			        this.getMsg();
        		}else{
        			this.$message({
			            type: 'success',
			            message: `取消失败!原因:${res.data.msg}`
			        });
        		}
        	}.bind(this)).catch(function(err){
        		this.$message.error('服务器异常，请联系管理员');
        	}.bind(this));
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          });          
        });
	}
  },
  watch: {
  	'treat': function(newVal){
  		if(this.treat == '已处理'){
  			this.bread[2] = '已处理';
  			this.showTreat = true;
  		}else{
  			this.bread[2] = '待处理';
  			this.showTreat = false;
  		}
  	}
  },
  mounted (){
  	this.getMsg();
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
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
