<template>
  <div id="userIofo">
    <!-- nav -->
    <Navigater />

    <!-- 信息 -->
    <div class="box container">
      <div class="top">
        <div class="flex_box">
          <div class="user_box">
            <div class="user_left">
              <div class="user_img" :style="{backgroundImage: `url(${users.user_img})`}"></div>
            </div>
            <div class="user_right">
              <div class="name_top">
                <span>{{users.username}}</span>
                <!-- <span>{{users.user_role === 0 ? '用户' : '站长' }}</span> -->
                <div class="role">
                  <span v-if="users.user_role == 1" class="station">站长</span>
                  <span v-if="users.user_role == 0" class="user_user">用户</span>
                  <span v-if="!users.user_role" class="tourist">游客</span>
                </div>
                <span class="ma_yaer">练气期 {{calculateDiffTime(users.create_time,Math.round(new Date().getTime()/1000).toString(),5)}}</span>
              </div>
              <div class="name_bottom">
                <ul class="name_info">
                  <li>
                    <span> <b>{{users.access_count}}</b> 总访问量</span>
                    <div class="lines"></div>
                  </li>
                  <li>
                    <span> <b>{{users.user_article}}</b> 原创</span>
                    <div class="lines"></div>
                  </li>
                  <li>
                    <span> <b>{{users.user_banner}}</b> 微语</span>
                    <div class="lines"></div>
                  </li>
                 
                  <li>
                    <span> <b>0</b> 收藏</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="center_box"></div> -->
          <div class="login_out">
            <div class="setBtn">编辑信息</div>
            <div class="out" @click="login_out()">退出登录</div>
          </div>
        </div>
        <div class="ipInfo">
          <div class="ip">IP 归属 ：{{ips}}</div>
          <div class="ip_detaiil">查看详细资料</div>
        </div>
      </div>

      <div class="bottom">
        <div class="bot_left">
          <div class="banner_box">
              <Banner  :loadingBanner="loadingBanner"  :bgk="false" ></Banner>
            </div>
        </div>
        <div class="bot_right">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="文章" name="first">
                <ArticleList :article_prop = "userArt" :isProps="true" />
              </el-tab-pane>
              <el-tab-pane label="标语" name="second">暂无数据</el-tab-pane>
              <el-tab-pane label="问答" name="third">暂无数据</el-tab-pane>
              <el-tab-pane label="评论" name="fourth"
                >暂无数据</el-tab-pane
              >
            </el-tabs>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "../../components/body/ArticleList.vue";
import Navigater from "../../components/header/Navigater.vue";
import { mapState } from "vuex";
import {calculateDiffTime} from '../../assets/util/timestamp'
import Banner from "../../components/side/Banner.vue";
export default {
  data() {
    return {
      activeName: "first",
      userArt:[],
      banner:[],
      loadingBanner:true,
      if_ban:true,
      users:
      {
          id: 0,
          username: "游客",
          user_img: "https://thirdwx.qlogo.cn/mmopen/vi_32/sx1tQVMkMLuSj5qGP84QBvX4QujfDibRYDqYyhSaAw6jYE3xqWIJBiaMzqybkUPB2oWqOlcenrsok3n4GAT3Ddibw/132",
          user_article: '*',
          user_comment: '*',
          user_banner: '*',
          create_time: 0,
        },
      
      ips:'未知',
      calculateDiffTime:calculateDiffTime
      
    };
  },
  created() {
    console.log(this.$route.query.item);
    this.get_userArt();
    this.get_user_info();
    this.get_user_banner(this.$store.state.user.userInfo.user.id);
  },
  mounted() {},
  components: {
    Navigater,
    ArticleList,
    Banner,
  },
  computed:{
    ...mapState('user',['userInfo']),
  },
  methods: {
    //获取用户banner
    async get_user_banner(id){
      const {data:res} = await this.$api.banner.get_user_banner({
        user_id:id
      })
      if(res.code === 10004){
        return this.$message.error(res.msg)
      }
      this.banner = res.data
      this.loadingBanner = false
        console.log(res)
    },
    //退出登录
    login_out(){
      // this.$store.state.user.userInfo = {}
      // console.log(this.$store.state.user.userInfo)
    },
    // ...mapState('user',['userInfo']),
    //ip i地址解析
     ip_sets(ip){
      let key = 'WHOBZ-X77KU-QMTVD-BBKDI-N4F45-NBBJN';
      this.$jsonp('http://apis.map.qq.com/ws/location/v1/ip',{
        ip:ip,key:key,
        output: "jsonp", //返回数据格式
      }).then(res=>{
        console.log(res);
        if(res.status === 0){
          this.ips = res.result.ad_info.province;
        }else if(res.status === 375){
          this.ips = res.message;
        }else{
          this.ips = '未知';
        }
      })
      // const { data :res } = await this.$api.it.ip_set({
      //   ip:ip,key:key
      // });
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
      this.users = res.data;
    // this.ip_sets(res.data.last_ip);

      console.log('user',this.users)

    },

    async get_userArt(){
      let user_id = this.userInfo.user.id;
      const {data : res} = await this.$api.article.get_particular_art({
          id: user_id
      });

      if(res.data.length < 1){
        return this.$message('请先登录');
      }
      this.userArt = res.data;
    },
    /**
     * 选项卡
     */
    handleClick(tab, event) {
      if(tab._uid === 13){
        this.get_userArt();

      }
    },
  },
};
</script>
<style lang="less" scoped>
.banner_box{
  border: 2px solid #eee;
}
// lines
.lines {
  // width: 1px;
  height: 100%;
  border-radius: 10px;
  margin-left: 10px;
  border-right: 2px solid #c6c6c6;
}

