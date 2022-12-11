<template >
  <div id="bannerTp">
    <div class="banner" :class="bgk ? 'bgk_ban_bbb' : 'bkg_ban_fff'">
      <div class="top">
        <div class="banner_title">{{class_str}}</div>
        <div class="banner_write" @click="release_banner()">发布+</div>
      </div>
      <div v-loading="loadingBanner">
        <div class="banner_box" v-for="(item, index) in banner">
          <div class="ban_detail">
            <div class="user_img">
              <div
                class="img"
                :style="{ backgroundImage: `url(${item.user.user_img})` }"
              ></div>
            </div>
            <div class="detail">
              <div class="detail_top">
                <span>{{ item.user.username }}</span>
                <!-- <span>{{item.create_time}}</span> -->
                <span>{{
                  calculateDiffTime(
                    item.create_time,
                    Math.round(new Date().getTime() / 1000).toString(),
                    6
                  )
                }}</span>
              </div>
              <div class="detail_bot">
                <span class="banner_text">
                  {{ item.dictum }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- dialog -->

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入微语" prop="dictum">
          <el-input type="textarea" v-model="ruleForm.dictum"></el-input>
        </el-form-item>
        <el-form-item class="right_auto">
          <el-button @click="resetForm('ruleForm')">重新写过</el-button>

          <el-button type="primary" @click="submitForm('ruleForm')"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { calculateDiffTime } from "../../assets/util/timestamp";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            user_id: 0,
            dictum: "还没有数据，快去试试吧",
            banner_status: 0,
            create_time: 1669099781,
            user: {
              id: 5,
              username: "未知",
              user_img:
                "http://blogs.serve.xiaxianxian.top/toplic/20221122/c8b7c5b44ef7aac0d7a7572cb48dd72d.jpg",
            },
          },
        ];
      },
    },
    loadingBanners: {
      type: Boolean,
      default: true,
    },
    bgk: {
      type: Boolean,
      default: true,
    },
    attr:{
      type:Boolean,
      default: true,
    },
    class_str:{
      type:String,
      default:'最新微语'
    }
  },
  data() {
    return {
      loadingBanner:false,
      calculateDiffTime: calculateDiffTime,
      loading: true,
      centerDialogVisible: false,
      ifBanner: true,
      ruleForm: {
        dictum: "请输入微语",
      },
      rules: {
        dictum: [
          { required: true, message: "请输入微语", trigger: "blur" },
          {
            min: 1,
            max: 600,
            message: "长度在 1 到 600 个字符",
            trigger: "blur",
          },
        ],
      },
      banner:[
      {
            id: 0,
            user_id: 0,
            dictum: "还没有数据，快去试试吧",
            banner_status: 0,
            create_time: 1669099781,
            user: {
              id: 5,
              username: "未知",
              user_img:
                "http://blogs.serve.xiaxianxian.top/toplic/20221122/c8b7c5b44ef7aac0d7a7572cb48dd72d.jpg",
            },
          },
      ]
    };
  },
  created() {
    this.get_is_banner(this.attr)
  },
  mounted() {

  },

  methods: {
    //user / 主页数据区分获取
     get_is_banner(attr){
  
      if(attr){
        //用户的数据
        console.log(attr,1)
        this.loadingBanner = true;

    this.get_user_banner(this.$store.state.user.userInfo.user.id);

      }else{
        // 首页的数据banner
        this.get_banner();
        this.loadingBanner = true;

        console.log(attr,2)

      }
      // console.log(1234)
      // this.loadingBanner = false;


    },
      //获取最新banner
      async get_banner(){
      const {data:res} = await this.$api.banner.get_banner();
      this.loadingBanner= false;

      if(res.code == 10004){
        return;
      }
      this.banner = res.data;
      // this.loadingBanner= false;
      console.log(res.data);
    },
      //获取用户banner
      async get_user_banner(id){

      const {data:res} = await this.$api.banner.get_user_banner({
        user_id:id
      })
      this.loadingBanner= false;

      if(res.code === 10004){
        return this.$message.error(res.msg)
      }
      this.banner = res.data
      // this.loadingBanner = false
        console.log(res.data)
    },
    //添加新微雨
    release_banner() {
      // this.$forceUpdate();

      this.centerDialogVisible = !this.centerDialogVisible;
    },
    async submitForm() {
      let user_id = this.$store.state.user.userInfo.user.id;
      let dictum = this.ruleForm.dictum;
      this.centerDialogVisible = !this.centerDialogVisible;
      const { data: res } = await this.$api.banner.add_banner({
        user_id: user_id,
        dictum: dictum,
      });
      if (res.code === 10004) {
        return this.$message.error(res.msg);
      }else if(res.code === 10000){
        this.get_is_banner(this.attr)

        return this.$message(res.msg);

      }
      console.log(res);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.right_auto {
  margin-left: 221px;
}
.bgk_ban_fff {
  background-color: #fff;
  color: #1f1b24;
}
.bgk_ban_bbb {
  background-color: #1f1b24;
  color: #ffffffcc;
}
.banner {
  border-radius: 10px;
  padding: 16px;
  //   display: flex;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .banner_title {
      padding-bottom: 12px;
    }
    .banner_write {
      cursor: pointer;
      padding: 5px;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      margin-top: -11px;
      background: #fc5531;
    }
  }
  .banner_box {
    .ban_detail {
      margin-top: 10px;
      display: flex;
      .user_img {
        width: 40px;
        height: 40px;
        .img {
          width: 100%;
          height: 100%;
          background-image: url("../../assets/img/idxImg/user_img.jpg");
          background-position: center;
          background-size: cover;
          border-radius: 50%;
          padding: 2px;
        }
      }
      .detail {
        flex: 1;
        padding-left: 4px;
        .detail_top {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .detail_bot {
          padding-top: 6px;
          .banner_text {
            font-size: 14px;
            overflow: hidden;
            line-height: 20px;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>