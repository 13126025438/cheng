<template>
  <div id="stations">
    <!-- 站点日志 -->
    <div class="use_http" v-for="(item, index) in website_log" :key="index">
      <span class="sp_title">站点日志</span>
      <ul class="http_date">
        <li>
          <i></i><span>用户总数： {{ item.user_count }} 位</span>
        </li>
        <li>
          <i></i><span>置顶文章： {{ item.top_article }} 篇</span>
        </li>
        <li>
          <i></i><span>标签总数： {{ item.banner_count }} 条</span>
        </li>
        <li>
          <i></i><span>文章总数： {{ item.article_count }} 篇 </span>
        </li>
        <li>
          <i></i><span>微语总数： {{ item.banner_count }} 条 </span>
        </li>
        <li>
          <i></i
          ><span
            >运行天数：
            {{
              calculateDiffTime(
                item.operation,
                Math.round(new Date().getTime() / 1000).toString(),
                4
              )
            }}
          </span>
        </li>
        <li>
          <i></i><span>最近更新： {{ item.create_time }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { calculateDiffTime } from '../../assets/util/timestamp';
export default {
  data() {
    return {
        calculateDiffTime:calculateDiffTime,//时间可视化
      //站点日志
      website_log: [],
    };
  },
  created(){
    this.get_station();

  },
  methods:{
      /**
     * 站点记录
     */
     async get_station(){
        const {data:res} = await this.$api.it.station();
        this.website_log = res.data;
        console.log('station',this.website_log)
      },
  }
};
</script>
<style lang="less" scoped>
#stations{
    // 站点日志 121212
.use_http {
  width: 277px;
  // height: 300px;
  bottom: 32px;
  padding-bottom: 12px;
  color: #ffffffcc;
  border-radius: 10px;
  margin-bottom: 28px;
  background-color: #1f1b24;
  .sp_title {
    display: block;
    padding: 20px;
  }
  .http_date {
    padding: 0px 20px;
    li {
      display: flex;
      font-size: 13px;
      i {
        font-size: 16px;
        color: #17a2b8;
      }
      padding: 5px 0px;
    }
  }
}
}
</style>