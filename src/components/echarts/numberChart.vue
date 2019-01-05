<template>
  <div>
    <el-row>
    	<el-col :span='24'>
        <div id="number" :style="{width: '100%', height: '400px'}"></div> 
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'numberChart',
  data () {
    return {
      numberOption: {
        title: { 
          text: '打卡人数',
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
      }
    }
  },
  methods: {
      drawNumber(){
        var myChart = this.$echarts.init(document.getElementById('number'));
        // 绘制图表
        // myChart.showLoading();
        myChart.setOption(this.numberOption);
        // myChart.hideLoading();
      }
  },
  mounted (){
      this.drawNumber();
  },  
  watch: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
