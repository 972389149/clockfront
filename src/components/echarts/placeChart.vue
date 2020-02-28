<template>
  <div>
    <el-row>
    	<el-col :span='24'>
            <div id="place" :style="{width: '100%', height: '400px'}"></div> 
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'placeChart',
  data () {
    return {
      
    }
  },
  methods: {
      drawPlace(){
        console.log(`位置检测到变化${this.$route.query.id}`)
        let placeOption;
        let that = this;
        async function getAddress(){
            let result1 = await new Promise((resolve, reject)=>{
                axios.get('department/getOneGroup',{
                    params: {
                      'id': that.$route.query.id
                    }
                }).then((res)=>{
                    if(res.data.status == '1'){
                      let arr = [];
                      arr.push(res.data.result.address[1]);
                      arr.push(res.data.result.address[2]);
                      let arr1 = [];
                      arr1.push(arr);
                      resolve(arr1);
                    }else{
                        reject();
                    }
                  }).catch((err)=>{
                    reject();
                  });
            })
            let result2 = await new Promise((resolve, reject)=>{
                axios.get('departmentRecord/hasClocked',{
                  params: {
                    'id': that.$route.query.id
                  }
                }).then((res)=>{
                    // console.log(res.data.result);
                    if(res.data.status == '1'){
                        // console.log(res.data.result);
                        let arr = [];
                        for(let i=0;i<res.data.result.length;i++){
                            let str = res.data.result[i].clockAddress;
                            let arr_ = str.split(',');
                            arr_[0] = arr_[0].substring(1,arr_[0].length);
                            arr_[1] = arr_[1].substring(0,arr_[0].length-2);
                            arr.push(arr_)
                        }
                        resolve(arr)
                    }else{
                        reject();
                    }
                }, (err)=>{
                    reject(err);
                })
            })
            // console.log({'arr1': result1, 'arr2': result2})
            return {'arr1': result1, 'arr2': result2};
        }
        getAddress().then((result)=>{
            let myChart = that.$echarts.init(document.getElementById('place'));
            placeOption = {
                title: { 
                    text: '打卡地点',
                    left:'center'
                },
                xAxis: {
                    scale: true,
                    name: '纬度'
                },
                yAxis: {
                    scale: true,
                    name: '经度',
                },
                series: [{
                    type: 'effectScatter',
                    symbolSize: 20,
                    data: result.arr1
                }, {
                    type: 'scatter',
                    data: result.arr2,
                  }]
              }
              myChart.setOption(placeOption);
        }, (err)=>{
            that.$message.error('服务器异常，获取部门信息失败。');
            that.loading = false;
        })
        // 绘制图表
        // myChart.showLoading();
        // myChart.hideLoading();
      }
  },
  mounted (){
      this.drawPlace()
  },
  watch: {
      "$route": 'drawPlace'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
