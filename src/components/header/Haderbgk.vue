<template>
    <div id="hedindex">
      <!-- header 头部背景大部分 -->

      <header
        class="header_box"
        data-ll-status="loaded"
        :style="{ backgroundImage: `url(${bkg_img})` }"
        :class="isNvg ? '' : 'bgk_padd'"
      >

        <div class="header_txt">

          <div class="header_title">
            <i class="iconfont" :class="title_info.title_icon" style="fontSize:28px" ></i>
          <h2>{{ title_info.title_name }}</h2>
          </div>

          <div class="span_info">
            <template v-for="(item, index) in title_info.pre_text">
              <i class="iconfont" :class="item.pre_icon"></i>
              <span>{{ item.span }}{{ item.detail }}</span>
              <!-- <span>{{ item.detail }}</span> -->
            </template>
  
            <i class="iconfont" v-if="isEndIcon" :class="title_info.un_icon"></i>
          </div>
  
          <!-- 搜索dialog -->
        </div>
  
        <section id="section_hed">
          <!-- css3 波浪特效 -->
          <svglang v-if="this.isNvg"></svglang>
          <div v-else class="liner_bgk"></div>
        </section>
      </header>
    </div>
  </template>
  <script>
  var sclTopU;
  var sclTopD;
  import svglang from "./SvgLang.vue";
  export default {
    // name:Haderbgk,
    props: {
      isNvg: {
        Boolean,
        default: true,
      },
      isEndIcon: {
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
            title_icon:"icon-muqin",
            title_name: "阿成的bug",
            un_icon: "icon-muqin",
            pre_text: [{ pre_icon: "icon-quantou", span: "各自努力 顶端相见",detail:"" }],
          };
        },
      },
    },
    data() {
      return {
 
      };
    },
    components: {
      svglang,
    },
    created() {
      // console.log(this.isNvg)
    },
    mounted() {
    
    },
    methods: {}
  };
  </script>
  <style lang="less" scoped>
  #hedindex{
  }
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
    // border: 1px solid red;
    /* */
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
  .header_title{
    display: flex;
    align-items: center;
    i{
      margin-right: 5px;
    }
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
  .header_txt .span_info{
    margin-top: 20px;
    i{
      margin-left: 10px;
    }
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

  </style>