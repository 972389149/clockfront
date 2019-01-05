<template>
  <div>
    <el-row style='padding: 0px 10px 0px 10px'>
      <el-col :span='24' style='text-align: left;font-size: 14px;margin: 0px 0px 10px 10px;color: #C0C4CC' v-if='!showChart'>
        *单击一个用户查看TA详细的打卡记录
      </el-col>
      <el-col :span='24' v-if='!showChart'>
        <el-col :span='4' v-for='user in users' style='margin-left: 10px;'>
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img src="../../../static/img/user.jpg" class="image">
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
      timeOption: {
      	
      },
      users: [{
        userId: '123',
        phone: '1234',
        name: '陈于希',
        image: '1234.jpg'
      },{
        userId: '123',
        phone: '1234',
        name: '陈1希',
        image: '1234.jpg'
      },{
        userId: '123',
        phone: '1234',
        name: '陈2希',
        image: '1234.jpg'
      },{
        userId: '123',
        phone: '1234',
        name: '陈3希',
        image: '1234.jpg'
      }]
    }
  },
  methods: {
     drawTime(){
        // var myChart = this.$echarts.init(document.getElementById('time'));
        // 绘制图表
        // myChart.showLoading();
        // myChart.setOption(this.timeOption);
        // myChart.hideLoading();
      },
      open (key){
        this.showChart = true;
        this.$router.push({name: 'userOneChart', params :{id: key}});
      },
      back (){
        this.showChart = false;
        this.$router.push('/chief/record/userChart');
      }
  },
  mounted (){
      // this.drawTime();
  },
  watch: {
      
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
