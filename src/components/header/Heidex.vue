<template>
  <div id="hedindex">
    <!-- header 头部背景大部分 -->
    <header
      class="header_box"
      data-ll-status="loaded"
      :style="{ backgroundImage: `url(${bkg_img})` }"
      :class="isNvg ? '' : 'bgk_padd'"
    >
    <div class="header_box">123fsaffffffffffffff</div>
      <div class="header_txt">
        <h2>{{ title_info.title_name }}</h2>
        <p>
          <template v-for="(item, index) in title_info.pre_text">
            <i class="iconfont" :class="item.pre_icon"></i>
            <span>{{ item.span }}</span>
          </template>

          <i class="iconfont" :class="title_info.un_icon"></i>
        </p>

        <!-- 搜索dialog -->
      </div>

      <section id="section_hed">
        <!-- css3 波浪特效 -->
        <svglang v-if="this.isNvg"></svglang>
        <div v-else class="liner_bgk"></div>
      </section>
    </header>
    <!-- nav 顶部导航栏 -->
    <nav id="navPC" class="">
      <a href="#" class="faultfont title_bug">
        <router-link class="router-link " to="/">阿成的BUG</router-link>
      </a>
      <ul class="nav_txt row">
        <li v-for="(item, index) in nav_top" :key="index" >
          <a href="" class="nav_a">
            <i class="iconfont" :class="item.nav_icon"></i>
            <span @click="getItLink(item)">{{ item.nav_name }}</span>
            <i class="iconfont" :class="item.nav_icon_show"> </i>
          </a>
          <ul class="nav_leve2">
            <li v-for="(items, i) in item.nav_child" :key="i">
              <span>{{ items.nav_child_name }}</span>
              <!-- <span><router-link :to="items.nav_child_herf">{{ items.nav_child_name }}</router-link></span> -->
              <i class="iconfont" :class="items.nav_child_icon"></i>
            </li>
          </ul>
        </li>
        <!-- <li><i class="iconfont icon-wazi"></i><span>踩坑记录</span></li>
            <li><i class="iconfont icon-caihongSVG"></i><span>踩坑记录</span></li>
            <li><i class="iconfont icon-wenjian"></i><span>文章总计</span></li>
            <li><i class="iconfont icon-xinfeng"></i><span>文章总计</span></li>
            <li><i class="iconfont icon-qiqiu"></i><span>其它链接</span></li>
            <li><i class="iconfont icon-quantou"></i><span>实验工厂</span></li> -->
      </ul>
      <ul class="nav_icon row">
        <li
          v-for="(item, index) in nav_icon"
          :key="index"
          @click="fnSearch(index, item)"
        >
          <a href="#">
            <i class="iconfont" :class="item.nav_icons"></i>
          </a>
          <div class="hov_img" v-if="item.nav_img">
            <a href="">
              <img :src="item.nav_img" alt="" />
            </a>
          </div>
        </li>

        <!-- <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
        <!-- <li><i class="iconfont icon-yinle1"></i></li>
            <li><i class="iconfont icon-xiazai16"></i></li>
            <li><i class="iconfont icon-qq"></i></li>
            <li><i class="iconfont icon-weixin"></i></li>
            <li><i class="iconfont icon-yangguang"></i></li> -->
      </ul>
    </nav>
    <!-- 搜索框 -->
    <div class="serch_dialog" v-show="toggle_search" @click="fnShowSearch">
      <div class="search_box" @click.stop="fnstop()">
        <div class="search_top">
          <p>搜索看看...</p>
          <i class="iconfont icon-guanbi" @click="fnShowSearch"></i>
        </div>
        <div class="search_ipt">
          <el-input
            placeholder="请输入关键词搜索"
            prefix-icon="el-icon-search"
            v-model="search_ipt"
          >
          </el-input>
        </div>
        <div class="sch_result"></div>
        <div class="btn_box">
          <el-button type="primary" @click="fnShowSearch">关闭</el-button>
          <el-button type="danger" :plain="true" @click="open3">点我搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var sclTopU;
