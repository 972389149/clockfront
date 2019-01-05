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
      userOption: {
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
            data: ['2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05', '2018-10-06', '2018-10-07','2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11', '2018-10-12', '2018-10-13', '2018-10-14'],
            name: '日期'
        },
        yAxis: {
            type: 'value',
            name: '距离8:30还有'
        },
        series: [{
            data: [0,2,6,8,8,4,16,14,12,18,20,20,22,24,28],
            type: 'line',
            smooth: true
        }]
      }
    }
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.userOption);
    }
  },
  mounted (){
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
