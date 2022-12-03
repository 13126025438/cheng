<template>
  <div id="centeritem">
    <!-- item -->
    <main id="main_item">
      <div class="content row vessel">
        <!-- left item -->
        <div class="item_left">
          <!-- 轮播图 -->
          <router-view/>
          <div id="postTop" v-if="this.$store.state.search.isShowSwiper">
            <!-- index span -->
            <swipers></swipers>
          </div>
          <!-- 文章 - 作品 -->
          <div class="article_page">
            <ArticleList></ArticleList>
          </div>
          <div class="pagination_box">
            <PageCutVue
              :total="total"
              :pageSize="pageSize"
              @changePage="changePage"
              :currentPage="currentPage"
            ></PageCutVue>
          </div>
        </div>
        <!-- right item -->
        <div class="item_right">
          <div class="col_box">
            <div class="bott">
              <div class="col_item">
                <div class="inerbgk"></div>
              </div>
              <!-- useinfo -->
              <template v-for="(item, index) in users">
                <div class="use_box">
                  <div
                  @click="go_userinfo(item)"
                    class="useimg"
                    :style="{ backgroundImage: `url(${item.user_img} )` }"
                  >
                    <!-- <img src="../../assets/img/idxImg/wx.jpg" alt=""> -->
                  </div>
                  <span>{{ item.username }}</span>
                </div>
                <!-- use detail    }-->
                <div class="use_detail">
                  <ul>
                    <li>
                      <span>文章 {{ item.user_article }}</span>
                    </li>
                    <li>
                      <span>评论 {{ item.user_comment }}</span>
                    </li>
                    <li>
                      <span>标签 {{ item.user_banner }}</span>
                    </li>
                  </ul>
                </div>
              </template>
            </div>
            <div class="article_box">
              <div class="article_add" @click="go_add_art()">文章创作</div>
              <div class="article_add" @click="get_login()">登录/切换</div>
            </div>
            <!-- 站点日志 -->
            <div
              class="use_http"
              v-for="(item, index) in website_log"
              :key="index"
            >
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
                  <i></i><span>运行天数： {{ calculateDiffTime(item.operation,Math.round(new Date().getTime()/1000).toString(),4) }} </span>
                </li>
                <li>
                  <i></i><span>最近更新： {{ item.create_time }} </span>
                </li>
              </ul>
            </div>
            <!-- 最新微语 -->
            <div class="banner_box">
              <Banner :attr="false" :class_str="'随机微语'" :loadingBanner="loadingBanner"></Banner>
            </div>
            <!-- 随机文章 -->
            <div class="use_http">
              <span class="sp_title">随机文章</span>
              <ul class="random_img">
                <li v-for="(item, index) in random_article" :key="index" style="cursor:pointer" @click="getShow(item)">
                  <a
                
                    :style="{ backgroundImage: `url(${item.article_img})` }"
                  ></a>
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
        </div>
      </div>
    </main>
    <!--  -->
  </div>
