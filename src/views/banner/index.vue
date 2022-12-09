<template>
  <div id="banner_office">
    <NavigaterVue></NavigaterVue>
    <HaderbgkVue :isNvg="false" :title_info="title_info"></HaderbgkVue>
    <div class="content row vessel">

      <div class="left">
        <!-- <BannerTimeVue/> -->
        <router-view></router-view>
      </div>
      
      <div class="right">
        <UserVue />
        <StationVue />
        <div class="banner_box">
          <Banner :attr="false" :class_str="'随机微语'"></Banner>
        </div>
        <RandomVue />

      </div>
    </div>
  </div>
</template>
<script>
import NavigaterVue from "../../components/header/Navigater.vue";
import HaderbgkVue from "../../components/header/Haderbgk.vue";

import UserVue from "../../components/right/User.vue";
import StationVue from "../../components/right/Station.vue";
import Banner from "../../components/side/Banner.vue";
import RandomVue from "../../components/right/Random.vue";

//left
import BannerTimeVue from "../../components/left/BannerTime.vue";
import { mapMutations,mapGetters } from "vuex";
export default {
  data() {
    return {
      loadingBanner: true,
      title_info: {},
    };
  },
  components: {
    NavigaterVue,
    HaderbgkVue,
    UserVue,
    StationVue,
    Banner,
    RandomVue,
    BannerTimeVue
  },
  created(){
    console.log('touy',this.$route.query.title_info)
  //  this.save_headers();
  this.title_info = this.$store.state.page_info.headerBgk.title_info
  },
  mounted() {},
  computed:{
    ...mapGetters('page_info',['comp_title_info'])
  },
  watch:{
    comp_title_info:function(val,oval){
      this.title_info =val;
      console.log('dd6',this.title_info)


    }
  },
  methods: {
    ...mapMutations('page_info',['mut_title_info']),
    save_headers(){
      sessionStorage.setItem('title_info',JSON.stringify(this.$route.query.title_info))
      this.mut_title_info(this.$route.query.title_info);
      // this.title_info = this.$store.state.page_info.headerBgk.title_info
    }
  },
};
</script>
<style lang="less" scoped>
.banner_box {
  padding-bottom: 20px;
}
#banner_office {
  .content {
    color: #ffffffcc;
    // background: #1f1b24;
    // border: 1px solid red;
    padding: 10px;
    .left {
      width: 827px;
    //   height: 300px;
    background: #1f1b24;

      // border: 1px solid red;
      margin-right: 10px;
    }
    .right {
      padding: 0px 10px;
      flex: 1;
    //   height: 300px;
      // border: 1px solid red;
    }
  }
}
</style>