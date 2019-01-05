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
    		  	<div>
    		  		<div class='control'>
    		  			<el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
    		  		</div>
    		  	</div>
    		  </el-col>
  		  </el-row>
	    </el-col>
      <el-col :span='21' style='margin-top: 20px;text-align: center;'>
        <div v-show='false'>
          <router-link id='num'  :to ="{name:'numberChart'}">1</router-link>
          <router-link id='plac' :to ="{name:'placeChart'}">2</router-link>
          <router-link id='user'  :to ="{name:'userChart'}">3</router-link>
        </div>
        <router-view></router-view>
      </el-col>
      <el-col :span='3'>
          <el-tabs tab-position="right" style="height: 100%;" v-model='activeName' @tab-click='to'>
            <el-tab-pane label="打卡人数记录" name='number'></el-tab-pane>
            <el-tab-pane label="打卡地点记录" name='place'> </el-tab-pane>
            <el-tab-pane label="成员打卡记录" name='user'></el-tab-pane>
          </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'record',
  data () {
    return {
      bread: ['我的工作台','记录'],
      options: [],
      value: '',
      number: true,
      place: false,
      time: false,
      activeName: 'number',
      numberOption: {
        title: { 
          text: '部门打卡',
          left:'center'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05', '2018-10-06', '2018-10-07','2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11', '2018-10-12', '2018-10-13', '2018-10-14'],
            name: '日期'
        },
        yAxis: {
            type: 'value',
            name: '人数'
        },
        series: [{
            data: [10, 9, 8, 7, 6, 2, 4, 10, 9, 9, 7, 6, 6, 8],
            type: 'line'
        }]
      },
      placeOption: {

      },
      timeOption: {

      }
    }
  },
  methods: {
      getGroup (){
        this.options = [];
        axios.get('administrator/getGroup').then(function(res){
          if(res.data.status == '1'){
            if(res.data.result[0] == ''){
              this.$message.error(`你目前不是部门管理员，请先创建部门。`);
            }else{
              let  obj_ = [];
              for(var i=0; i<res.data.result[0].length; i++){
                var obj = {
                  'label' : res.data.result[0][i].deptName,
                  'value': res.data.result[0][i].deptId
                }
                obj_.push(obj);
              }
              this.options = obj_;
            }
          }else{
            this.$message.error(`获取部门列表失败，请联系管理员。`);
          }
        }.bind(this)).catch(function(err){
          this.$message.error(`服务器异常：${err}，请联系管理员。`);
        }.bind(this));
      },
      to (){
        switch(this.activeName){
          case 'number':
            document.getElementById('num').click();
            break;
          case 'place':
            document.getElementById('plac').click();
            break;
          case 'user':
            document.getElementById('user').click();
            break;
        }
      }
    },
    mounted (){
      this.getGroup();
      this.$router.push({name:'numberChart'});
    },
    watch: {

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
</style>