var sclTopD;
import svglang from "./SvgLang.vue";
export default {
  props: {
    isNvg: {
      Boolean,
      default: true,
    },
    bkg_img: {
      String,
      default:
        "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/sghjkfwuiyr234hj234hj2k34hj243412341.jpg",
    },
    title_info: {
      type: Object,
      default: () => {
        return {
          title_name: "阿成的bug",
          un_icon: "icon-muqin",
          pre_text: [{ pre_icon: "icon-quantou", span: "各自努力 顶端相见" }],
        };
      },
    },
  },
  data() {
    return {
      //切换搜索框
      toggle_search: false,
      // search_ipt
      search_ipt: "",
      // nav_icon 顶部字体导航栏
      nav_icon: [
        { id: 1, nav_icons: "icon-chaxun", nav_detail: "搜索", nav_img: "" },
        { id: 2, nav_icons: "icon-yinle1", nav_detail: "音乐", nav_img: "" },
        { id: 3, nav_icons: "icon-xiazai16", nav_detail: "信息", nav_img: "" },
        {
          id: 4,
          nav_icons: "icon-qq",
          nav_detail: "qq",
          nav_img:
            "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/474c34b1602e5fca7a348127c1acc553.jpg",
        },
        {
          id: 5,
          nav_icons: "icon-weixin",
          nav_detail: "微信",
          nav_img: "",
        },
        {
          id: 6,
          nav_icons: "icon-yangguang",
          nav_icons_2: "icon-yejing",
          nav_detail: "z昼夜",
          nav_img: "",
        },
      ],
      //顶部导航栏
      nav_top: [
        {
          id: 1,
          nav_name: "杂七杂八",
          nav_icon: "icon-biaoji",
          nav_icon_show: "icon-xiasanjiaoxing",
          nav_child: [
            {
              id: 1,
              nav_leve: 2,
              father_leve_id: 1,
              nav_child_name: "值得一看",
              nav_child_icon: "icon-xiangjiB",
            },
            {
              id: 2,
              nav_leve: 2,
              father_leve_id: 1,
              nav_child_name: "实用干货",
              nav_child_icon: "icon-pijiu",
            },
            {
              id: 3,
              nav_leve: 2,
              father_leve_id: 1,
              nav_child_name: "实战记录",
              nav_child_icon: "icon-quantou",
            },
          ],
        },
        {
          id: 2,
          nav_name: "踩坑记录",
          nav_icon: "icon-wazi",
          nav_icon_show: "icon-xiasanjiaoxing",
          nav_child: [
            {
              id: 4,
              nav_leve: 2,
              father_leve_id: 2,
              nav_child_name: "报错记录",
              nav_child_icon: "icon-yuan_tianqi",
            },
            {
              id: 5,
              nav_leve: 2,
              father_leve_id: 2,
              nav_child_name: "一些js功能",
              nav_child_icon: "icon-yuan_shuji",
            },
            {
              id: 6,
              nav_leve: 2,
              father_leve_id: 2,
              nav_child_name: "每天/技巧",
              nav_child_icon: "icon-yuan_huojian",
            },
          ],
        },
        {
          id: 3,
          nav_name: "微言微语",
          nav_icon: "icon-caihongSVG",
          nav_icon_show: "",
        },
        {
          id: 4,
          nav_name: "文章总计",
          nav_icon: "icon-wenjian",
          nav_icon_show: "",
        },
        {
          id: 5,
          nav_name: "留言本子",
          nav_icon: "icon-xinfeng",
          nav_icon_show: "",
        },
        {
          id: 6,
          nav_name: "其它链接",
          nav_icon: "icon-qiqiu",
          // http://czc.xiaxianxian.top:8086/
          nav_icon_show: "",
        },
        {
          id: 7,
          nav_name: "实验工厂",
          nav_icon: "icon-quantou",
          nav_icon_show: "",
        },
        // {id:8, nav_name:'杂七杂八',nav_icon:"icon-biaoji" ,nav_icon_show:"icon-xiasanjiaoxing"},
      ],
    };
  },
  components: {
    svglang,
  },
  created() {
    // console.log(this.isNvg)
  },
  mounted() {
    $(window).on("mousewheel DOMMouseScroll", this.onMouseScroll);
  },
  methods: {
    // 搜索
    open3() {
        this.$message({
          message: '抱歉！该功能还在完善中',
          type: 'warning'
        });
      },
    // getItLink(item)
    getItLink(item){
      // console.log(123)

      if(item.nav_name == "其它链接"){
        window.open("http://czc.xiaxianxian.top:8086/")
      }
    },
    // fnstop
    fnstop() {
      // console.log(123)
    },
    // toggle_search
    fnShowSearch() {
      this.toggle_search = !this.toggle_search;
    },
    // 搜索框
    fnSearch(index, item) {
      if (item.nav_detail == "搜索") {
        this.toggle_search = !this.toggle_search;
      }
    },

    onMouseScroll: function (e) {
      var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
      var delta = Math.max(-1, Math.min(1, wheel));
      if (delta > 0) {
        this.onMouseupp();
      } else {
        this.onMouseDownn();
      }
    },
    onMouseupp() {
      var sclTopDs = sclTopD - 10;
      $(window).scroll((e) => {
        const sclTopup = $(document).scrollTop();

        var shownav = function () {
          if (sclTopup < sclTopDs) {
            $("#navPC").css("transform", "translateY(0%)");
            $("#navPC").addClass("bg-blur");
            $("#navPC .nav_txt li span").addClass("tit_name");
            $("#navPC .nav_icon li i").addClass("tit_name");
            $("#navPC a").addClass("tit_name");
            // console.log("添加")
          }
        };
        shownav();
        if (sclTopup < 100) {
          shownav = null;
          // console.log(sclTopup)
          $("#navPC").removeClass("bg-blur");
          $("#navPC .nav_txt li span").removeClass("tit_name");
          $("#navPC .nav_icon li i").removeClass("tit_name");
          $("#navPC a").removeClass("tit_name");
        }
      });
    },
    onMouseDownn() {
      $(window).scroll((e) => {
        var sclTop = $(document).scrollTop();
        if (sclTop > 99) {
          sclTopD = sclTop;
          $("#navPC").css("transform", "translateY(-100%)");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.bgk_padd {
  padding: 60px 0px;
}
/* header 头部背景大部分 */
.header_box {
  position: relative;
  width: 100%;
  //  height: 1000px;
  // background-image: url("../../assets/img/idxImg/idxbgk.jpg");
  background-position: center;
  background-size: cover;
  text-align: center;
  color: whitesmoke;

  /* border: 1px solid red; */
}
.serch_dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  background-color: rgba(0, 0, 0, 0.6);
  .search_box {
    width: 40%;
    // height: 300px;
    margin: 200px auto;
    border-radius: 6px;
    background-color: #212529;
    .search_top {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      i {
        color: whitesmoke;
        font-size: 20px;
        cursor: pointer;
      }
      p {
        font-size: 20px;
        color: #ffffffcc;
      }
    }
    .search_ipt {
      border-top: 1px dashed rgba(11, 11, 11, 1);
      border-bottom: 1px dashed rgba(0, 0, 0, 0.5);
      padding: 20px;
      // border: 1px solid #ced4da;
    }
    .sch_result {
    }
    .btn_box {
      display: flex;
      justify-content: flex-end;
      align-content: flex-end;
      padding: 20px;
    }
  }
}
.col {
  font-size: 23px;
}
.header_txt {
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#section_hed {
  .liner_bgk {
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: -3px;
    left: 0;
    // backdrop-filter: blur(8px);
    filter: blur(4px);
    background: linear-gradient(to top, #121212, rgba(0, 0, 0, 0.3));
  }
}
.header_txt p {
  margin-top: 20px;
}

#navPC {
  /* border: 1px solid red; */

  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
  /* color: whitesmoke; */
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  padding: 5px;
  padding-left: 40px;
  padding-right: 40px;
  z-index: 100;
  transition: 0.3s ease-out;
  box-shadow: 0 0.5rem 1rem rgb(18 38 63 / 5%);
}

.bg-blur {
  color: #343a40 !important;
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: saturate(200%) blur(20px);
  backdrop-filter: saturate(200%) blur(20px);
}

.tit_name {
  color: #000000e6 !important;
}

#navPC .title_bug {
  color: whitesmoke;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 500;
  .router-link{
  color: whitesmoke;

  }
}

.nav_txt li,
.nav_icon li {
  padding: 8px;
  position: relative;
  &:hover {
    .hov_img {
      img {
        display: block;
      }
    }
  }
  .hov_img {
    img {
      position: absolute;
      display: none;
      left: -100%;
      width: 100px;
      height: 100px;
      margin-top: 5px;
      border-radius: 6px;
      // background-color: #ffffff;
      border: 1px solid #ffffff;
      background-position: center;
      background-size: cover;
    }
    // background-image: url('https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/474c34b1602e5fca7a348127c1acc553.jpg');
  }
}
.nav_icon {
  i {
    color: whitesmoke;
  }
}
.nav_txt li {
  position: relative;

  &:hover {
    .nav_leve2 {
      display: block;
    }
  }
  .nav_leve2 {
    display: none;
    position: absolute;
    margin-top: 5px;
    border-radius: 6px;
    background-color: #ffffff;
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  a {
    span {
      color: whitesmoke;
    }
    i {
      font-size: 18px;
    }
  }
}

.nav_txt {
  margin-right: auto;
}
</style>