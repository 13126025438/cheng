<template>
  <div id="comment">
    <div class="com_box">
      <!-- 头部 -->
      <div class="com_top">
        <span class="com_title"
          ><i class="iconfont icon-biaoji"></i>文章评论</span
        >
      </div>
      <!-- 评论展示部 -->

      <div class="com_show">
        <ol
          class="comment_list"
          v-for="(item, index) in comment"
          :key="index"
          :id="index"
        >
          <div class="comment_m">
            <div class="com_detail">
              <div
                class="img_box user_farther_img"
                :style="{ backgroundImage: `url(${item.comUser.user_img})` }"
              >
                <!-- <img class="user_img" src="../../assets/img/idxImg/user_img.jpg" alt=""> -->
              </div>
              <div class="user_info_box">
                <!-- 用户名 -->
                <div class="user_info_top">
                  <div class="user_info">
                    <span>{{ item.comUser.username }}</span>
                    <span>角色</span>
                  </div>
                  <div class="user_info_bott bott_farther_width">
                    <div class="time">
                      <!-- <span>6个月前 (05-22)</span> -->
                      <span>{{ item.create_time }}</span>
                    </div>
                    <div
                      v-if="!(item.id == isComFar)"
                      class="reply"
                      @click="write_reply_far(item, index)"
                    >
                      <span>回复<i class="iconfont icon-biaoji"></i></span>
                    </div>

                    <div
                      v-if="item.id == isComFar"
                      class="reply"
                      @click="write_exit(item, index)"
                    >
                      <span>取消<i class="iconfont icon-biaoji"></i></span>
                    </div>
                  </div>
                </div>
                <!-- 单条评论内容 -->
                <div class="com_txt">
                  <span> {{ item.content }} </span>
                </div>
              </div>
            </div>

            <!-- 评论插槽 -->
            <div v-if="item.id == isComFar">
              <div class="write_com">
                <div class="author_top">
                  <input
                    type="text"
                    name="reply_qq"
                    v-model="child_com.reply_qq"
                    placeholder="QQ"
                  />
                  <input
                    type="email"
                    name="reply_email"
                    v-model="child_com.reply_email"
                    placeholder="邮箱"
                  />
                </div>
                <div class="author_top" style="display: none">
                  <input
                    type="text"
                    name="user_id"
                    v-model="child_com.user_id"
                  />
                  <input type="text" name="com_id"  :value="item.id" />
                  <input
                    type="text"
                    name="reply_uid"
                    v-model="child_com.reply_uid"
                  />
                </div>
                <div class="comment">
                  <textarea
                    class="comment_ipt"
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    v-model="child_com.content"
                    placeholder="来都来了，说句话吧···"
                  >
                  </textarea>
                </div>
                <div class="write_class">
                  <span>代码</span>
                </div>
                <div class="btn">
                  <button class="btn_submin" @click="child_addCom(item)">
                    提交
                  </button>
                </div>
              </div>
            </div>

            <!-- 子评论 -->
            <div class="comment_quote" :class="moreShow ? 'hidden_more' : 'show_more' ">
              <ol
                class="comment_list2"
                v-for="(items, i) in item.reply"
                :key="i"
              >
                <div class="com_detail">
                  <div
                    class="img_box user_child_img"
                    :style="{ backgroundImage: `url(${items.user.user_img})` }"
                  >
                    <!-- <img class="user_img" src="../../assets/img/idxImg/user_img.jpg" alt=""> -->
                  </div>
                  <div class="user_info_box">
                    <!-- 用户名 -->
                    <div class="user_info_top">
                      <div class="user_info">
                        <span>{{ items.user.username }}</span>
                        <span>角色</span>
                      </div>
                      <div class="user_info_bott bott_child_width">
                        <div class="time">
                          <!-- <span>6个月前 (05-22)</span> -->
                          <span>{{ items.create_time }}</span>
                        </div>
                        <div
                          v-if="!(items.id == isCom)"
                          class="reply"
                          @click="write_reply(items, i)"
                        >
                          <span>回复<i class="iconfont icon-biaoji"></i></span>
                        </div>

                        <div
                          v-if="items.id == isCom"
                          class="reply"
                          @click="write_exit(items, i)"
                        >
                          <span>取消<i class="iconfont icon-biaoji"></i></span>
                        </div>
                      </div>
                    </div>
                    <!-- 单条评论内容 -->
                    <div class="com_txt">
                      <!-- <span>@ lao崔 ：这是一条s评论</span> -->
                      <span
                        >@ {{ items.reply_user.username }} :
                        {{ items.content }}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- 评论插槽 -->
                <div v-if="items.id == isCom">
                  <div class="write_com">
                <div class="author_top">
                  <input
                    type="text"
                    name="reply_qq"
                    v-model="child_com.reply_qq"
                    placeholder="QQ"
                  />
                  <input
                    type="email"
                    name="reply_email"
                    v-model="child_com.reply_email"
                    placeholder="邮箱"
                  />
                </div>
                <div class="author_top" style="display: none">
                  <input
                    type="text"
                    name="user_id"
                    v-model="child_com.user_id"
                  />
                  <input type="text" name="com_id"  :value="item.id" />
                  <input
                    type="text"
                    name="reply_uid"
                    v-model="child_com.reply_uid"
                  />
                </div>
                <div class="comment">
                  <textarea
                    class="comment_ipt"
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    v-model="child_com.content"
                    placeholder="来都来了，说句话吧···"
                  >
                  </textarea>
                </div>
                <div class="write_class">
                  <span>代码</span>
                </div>
                <div class="btn">
                  <button class="btn_submin" @click="child_addCom(item,items)">
                    提交
                  </button>
                </div>
              </div>
                </div>
              </ol>

              <!-- <div class="comment_a_little" v-show="(item.reply.length > 2)">
                <span>{{item.reply.length}}显示更多>>></span>
              </div> -->
              
            </div>
            <div class="comment_a_little" v-show="(item.reply.length > 2)" @click="show_more">
                <span v-show="moreShow">显示更多>>></span>
                <span v-show="!moreShow">收起更多>>></span>
              </div>
          </div>
        </ol>
      </div>
    </div>

    <!-- 写评论 -->
    <div v-show="isCom === -1" class="write_com">
      <div>
        <div class="author_top">
          <input
            type="text"
            name="com_qq"
            v-model="far_com.com_qq"
            placeholder="QQ"
          />
          <input
            type="email"
            name="com_email"
            v-model="far_com.com_email"
            placeholder="邮箱"
          />
        </div>
        <div class="author_top" style="display: none">
          <input type="text" name="user_id" v-model="far_com.user_id" />
          <input type="text" name="art_id" v-model="far_com.art_id" />
        </div>
        <div class="comment">
          <textarea
            class="comment_ipt"
            name="content"
            id=""
            cols="30"
            rows="10"
            v-model="far_com.content"
            placeholder="来都来了，说句话吧···"
          >
          </textarea>
        </div>
        <div class="write_class">
          <span>代码</span>
        </div>
        <div class="btn">
          <button class="btn_submin" @click="far_addCom()">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    art_id_com:{
      type:Number,
      defualt:-1
    }
  },
  data() {
    return {
      isCom: -1, //显示评论
      isComFar: -2,
      isRely: true,
      moreShow:false,
      comment: [],
      far_com: {
        user_id: this.$store.state.user.userInfo.user.id,
        art_id: this.art_id_com,
        content: "",
        com_qq: "",
        com_email: "",
      },
      child_com: {
        user_id: this.$store.state.user.userInfo.user.id,
        com_id: null,
        content: "",
        reply_uid: null,
        reply_qq: "",
        reply_email: "",
      },
    };
  },
  created() {
    console.log('art_id_com',this.art_id_com)
    this.get_comment(this.art_id_com);
  },
  mounted() {},
  methods: {
    /**
     * show_more 显示更多评论
     */
     show_more(){
      console.log('123')
      this.moreShow = !this.moreShow;
     },
    /**
     * 子评论/ 回复
     */
     async child_addCom(item,items) {
      console.log('comchild',item)
      this.child_com.com_id = item.id;
      this.child_com.reply_uid = item.user_id;

      if(items){
        this.child_com.reply_uid = items.user_id;
      }
      let {user_id,com_id,content,reply_uid,reply_qq,reply_email} = this.child_com;
      const { data: res } = await this.$api.comment.add_reply({
        user_id,com_id,content,reply_uid,reply_qq,reply_email
      })
      if (res.code == 10004) {
        return this.$message.error(res.msg);
      }
      if (res.code == 10000) {
        this.$message(res.msg);
      }
      this.isCom = -1, //显示评论
      this.isComFar = -2,
      this.get_comment(this.art_id_com);
      // console.log("far_addCom", this.child_com);
    },
    /**
     * 新增主评论
     */
    async far_addCom() {
      let { user_id, art_id, content, com_qq, com_email } = this.far_com;
      const { data: res } = await this.$api.comment.add_comment({
        user_id,
        art_id,
        content,
        com_qq,
        com_email,
      });
      if (res.code == 10004) {
        return this.$message.error(res.msg);
      }
      if (res.code == 10000) {
        this.$message(res.msg);
      }
      this.get_comment(this.art_id_com);
      // console.log('com',res)
      //   console.log('far_addCom',this.far_com)
    },
    /**
     * 获取内容评论
     * @param {*} art_id
     */
    async get_comment(art_id) {
      const { data: res } = await this.$api.comment.get_comment({
        art_id,
      });
      if (res.code === 10004) {
        return this.$message.error(res.msg);
      }
      this.comment = res.data;
      // console.log("com", res);
    },
    /**
     *
     * @param {*} item
     * @param {*} index
     */
    write_exit(item, index) {
      this.isCom = -1;
      this.isComFar = -2;

      // console.log("ex", index);
    },
    /**
     * 父评论回复
     * @param {*} item
     */
    write_reply_far(item, index) {
      this.isComFar = item.id;
      this.isCom = -2;

      // console.log(item);
    },
    /**
     * 子评论回复
     * @param {*} item
     */
    write_reply(item, index) {
      this.isCom = item.id;
      this.isComFar = -1;
      // console.log(item);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .com_children {
  padding-left: 50px;
}
#comment {
  padding: 20px;
  background: #1f1b24;
  border: 1px solid #909090;

  color: #ffffffcc;
  .com_box {
    width: 100%;
    // padding: 20px;
    // 头部
    .com_top {
      padding-bottom: 15px;
      // border-bottom: #fff;
      border-bottom: 1px solid;
      .com_title {
        font-size: 13px;
        font-weight: 200;
      }
    }
    // 评论展示部
    .com_show {
      padding-top: 10px;
      .com_detail {
        margin-top: 20px;
        display: flex;
        .user_farther_img {
          width: 50px;
          height: 50px;
        }
        .img_box {
          background-image: url("../../assets/img/idxImg/user_img.jpg");
          border-radius: 50%;
          padding: 1px;
          border: 1px solid;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          margin-right: 15px;
        }
        //用户名
        .user_info_box {
          border-bottom: 1px solid;
          padding-bottom: 20px;
          .user_info_top {
            padding-top: 5px;
            .user_info {
              display: flex;
              font-size: 14px;
              font-weight: 200;
              span {
                margin-right: 15px;
              }
            }
          }
          .bott_farther_width {
            width: 680px;
          }
          .user_info_bott {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #b3b3b3;
            .time {
            }
            .reply {
              font-size: 14px;
              cursor: pointer;
              color: #ffffffcc;
            }
          }
        }
        .com_txt {
          padding-top: 20px;
        }
      }
    }
  }
}
.comment_a_little {
    font-size: 14px;
    font-weight: 200;
    width: 700px;
    display: flex;
    padding: 10px;
    cursor: pointer;
    justify-content: flex-end;
    span:hover {
      color: #2476c3;
    }
  }
