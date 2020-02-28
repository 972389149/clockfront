<template>
  <div>
    <el-row>
      <el-col :span='24'>
        <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'userOneChart',
  data () {
    return {
      
    }
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));

        axios.get('departmentRecord/userHistory',{
            params: {
              userId: this.$route.query.userId,
              depdId: this.$route.query.depdId
            }
          }).then(function(res){
            if(res.data.status == '1'){
              // myChart.setOption(this.userOption);
              let result = res.data.result;
              let arr1 = [],arr2  = [];
              for(let i=0; i<result.length; i++){
                arr1.push(result[i].clockDate);
                arr2.push(result[i].clockTime.split(':').join(''));
              }
              console.log(`${arr1}:${arr2}`);
              let userOption = {
                title: { 
                  text: '成员打卡时间记录',
                  left:'center'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    },
                    right: '80px'
                },
                xAxis: {
                    type: 'category',
                    data: arr1,
                    name: '日期'
                },
                yAxis: {
                    type: 'value',
                    name: '打卡时间'
                },
                series: [{
                    data: arr2,
                    type: 'line',
                    smooth: true
                }]
              }
              myChart.setOption(userOption);
            }else{
              this.$message.error(`错误：${res.data.msg},获取员工失败，请联系管理员`);
            }
          }.bind(this)).catch(function(err){
            this.$message.error('服务器异常，获取员工失败，请联系管理员');
          }.bind(this));

        // 绘制图表
        myChart.setOption(this.userOption);
    }
  },
  mounted (){
    console.log(`userId:${this.$route.query.userId}depdId:${this.$route.query.depdId}`)
    this.drawLine();
    // console.log(this.$route.params.id);
  },
  watch: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
