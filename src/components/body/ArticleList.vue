<template>
  <div id="article_list">
    <div v-show="isProps" >
      <div
        class="sampleInfo"
        v-for="(item, index) in article_prop"
        :key="index"
      >
        <img
          class="lazy loaded"
          alt=""
          data-ll-status="loaded"
          :src="item.article_img"
        />
        <div class="blurBgkLeft">
          <div
            class="sampleInfo_info"
            @click="getShow(item)"
            :class="index % 2 == 0 ? 'right_r' : ''"
          >
            <div class="info_top">
              <span
                ><i class="iconfont" :class="item.article_time_icon"></i
                >{{ item.create_time }}</span
              >
              <div class="info_top_right">
                <span
                  ><i class="iconfont" :class="item.article_read_icon"></i>
                  {{ item.read_count }} 阅读</span
                >
                <span
                  ><i class="iconfont" :class="item.article_class_icon"></i
                  >{{ item.article_category }}
                  <i class="iconfont" :class="item.article_it_icon"></i
                ></span>
              </div>
            </div>
            <div class="info_center">
              <span
                ><i class="iconfont" :class="item.article_icon"></i
                >{{ item.article_title }}</span
              >
            </div>
            <div class="info_footer">
              <span>{{ item.article_detail }}</span>
            </div>
          </div>
        </div>

        <div
          class="blurBgkImg"
          :class="index % 2 == 0 ? 'clip_path_left' : 'clip_path_right'"
          :style="{ backgroundImage: `url(${item.article_img})` }"
        ></div>
      </div>
      <div
        class="sampleInfo centerSp"
        v-show="article_prop.length === 0 ? true : false"
      >
        <h4>本页面没有文章！</h4>
      </div>
    </div>

    <!-- item -->
    <div v-show="!isProps" v-loading="loading">
      <div class="sampleInfo"   v-for="(item, index) in article" :key="index">
        <img
          class="lazy loaded"
          alt=""
          data-ll-status="loaded"
          :src="item.article_img"
        />
        <div class="blurBgkLeft">
          <div
            class="sampleInfo_info"
            @click="getShow(item)"
            :class="index % 2 == 0 ? 'right_r' : ''"
          >
            <div class="info_top">
              <span
                ><i class="iconfont" :class="item.article_time_icon"></i
                >{{ item.create_time }}</span
              >
              <div class="info_top_right">
                <span
                  ><i class="iconfont" :class="item.article_read_icon"></i>
                  {{ item.read_count }} 阅读</span
                >
                <span
                  ><i class="iconfont" :class="item.article_class_icon"></i
                  >{{ item.article_category }}
                  <i class="iconfont" :class="item.article_it_icon"></i
                ></span>
              </div>
            </div>
            <div class="info_center">
              <span
                ><i class="iconfont" :class="item.article_icon"></i
                >{{ item.article_title }}</span
              >
            </div>
            <div class="info_footer">
              <span>{{ item.article_detail }}</span>
            </div>
          </div>
        </div>

        <div
          class="blurBgkImg"
          :class="index % 2 == 0 ? 'clip_path_left' : 'clip_path_right'"
          :style="{ backgroundImage: `url(${item.article_img})` }"
        ></div>
      </div>
      <div
        class="sampleInfo centerSp"
        v-show="article.length === 0 ? false : false"
      >
        <h4>本页面没有文章！</h4>
      </div>
    </div>

    <!--  -->
  </div>
</template>
  <script>
import $ from "../../../../jq_czc/js/itjs/swiper-4.5.3/swiper-4.5.3/src/utils/dom";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    isProps: {
      type: Boolean,
      default: false,
    },
    article_prop: {
      type: Array,
      default() {
        return [];
      },
    },
    article_store: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      loading:true,
      article: [],
      search_arr: [],
      isSearch: false,
      //文章数据类型
      articles: [
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
  components: {},
  created() {
    // this.article =
    // this.get_article()
    this.isSearch = this.$store.state.search.isSearch;
    this.search_arr = this.$store.state.search.search_result;
    // console.log(this.isSearch,this.search_arr );
    // this.articles = this.$store.state.search.search_result
  },
  mounted() {},
  computed: {
    ...mapGetters("search", ["get_article_state"]),
  },
  watch: {
    get_article_state: function (val, oval) {
      this.get_article();
    },
  },
  methods: {
    // ...mapState('search',['article_state']),
    get_article() {
      // console.log(this.get_article_state)
      this.loading = false
      this.article = this.$store.state.search.article_state;
      // console.log('12347',this.article)
    },
    changSearch() {
      console.log("123");
    },
    //跳转getShow展示页面
    getShow(item) {

    
       this.$api.article.add_art_read_count({
        art_id:item.id
      }).then(res=>{
        console.log('readcount',res)
      });
    

      this.$router.push({ path: "/show", query: { item } });
    },
  },
};
</script>
  <style lang="less" scoped>
.centerSp {
  text-align: center;
  line-height: 232px;
  color: #343a40;
  font-size: 24px;
}
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
</style>