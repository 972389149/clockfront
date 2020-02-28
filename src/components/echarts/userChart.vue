<template>
  <div>
    <el-row style='padding: 0px 10px 0px 10px'>
      <el-col :span='24' style='text-align: left;font-size: 14px;margin: 0px 0px 10px 10px;color: #C0C4CC' v-if='!showChart'>
        *单击一个用户查看TA详细的打卡记录
      </el-col>
      <el-col :span='24' v-if='!showChart'>
        <el-col :span='4' v-for='user in users' style='margin-left: 10px;'>
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="user.headImg" class="image">
            <div style="padding: 8px;cursor: pointer;" @click='open(user.userId)'>
              <span style='font-size: 14px;'>{{user.name}}</span>
              <div class="bottom clearfix">
                <time class="time">手机: {{user.phone}}</time>
                <br>
                <el-button type="text" class="button" icon='el-icon-view' plain></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span='22' v-if='showChart'>
        <router-view></router-view>
      </el-col>
      <el-col :span='2' v-if='showChart'>
        <el-button icon="el-icon-back" @click='back' size='mini'>返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'userChart',
  data () {
    return {
      showChart: false,
      // timeOption: {
      	
      // },
      users: [],
      id: '',
      id1: '',
      key: ''
    }
  },
  methods: {
     getUser(){
        if(this.showChart){
          return;
        }else{
          this.id = this.$route.query.id;
          axios.get('department/getStaffList',{
            params: {
              id: this.id
            }
          }).then(function(res){
            if(res.data.status == '1'){
              this.users = res.data.result
            }else{
              this.$message.error(`错误：${res.data.msg},获取员工失败，请联系管理员`);
            }
          }.bind(this)).catch(function(err){
            this.$message.error('服务器异常，获取员工失败，请联系管理员');
          }.bind(this));
        }
      },
      open (key){
        this.showChart = true;
        this.key = key;
        this.$router.push({name: 'userOneChart', query :{userId: key,depdId: this.id}});
      },
      back (){
        this.showChart = false;
        // this.$router.push('/chief/record/userChart');
        this.$router.push({name: 'userChart', query :{id: this.id}});
      }
  },
  mounted (){
      this.getUser();
  },
  watch: {
      "$route": 'getUser'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    height: 120px;
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