.box {
  /* border: 1px solid red; */
  min-height: 820px;
  margin-top: 80px;
  .top {
    width: 100%;
    height: 130px;
    position: relative;
    // display: flex;
    // background: #FFFFFFE6;
    color: #343a40 !important;
    background: #fff;
    /* border: 1px solid red; */
    .flex_box {
      display: flex;

      .user_box {
        width: 594px;
        height: 82px;
        display: flex;
        /* border: 1px solid red; */
        margin-left: 10px;
        .user_left {
          width: 94px;
          // height: 94px;
          /* border: 1px solid red; */

          .user_img {
            width: 94px;
            height: 94px;
            border-radius: 50%;
            position: absolute;
            top: -15px;
            left: 10px;
            /* border: 3px solid red; */
            border: rgba(255, 255, 255, 0.4) 4px solid;
            background-image: url("../../assets/img/idxImg/user_img.jpg");
            background-position: center;
            background-size: cover;
          }
        }
        .user_right {
          padding: 10px;
          .name_top {
            display: flex;
            font-size: 22px;
            color: #222226;
            .ma_yaer{
              font-size: 12px;
              padding: 0px 6px;
              border-radius: 12px;

              background-color: #D1DDF1;

              color: #455165;
            }
            span {
              margin-right: 10px;
            }
            .role{
              color: whitesmoke;
              font-size: 12px;
              
              .station{
                background: #0d6efd;
                padding: 3px 6px;
                border-radius: 12px;
              }
              .user_user{
                background: #555666;
                padding: 3px 6px;
                border-radius: 12px;
              }
              .tourist{
                background: #67af34;
                padding: 3px 6px;
                border-radius: 12px;
              }
            }
          }
          .name_bottom {
            .name_info {
              display: flex;
              margin-top: 20px;
              li {
                margin-right: 10px;
                display: flex;
                b {
                  color: #222226;
                }
                span {
                  color: #555666;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .login_out {
        height: 82px;
        flex: 1;
        /* border: 1px solid red; */
        font-size: 14px;
        color: #555666;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .setBtn {
          width: 100px;
          height: 32px;
          border-radius: 20px;
          border: 1px solid #cccc;
          text-align: center;
          line-height: 32px;
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            border: 1px solid #000;
          }
        }
        .out {
          width: 100px;
          height: 32px;
          border-radius: 20px;
          border: 1px solid #cccc;
          text-align: center;
          line-height: 32px;
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            border: 1px solid #000;
          }
        }
      }
    }
    .ipInfo {
      height: 48px;
      padding-left: 118px;
      color: #555665;
      font-size: 12px;
      /* border: 1px solid red; */
      .ip {
        margin-bottom: 10px;
      }
    }
  }
  //center
  .bottom {
    width: 100%;
    margin-top: 8px;
    display: flex;

    /* border: 1px solid red; */
    .bot_left {
      padding: 10px;
      width: 338px;
      /* border: 1px solid red; */
      background: #fff;
    }
    .bot_right {
      flex: 1;
      // height: 600px;
      background: #fff;
      padding: 0px 10px;
      margin-left: 6px;
      /* border: 1px solid red; */
    }
  }
}
</style>