</template>
<script>
import $ from "../../../../jq_czc/js/itjs/swiper-4.5.3/swiper-4.5.3/src/utils/dom";
import swipers from "./Swipers.vue";
import Banner from "../side/Banner.vue";
import PageCutVue from "../pagination/PageCut.vue";
import ArticleList from "./ArticleList.vue";
import {mapMutations,mapState} from 'vuex'
import {calculateDiffTime} from '../../assets/util/timestamp'
export default {
  // props:{
  //   isShowSeiper:{
  //     Boolean,
  //     default:true
  //   }
  // },
  data() {
    return {
      calculateDiffTime:calculateDiffTime,//时间可视化
      // isShowSeiper:true,
      // 分页
      total: 102,
      pageSize: 4,
      currentPage: 1, //选中的高亮页码
      users:[
      {
          id: 0,
          username: "游客",
          user_img: "https://thirdwx.qlogo.cn/mmopen/vi_32/sx1tQVMkMLuSj5qGP84QBvX4QujfDibRYDqYyhSaAw6jYE3xqWIJBiaMzqybkUPB2oWqOlcenrsok3n4GAT3Ddibw/132",
          user_article: '*',
          user_comment: '*',
          user_banner: '*',
        },
      ],
      user: [
        {
          id: 0,
          username: "游客",
          img: "https://thirdwx.qlogo.cn/mmopen/vi_32/sx1tQVMkMLuSj5qGP84QBvX4QujfDibRYDqYyhSaAw6jYE3xqWIJBiaMzqybkUPB2oWqOlcenrsok3n4GAT3Ddibw/132",
          user_article: 11,
          user_comment: 22,
          lable: 18,
        },
      ],
      //站点日志
      website_log: [],
      random_article:[],
      //文章数据类型
      article: [],
      //微雨
      banner:[],
      loadingBanner:true
    };
  },
  computed(){

  },
  components: {
    swipers,
    PageCutVue,
    ArticleList,
    Banner
  },
  created(){
  
    this.rand_article()
    this.get_station();
    this.get_user_info();
    this.get_banner();
    this.get_article(1);

  },
  mounted() {
    // this.userInfo();
    // this.get_article(1);
  },
  computed:{
    // ...mapState('user',['userInfo']),
  },
  methods: {
    ...mapMutations('search',['set_article']),
    //获取最新banner
    async get_banner(){
      const {data:res} = await this.$api.banner.get_banner();
      if(res.code == 10004){
        return;
      }
      this.banner = res.data;
      this.loadingBanner= false;
      console.log(res.data);
    },
     async get_user_info(){
      // console.log('user_id',this.$store.state.user.userInfo.user.id)
      let user_id = this.$store.state.user.userInfo.user.id;
      const {data : res } = await this.$api.user.get_user_info({
        id:user_id
      });
      if(res.data.length < 1){
        return;
      }
      let arr = [];
      arr.push(res.data)
      this.users = arr;

    },
    /**
     * 跳转getShow展示页面
     * @param {*} item 
     */
    getShow(item) {
      this.$router.push({ path: "/show", query: { item } });
    },
    /**
     * 站点记录
     */
      async get_station(){
        const {data:res} = await this.$api.it.station();
        this.website_log = res.data;
        console.log('station',this.website_log)
      },
    /**
     * go_userinfo(item) 跳转用户页
     */
     go_userinfo(item){
        this.$router.push({
          path:'/userinfo',
          query:{item}
        })
     },
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
     * 分页页码--------------------
     */
    changePage(num) {
        this.currentPage = num;
        this.get_article(num);
        console.log(num,this.currentPage)
 
    },
    //分页数据
    async get_article(page){
       const {data:res} = await this.$api.article.getPage({
        page,pageSize:this.pageSize
       })
       if(res.code = 1000){
            this.total = res.data.total;
            this.pageSize = parseInt(res.data.pageSize);
            // this.article = res.data.data;\
            this.set_article(res.data.data);
            // this.$children[1].get_article()
            // console.log(113,this.$children[1].get_article())s
       }else{
        this.$message('获取文章失败')

       }
       console.log(res);
    },
    //user
    userInfo() {
      const ui = JSON.parse(localStorage.getItem("user"));
      this.user = ui.user;
      console.log(this.user);
    },
    //跳转用户页面
    go_user() {},
    //跳转编辑
    go_add_art() {
      this.$router.push({
        name: "Meditor",
        params: {
          test: "test",
        },
      });
    },
    //跳转登录
    get_login() {
      this.$router.push({ path: "/login" });
    },
    //跳转getShow展示页面
    getShow(item) {
      this.$router.push({ path: "/show", query: { item } });
    },
  },
};
</script>
<style lang="less" scoped>
.banner_box{
  padding-bottom: 20px;
}
#main_item {
  padding-top: 10px;

  width: 100%;
  height: 1000px;
}
/* 轮播图 */
#postTop {
  width: 807px;
  height: 232px;
  margin: 0px 10px;
  margin-bottom: 32px;
  /* background-image: url('../img/idxImg/6fcc5176e9dfa2c81602cdf4729581bd.jpg');
    background-repeat: no-repeat; */
}
.item_left,
.item_right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-container {
  width: 100%;
  height: 232px;
}
/* .swiper_item{
    width: 100%;
    height: 232px;
} */
.swiper_item {
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  filter: brightness(0.7);
  border-radius: 6px;
}
/* right item */
.item_right {
  width: 277px;
  height: 100px;
  //   border: 1px solid red;
  margin: 0px 10px;
}
.vessel {
  margin-left: auto;
  max-width: 1140px;
  margin-right: auto;
  //   border: 1px solid red;
}
.col_item {
  border-radius: 10px;

  width: 277px;
  height: 100px;
  position: relative;
  background-position: center;
  background-size: cover;
  background-image: url("../../assets/img/idxImg/user_img.jpg");
}
.inerbgk {
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: linear-gradient(to top, #1f1b24, transparent);
}
.col_box {
  position: relative;
}
// use_box
.bott {
  margin-bottom: 32px;
}
.use_box {
  width: 100%;
  // height: 72px;
  background-color: #1f1b24;
  text-align: center;
  position: relative;

  span {
    display: block;
    padding-top: 40px;
    padding-bottom: 10px;
    color: #ffffff;
    font-weight: bold;
  }
  .useimg {
    width: 68px;
    height: 68px;
    padding: 3px;
    cursor: pointer;

    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: rgba(255, 255, 255, 0.4) 4px solid;
    background-image: url("../../assets/img/idxImg/wx.jpg");
    background-position: center;
    // background-size: 68px 68px;
    background-size: cover;
    // background-size: 100% 100%;
    background-repeat:no-repeat;
  }
}
.use_detail {
  width: 100%;
  height: 60px;
  background-color: #1f1b24;
  border-top: 1px dashed rgba(0, 0, 0, 0.5);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  ul {
    display: flex;
    justify-content: space-around;
    line-height: 60px;
    color: skyblue;
    font-size: 12px;
    li {
      cursor: pointer;
    }
  }
}
//article_page 文章分页盒子
.article_page {
  width: 100%;
  min-height: 200px;
  // border: 1px solid red;
  transition: all 1s ease-out;
  padding-left: 10px;
}
//pagination_box 分页
.pagination_box {
  width: 100%;
  // background: #333;
}
// sampleInfo
.sampleInfo {
  width: 807px;
  height: 232px;
  //   border: 1px solid red;
  border-radius: 6px;
  margin-bottom: 32px;
  position: relative;
  border: 1px solid #121212;

  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    // -webkit-filter: blur(1.875rem) brightness(0.8);
    filter: blur(1.875rem) brightness(0.8);
    transform: scale(1.2);
  }
  // background-image: url('https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/07/66361cdbcffe62e9.jpg');
  .blurBgkLeft {
    width: 65%;
    position: relative;
    z-index: 99;
    .sampleInfo_info {
      position: absolute;
      color: white;
      width: 100%;
      height: auto;
      cursor: pointer;
      //   border: 1px solid red;
      padding: 50px 30px;
      .info_top {
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        padding: 10px 0px;

        .info_top_right {
          display: flex;
          align-items: center;
        }
        i {
          margin: 2px;
        }
        span {
          display: flex;
          align-items: center;
        }
      }
      .info_center {
        padding: 10px 0px;
        display: flex;
        font-size: 24px;
        font-weight: bold;
        i {
          font-size: 24px;
        }
        span {
          height: 36px;
          line-height: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .info_footer {
        padding: 10px 0px;
        line-height: 28px;
        span {
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          letter-spacing: 2px;
        }
      }
    }
  }
  .blurBgkImg {
    width: 35%;
    height: 100%;
    position: absolute;
    z-index: 10;
    background-image: url("https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/6144d4e4fba7e4a66d06431448f1ad25.jpg");
    background-position-x: -60px;
    background-size: cover;
  }
}
.right {
  right: 0;
}
.right_r {
  right: -54%;
}
.left {
  left: 0;
}
.clip_path_left {
  left: 0;
  // clip-path: polygon(6% 0, 100% 0%, 100% 100%, 0% 100%);

  // -webkit-clip-path: polygon(0 0, 100% 0%, 94% 100%, 0% 100%);
  clip-path: polygon(0 0, 100% 0%, 94% 100%, 0% 100%);
}
.clip_path_right {
  right: 0;
  clip-path: polygon(6% 0, 100% 0%, 100% 100%, 0% 100%);
}
// 文章发布
.article_box {
  width: 100%;
  height: auto;
  color: white;
  justify-content: space-around;
  padding: 10px;
  display: flex;
  border-radius: 10px;
  background-color: #1f1b24;
  margin-bottom: 10px;
  .article_add {
    padding: 10px;
    border-radius: 8px;
    width: 40%;
    height: auto;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    background: #fc5531;
  }
}

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
        -o-text-overflow: ellipsis;
      }
    }
  }
}
</style>