<template>
  <div id="random">
    <!-- 随机文章 -->
    <div class="use_http">
      <span class="sp_title">随机文章</span>
      <ul class="random_img">
        <li
          v-for="(item, index) in random_article"
          :key="index"
          style="cursor: pointer"
          @click="getShow(item)"
        >
          <a :style="{ backgroundImage: `url(${item.article_img})` }"></a>
          <div class="img_link">
            <span>{{ item.create_time }}</span>
            <span class="rand_title">
              <i class="iconfont" :class="item.article_icon"></i>
              {{ item.article_title }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        random_article:[],
    };
  },
  created() {
    this.rand_article()

  },
  methods: {
       /**
     * 随机文章
     */
    async rand_article(){
      const {data:res} = await this.$api.article.get_rand_art();
      console.log(res);
      if(res.code == 10000){
        this.random_article = res.data;
      }
      if(res.code == 10004){
        this.$message.error(res.msg)
      }
    },
    /**
     * 跳转getShow展示页面
     * @param {*} item 
     */
    getShow(item) {
      this.$router.push({ path: "/show", query: { item } });
    },
  },
};
</script>
<style lang="less" scoped>

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
.random_img {
  margin-left: 25px;
  li {
    width: 219px;
    height: 112px;
    margin-bottom: 20px;
    position: relative;
    a {
      display: block;
      width: 100%;
      height: 100%;
      background-image: url("https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/6144d4e4fba7e4a66d06431448f1ad25.jpg");
      background-position: center;
      background-size: cover;
      border-radius: 6px;
    }
    .img_link {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 6px;
      left: 10px;
      color: white;
      font-size: 12px;
      .rand_title {
        display: flex;
        width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>