// 子评论
.show_more{
  height: auto;
}
.hidden_more{
  max-height: 230px;

}
.comment_quote {
  overflow: hidden;
  .comment_list2 {
    padding-left: 50px;
    border-left: 1px dashed hsla(0, 0%, 93%, 0.5);
  }

  .bott_child_width {
    width: 630px;
  }
  .user_child_img {
    width: 36px;
    height: 36px;
  }
  // .comment_a_little {
  //   font-size: 14px;
  //   font-weight: 200;
  //   width: 700px;
  //   display: flex;
  //   padding: 10px;
  //   cursor: pointer;
  //   justify-content: flex-end;
  //   span:hover {
  //     color: #2476c3;
  //   }
  // }
}

//写评论
.write_com {
  width: 100%;
  border: 1px solid #909090;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  input,
  textarea {
    background: none;
    outline: none;
    border: 0px;
    color: #b3b3b3;
  }
  .author_top {
    display: flex;
    padding: 10px;
    border-bottom: 1px dashed #b3b3b3;
    input {
      width: 50%;
    }
  }
  .comment {
    width: 100%;
    padding: 20px 0px;
    .comment_ipt {
      width: 100%;
    }
  }
  .write_class {
    padding: 20px 0px;
  }
  .btn {
    .btn_submin {
      background: #0d6efd;
      padding: 6px 10px;
      border-radius: 4px;
      outline: none;
      border: 0px;
      color: #fff;
    }
  }
}
</style>