<template>
  <div id="swipercom" v-if="isShowSeiper">
    <div class="swiper-container" id="swiperIndex">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper_box" v-for="(item, i) in swiper_img" :key="i">
          <img
            class="swiper_item"
            data-ll-status="loaded"
            :src="item.pic"
            alt=""
          />
          <a class="swiper_info" :href="item.prodHerf">
            <i class="iconfont icon-dianhua" style="font-size: 32px"></i> {{item.name}}
            <div class="top_post_info">
              <span> <i class="iconfont icon-dianhua"></i> {{item.time}}</span>
              <span> <i class="iconfont icon-redu"></i> {{item.readCont}} 阅读</span>
              <span> <i class="iconfont icon-biaoji"></i> {{item.numCount}} 字</span>
              <span> <i class="iconfont icon-pinglun"></i> {{item.comment}} 评论</span>
            </div>
          </a>
        </div>
      </div>

      <div class="swiper-pagination"></div>

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>

      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css"; //引入swiper样式
import Swiper from "swiper"; //引入swiper
export default {
  // name: "Swiper",
  props:{
    isShowSeiper:{
      Boolean,
      default:true
    }
  },
  data() {
    return {
      swiper_img: [
        {
            id:1,name:"vue 后台管理系统",time:"2020年6月3日",readCont: 233,numbarCont: 999,comment: 33,
            prodHerf:"http://czc.xiaxianxian.top:8086/",
          pic: "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/FmuAzdPIcKInFxmaC7kAB5Pfg-vy?imageView/2/w/800",
        },
        {
            id:2,name:"uniapp网易云音乐(h5)",time:"2020年8月3日",readCont: 293,numbarCont: 99,comment: 3,
            prodHerf:"http://minode.xiaxianxian.top:8001/",

          pic: "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/2022/07/bc66419e35e9e07a.jpg",
        },
        {
            id:3,name:"小米商城",time:"2020年4月3日",readCont: 293,numbarCont: 99,comment: 3,
            prodHerf:"http://www.xiaxianxian.top:8088/",

          pic: "https://ks-cdn-1256879347.cos.ap-guangzhou.myqcloud.com/upload/518a20632ef4fbd8433ec03d323868b8.jpg",
        },
      ],
    };
  },
  mounted() {
    new Swiper("#swiperIndex", {
      //配置分页器内容

      loop: true, // 循环模式选项
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination", //换页器与哪个标签关联
        clickable: true, //分页器是否可以点击
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //如果需要滚动条
      // scrollbar: {
      //     el: '.swiper-scrollbar',
      // },
    });
  },
};
</script>

<style lang="less">
.swiper_item {
  width: 807px;
  height: 232px;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  filter: brightness(0.7);
  border-radius: 6px;
}
.swiper_box {
  position: relative;

  .swiper_info {
    // border: red solid 1px;
    width: 564px;
    padding: 20px;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 70%);
    z-index: 10;
    font-size: 32px;
    color: white;
    text-align: center;
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
    overflow:hidden; //超出的文本隐藏

     
    
    .top_post_info {
      width: 300px;
      display: flex;
      margin: 0px auto;
      display: flex;
      justify-content: space-around;
      // border: red solid 1px;
      span {
        margin-top: 40px;
        display: flex;
        font-size: 12px;
      }
    }
  }
}
.swiper-button-prev {
}
.swiper-pagination {
  span {
    box-sizing: content-box;
    width: 30px;
    height: 3px;
    border-radius: 0;
    background-color: #ffffff;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  }
  .swiper-pagination-bullet-active {
    background-color: #ffffff;
    opacity: 1;
  }
}
// #swipercom{
//     // width: 7.5rem;
//     #swiperIndex.swiper-container{
//         width: 7.1rem;
//         height: 2.6rem;
//         border-radius: 0.1rem;

//         .swiper-slide img{
//             width: 100%;
//         }
//         .swiper-pagination-bullet-active{
//             background-color: orangered;
//         }

//     }
// }
</style>
