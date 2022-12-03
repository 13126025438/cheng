<template>
  <div id="centeritem">
    <!-- item -->
    <main id="main_item">
      <div class="content row vessel">
        <!-- left item -->
        <div class="item_left">
          <!-- 轮播图 -->
          <div id="postTop">
            <!-- index span -->
            <swipers></swipers>
          </div>
          <!-- 文章 - 作品 -->

          <div class="sampleInfo" v-for="(item, index) in article" :key="index">
            <img
              class="lazy loaded"
              alt=""
              data-ll-status="loaded"
              :src="item.art_img"
            />
            <div class="blurBgkLeft">
              <div
                class="sampleInfo_info"
                @click="getShow(item)"
                :class="index % 2 == 0 ? 'right_r' : ''"
              >
                <div class="info_top">
                  <span
                    ><i class="iconfont" :class="item.art_time_icon"></i
                    >{{ item.art_time }}</span
                  >
                  <div class="info_top_right">
                    <span
                      ><i class="iconfont" :class="item.art_read_icon"></i>
                      {{ item.art_read }} 阅读</span
                    >
                    <span
                      ><i class="iconfont" :class="item.art_class_icon"></i
                      >{{ item.art_class }}
                      <i class="iconfont" :class="item.art_it_icon"></i
                    ></span>
                  </div>
                </div>
                <div class="info_center">
                  <span
                    ><i class="iconfont" :class="item.art_icon"></i
                    >{{ item.art_name }}</span
                  >
                </div>
                <div class="info_footer">
                  <span>{{ item.art_title }}</span>
                </div>
              </div>
            </div>

            <div
              class="blurBgkImg"
              :class="index % 2 == 0 ? 'clip_path_left' : 'clip_path_right'"
              :style="{ backgroundImage: `url(${item.art_img})` }"
            ></div>
          </div>

          <!-- <div class="sampleInfo">
            <img
              class="lazy loaded"
              alt=""
              data-ll-status="loaded"
              src="https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/08/c2bd38e927dc3ee6.webp"
            />
            <div class="blurBgkLeft">
              <div class="sampleInfo_info right_r">
                <div class="info_top">
                  <span><i></i>2020年4月11日</span>
                  <div class="info_top_right">
                    <span><i></i>111阅读</span>
                    <span><i></i>标签 <i></i> </span>
                  </div>
                </div>
                <div class="info_center">
                  <span><i></i>关于博主</span>
                </div>
                <div class="info_footer">
                  <span
                    >博主介绍00后专科 移动应用开发系
                    的菜鸟，一枚全栈工程师，受家庭影响从小学就接触编程，对代码简洁之道、适配、兼容、新特性、设计模式的内容深有兴趣。
                    个人爱好</span
                  >
                </div>
              </div>
            </div>

            <div class="blurBgkImg clip_path_left"></div>
          </div> -->
        </div>
        <!-- right item -->
        <div class="item_right">
          <div class="col_box">
            <div class="bott">
              <div class="col_item">
                <div class="inerbgk"></div>
              </div>
              <!-- useinfo -->
              <template v-for="(item, index) in user">
                <div class="use_box">
                  <div
                    class="useimg"
                    :style="{ backgroundImage: `url(${item.img} )` }"
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
                      <span>标签 {{ item.lable }}</span>
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
                  <i></i><span>用户总数： {{ item.user_conut }}位</span>
                </li>
                <li>
                  <i></i><span>置顶文章： {{ item.top_article }}篇</span>
                </li>
                <li>
                  <i></i><span>标签总数： {{ item.lable_conut }}条</span>
                </li>
                <li>
                  <i></i><span>文章总数： {{ item.article_count }}篇 </span>
                </li>
                <li>
                  <i></i><span>微语总数： {{ item.tiny_count }}天 </span>
                </li>
                <li>
                  <i></i><span>运行天数： {{ item.operation_day }}天 </span>
                </li>
                <li>
                  <i></i><span>最近更新： {{ item.recently_update }} </span>
                </li>
              </ul>
            </div>
            <!-- 随机文章 -->
            <div class="use_http">
              <span class="sp_title">随机文章</span>
              <ul class="random_img">
                <li v-for="(item, index) in random_article" :key="index">
                  <a
                    href=""
                    :style="{ backgroundImage: `url(${item.article_img})` }"
                  ></a>
                  <div class="img_link">
                    <span>{{ item.article_time }}</span>
                    <span>
                      <i class="iconfont" :class="item.article_icon"></i>
                      {{ item.article_label }}</span
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
export default {
  data() {
    return {
      // user:[],
      user: [
        {
          id: 1,
          username: "老崔",
          img: "https://thirdwx.qlogo.cn/mmopen/vi_32/sx1tQVMkMLuSj5qGP84QBvX4QujfDibRYDqYyhSaAw6jYE3xqWIJBiaMzqybkUPB2oWqOlcenrsok3n4GAT3Ddibw/132",
          user_article: 11,
          user_comment: 22,
          lable: 18,
        },
      ],
      //站点日志
      website_log: [
        {
          id: 1,
          title: "站点日志",
          user_conut: 1,
          top_article: 1,
          lable_conut: 22,
          article_count: 33,
          comment_count: 21,
          tiny_count: 25,
          operation_day: 3,
          recently_update: "2022年10月19日",
        },
      ],
      //随机文章
      random_article: [
        {
          id: 1,
          article_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/474c34b1602e5fca7a348127c1acc553.jpg",
          article_time: "2021年5月8日",
          article_label: "如何解决跨域的问题",
          article_icon: "icon-lianjie",
        },
        {
          id: 2,
          article_img:
            "	https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/507b7103ef7106fd01e745b957928c72.jpg",
          article_time: "2021年11月24日",
          article_label: "如何解决uniapp兼容问题",
          article_icon: "icon-shatanqiu",
        },
        {
          id: 3,
          article_img:
            "	https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/cfff929b24aa0476cf34525138d79cf8.jpg",
          article_time: "2022年3月8日",
          article_label: "如何解决vue项目打包的各种问题",
          article_icon: "icon-a-biaoqianshuqian",
        },
        {
          id: 4,
          article_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/9a4e8112cd87d8fbfc6a8cb1f728fcbd.jpg",
          article_time: "2022年9月8日",
          article_label: "如何利用宝塔部署项目",
          article_icon: "icon-jimu",
        },
      ],
      //文章数据类型
      article: [
        {
          id: 1,
          art_name: "关于博主",
          art_title:
            "博主介绍00后专科 移动应用开发系的菜鸟，一枚前端开发菜鸟，努力向全栈开发工程师冲。对代码简洁之道、适配、兼容、新特性、设计模式的内容深有兴趣。",
          art_icon: "icon-biaoqing",
          art_time: "2020年4月11日",
          art_time_icon: "icon-bolanggu",
          art_read: 111,
          art_read_icon: "icon-redu",
          art_class: "值得一看",
          art_class_icon: "icon--",
          art_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/08/c2bd38e927dc3ee6.webp",
          art_it_icon: "icon-konglong",
          art_content: "",
        },
        {
          id: 2,
          art_name: " JavaScript 中 (0, function)(param) 是什么?",
          art_title:
            "为什么 r.useState 方法，要用 (0,r.useState)(void 0) 的方式去执行呢？r.useState(void 0) 的调用方式也是可运行的，为什么不这么写？",
          art_icon: "icon-yiziB",
          art_time: "2020年4月11日",
          art_time_icon: "icon-bolanggu",
          art_read: 111,
          art_read_icon: "icon-redu",
          art_class: "值得一看",
          art_class_icon: "icon--",
          art_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/08/1774bd467077fd4f.webp",
          art_it_icon: "icon-yuan_huangguan",
          art_content: "",
        },
        {
          id: 3,
          art_name: "为什么我避免使用async/await？",
          art_title:
            "无论你对async/await的立场如何，我都想向你说明，根据我的经验，为什么async/await往往会使代码复杂度更高，而不是更低。",
          art_icon: "icon-dianshijiB",
          art_time: "2020年4月11日",
          art_time_icon: "icon-bolanggu",
          art_read: 111,
          art_read_icon: "icon-redu",
          art_class: "实用肝货",
          art_class_icon: "icon--",
          art_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/07/3ecb7fde6272467b.jpg",
          art_it_icon: "icon-yuan_xiaolaba",
          art_content: "",
        },
        {
          id: 4,
          art_name: "文件太多忘记写export * from 'xx'怎么办？自动生成它吧",
          art_title:
            "我们在写一个组件库或者npm包的时候，会遇到这种情况：需要导出多个组件或多个文件里的方法，然后会有一个入口文件index.js，里面写满了export * from ‘./xx.js’这样的语句。",
          art_icon: "icon-yuan_shuji",
          art_time: "2020年4月11日",
          art_time_icon: "icon-bolanggu",
          art_read: 111,
          art_read_icon: "icon-redu",
          art_class: "实用肝货",
          art_class_icon: "icon--",
          art_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/07/66361cdbcffe62e9.jpg",
          art_it_icon: "icon-yuan_tianqi",
          art_content: "",
        },
      ],
    };
  },
  components: {
    swipers,
  },
  mounted() {
  // this.userInfo();
  },
  methods: {
    //user
    userInfo(){
      const ui = JSON.parse(localStorage.getItem('user'));
      this.user = ui.user
   console.log(this.user)
    },
    //跳转用户页面
    go_user(){

    },
    //跳转编辑
    go_add_art(){
      this.$router.push({
        name: 'Meditor',
        params:{
          'test':'test'
        }
      })
    },
    //跳转登录
    get_login(){
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
  background-image: url("../../assets/img/idxImg/0084aYsLgy1ggstmn4t0mj30pk08cwgg.jpg");
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
    background-size: 68px 68px;
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
    li{
  cursor: pointer;

    }
  }
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
  padding:10px;
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
      span {
        display: flex;
      }
    }
  }
}
</style>