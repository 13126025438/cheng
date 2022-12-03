<template>
    <div id="user">
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
    </div>
</template>
<script>
export default {
    data(){
        return{
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
        }
    },
    created(){
        this.get_user_info();
    },
    methods:{
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
     * go_userinfo(item) 跳转用户页
     */
     go_userinfo(item){
        this.$router.push({
          path:'/userinfo',
          query:{item}
        })
     },
    }
}
</script>
<style lang="less" scoped>
.inerbgk {
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: linear-gradient(to top, #1f1b24, transparent);
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
#user{
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
}
 
</style>