<template>
  <div id="blogCount">
    <div class="dateCount">
      <div class="date_general">总览</div>
      <div class="date">
        <div class="date_article">
          <i class="iconfont icon-yuan_shuji"></i>
          <span class="count_number"> {{ website_log.art_count }}</span>
          <span class="count_name">文章</span>
        </div>
        <div class="date_banner">
          <i class="iconfont icon-biaoji"></i>
          <span class="count_number"> {{ website_log.banner_count }}</span>
          <span class="count_name">微语</span>
        </div>
        <div class="date_comment">
          <i class="iconfont icon-pinglun"></i>
          <span class="count_number"> {{ website_log.comment_count }}</span>
          <span class="count_name">评论</span>
        </div>
      </div>
    </div>
    <!-- 统计 -->

    <div class="echarts_data">
      <div class="date_general">统计</div>

      <div id="main" style="width: 700px; height: 400px"></div>

      <div id="artCount" style="width: 700px; height: 300px"></div>
      <div class="date_general">分类统计</div>
      <div id="artCategoryCount" style="width: 700px; height: 300px"></div>
    </div>
    <!-- 文章时间线 -->
    <div class="art_time_let">
      <template v-for="(item,index) in art_log">
      <div class="date_general">{{item.create_time}}</div>
      <ul class="time_line">
        <li v-for="(items,i) in item.month_art">
          <span>{{(items.create_time)}}</span>
          <i class="iconfont icon-pinglun"></i>
          <span>{{items.article_title}}</span>
        </li>
     
      </ul>
    </template>
    </div>
  </div>
</template>
  <script>
import { calculateDiffTime } from "../../assets/util/timestamp";
import CommentVue from "../../components/comment/Comment.vue";
export default {
  data() {
    return {
      website_log: [],
      bar:[],
      xDatas:[],
      art_log:[],
      //bar 
      bar_option:{
        color: ["#79BBFF", "#67C23A"],
        title: {
          text: "站点统计",
          textStyle: {
            color: "#FFF",
          },
          subtext: "数量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["数量", "指数"],
          textStyle: {
            color: "#FFF",
          },
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: ['用户', '文章', '评论', '微语', '阅读', '访问' ,'活跃', 'vue', 'tp6','es6'],
            axisLabel: {
              textStyle: {
                color: "#FFF",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#FFF",
              },
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",

            // data: [2, 4.9, 7.0, 23.2, 28.6, 76.7, 23, 12.2, 32.6, 20.0],
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "指数",
            type: "bar",
            data: [2.0, 3.9, 5.0, 8.2, 5.6, 11.7, 3, 1.2, 2.6, 1.0],
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      },
      line_chart_option:{
        color: ["#1E90FF"],
        title: {
          left: "center",
          text: "文章发布时间统计",
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: {
          type: "category",
          data: [
           
          ],
          axisLabel: {
            textStyle: {
              color: "#FFF",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#FFF",
            },
          },
        },
        series: [
          {
            data: [],
            type: "line",
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      }
    };
  },
  components: {
    CommentVue,
  },
  created() {
    this.get_art_amount();
    this.get_art_log();
    // this.get_bar();

  },
  mounted() {
    this.drawChart();
    this.drawChartArt();
    this.drawChartCategory();
  },
  methods: {
    //文章log
    async get_art_log(){
      const { data: res } = await this.$api.website.get_art_log();
      this.art_log = res.data;
      console.log("art_log", this.art_log);
    },
    /**
     * 站点记录
     */
    async get_art_amount() {
      const { data: res } = await this.$api.website.get_art_amount();
      this.website_log = res.data;
      console.log("station", res.data);
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
  
  
      // console.log('newDate',newDate); 
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = this.bar_option;
      
      let barXdate = []; 
      this.$api.website.get_bar().then(res=>{
      console.log("bar", res.data.data);
        barXdate.push(res.data.data);
        let arr = barXdate[0];
         let ne = [];
          ne.push(Object.values(arr))
          this.bar_option.series[0].data =  ne[0];
          myChart.setOption(option);
      
      // }
     });
      // 使用刚指定的配置项和数据显示图表。
      // this.get_bar();
    },
    drawChartArt() {
      let myChart = this.$echarts.init(document.getElementById("artCount"));
      let option = this.line_chart_option;
      this.$api.website.get_line_chart().then(res=>{
        let chartArr =  res.data.data;
        console.log("line_chart", res.data.data);
        let xSeries =[];
        let xAxisData = [];
        chartArr.map(item=>{
          xSeries.push(item.create_time)
        })
        chartArr.map(item=>{
          xAxisData.push(item.month_art)
        })
        this.line_chart_option.series[0].data =  xAxisData;
        this.line_chart_option.xAxis.data = xSeries;
        console.log('fffff',xAxisData)
      myChart.setOption(option);

      })
    },
    drawChartCategory() {
      let myChart = this.$echarts.init(
        document.getElementById("artCategoryCount")
      );
      let option = {
        title: {
          text: "分类统计图",
          left: "center",

          textStyle: {
            color: "#FFF",
            fontSize: 16,
          },
        },
        radar: {
          center: ["50%", "54%"],
          // shape: 'circle',
          indicator: [
            { name: "杂七杂八", max: 6500 },
            { name: "踩坑记录", max: 16000 },
            { name: "每日一练", max: 30000 },
            { name: "值得一看", max: 38000 },
            { name: "实用干货", max: 52000 },
            { name: "闲言碎语", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
  <style lang="less" scoped>
.date_general {
  padding: 20px 0px;
  font-size: 24px;
  font-weight: 700;
}
#blogCount {
  padding: 20px;

  color: #ffffffcc;
  .dateCount {
    .date_general {
      padding: 10px 0px;
      font-size: 24px;
      font-weight: 700;
    }
    .date {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      div {
        padding: 20px;
        width: 227px;
        height: 80px;
        color: white;
        border-radius: 10px;
        // border: 1px solid red;
        position: relative;
        i {
          position: absolute;
          top: 30px;
        }
        .count_name {
          top: 44px;
          right: 60px;
          font-size: 16px;
          color: #ffffffcc;
          position: absolute;
        }
        .count_number {
          top: 22px;
          right: 60px;
          font-size: 30px;
          position: absolute;
        }
      }
      .date_article {
        background: rgba(23, 162, 184, 0.9);
        i {
          font-size: 50px;
        }
      }
      .date_banner {
        background: rgba(13, 110, 253, 0.8);
        i {
          font-size: 50px;
        }
      }
      .date_comment {
        background: rgba(40, 167, 69, 0.9);
        i {
          font-size: 50px;
        }
      }
    }
  }
  //统计
  .echarts_data {
    padding-bottom: 30px;
    .date_general {
      padding: 20px 0px;
      font-size: 24px;
      font-weight: 700;
    }
    #main,
    #artCount,
    #artCategoryCount {
      margin-left: auto;
      margin-right: auto;
    }
  }
  //文章时间钱
  .art_time_let{

    .time_line{
      padding-left: 50px;
      li{
        width: 600px;
        padding: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        i{
          padding: 0 5px;
        }
      }
    }
  }
}
</style>