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
      hasChangeId: ''
    }
  },
  methods: {
      drawNumber(){
        console.log(`人数检测到变化${this.$route.query.id}`)
        let that = this;
        var myChart = this.$echarts.init(document.getElementById('number'));
        axios.get('departmentRecord/hasClocked',{
          params: {
            'id': this.$route.query.id
          }
        }).then((res)=>{
          if(res.data.status == '1'){
            // console.log('来了')
            let arr = [];
            let array1 = [];
            for(let i=0;i<res.data.result.length;i++){
              array1.push(res.data.result[i].clockDate);
              arr.push({
                'clockDate': res.data.result[i].clockDate,
                'number': 0
              })
            }
            for(let i=0;i<array1.length;i++){
              for(let j=0;j<arr.length;j++){
                if(array1[i] == arr[j].clockDate){
                  arr[j].number ++;
                }
              }
            }
            let arr2 = [];
            for(let i=0;i<arr.length;i++){
              arr2.push(arr[i].number);
            }
            let numberOption = {
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
                  data: array1,
                  name: '日期'
              },
              yAxis: {
                  type: 'value',
                  name: '人数'
              },
              series: [{
                  data: arr2,
                  type: 'line'
              }]
            }
            myChart.setOption(numberOption);
          }else{
            this.$message.error(`获取部门列表失败，请联系管理员。`);
          }
        }).catch((err)=>{
          this.$message.error(`服务器异常：${err}，请联系管理员。`);
        });
        // 绘制图表
        // myChart.showLoading();
        // console.log(this.numberOption)
        // myChart.setOption(this.numberOption);
        // myChart.hideLoading();
      }
  },
  mounted (){
      // this.hasChangeId = this.$route.query.id;
      this.drawNumber();
  },  
  watch: {
      // hasChangeId (){
      //   console.log(`watch到${this.$route.query.id}`)
      // }
      "$route": 'drawNumber'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
