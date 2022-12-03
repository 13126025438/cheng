<!-- markdown editor 编辑 
    npm i -S vue-meditor
import { MarkdownPro } from 'vue-meditor' 
-->

<template>
  <div id="meditor">
    <navigater></navigater>

    <!-- <MarkdownPro @on-save="handleOnSave" :autoSave = true :interval=10000
       /> -->

    <!-- top -->
    <div class="top"></div>
    <!-- <div class="content container">
      dddd
    </div> -->
    <el-card class="content container">
      <div class="title">
        <input type="text" placeholder="请输入标题!" v-model="title" />
      </div>
      <div class="detail">
        <el-input
          class="detail_text"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea1"
        >
        </el-input>
      </div>
      <div class="status">
        <el-select v-model="cate_value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- //status -->
        <el-switch
          v-model="status_val"
          active-text="公开文章"
          inactive-text="私人文章"
          :active-value="0"
          :inactive-value="1"
          @change="getStatus"
        >
        </el-switch>
      </div>

      <!-- 图片上传http://tp6.lesson.cn/index.php/front/ups -->
      <div class="up_img">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://blogs.xiaxianxian.top/ups-image"
          name="image"
          :on-success="up_ok"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>

      <!-- 文章 -->
      <div class="art_md">
        <el-input
          v-if="ismd"
          class="md_text"
          :disabled="false"
          v-model="art_md_html"
          placeholder="文章内容"
        ></el-input>

        <el-input
          v-else="ismd"
          class="md_text"
          :disabled="false"
          v-model="cont_md_url"
          placeholder="请上传地址"
        ></el-input>

        <el-upload
          class="upload-demo"
          action="http://blogs.xiaxianxian.top/ups-file"
          multiple
          name="file"
          :limit="1"
          :on-success="upload_md"
          :show-file-list="false"
          :file-list="fileMd"
        >
          <el-button class="md_btn" disabled type="primary"
            >上传md文件 <i class="el-icon-edit"></i>
          </el-button>
        </el-upload>

        <el-button class="md_btn" type="primary" @click="dialogVisible = true"
          >在线编辑 <i class="el-icon-edit"></i>
        </el-button>
      </div>
      <!-- icon选择 -->
      <div class="icon_title">
        <ul class="icon_title_ul">
          <li>阅读icoc</li>
          <li>时间icon</li>
          <li>文章标题icon</li>
          <li>分类icon</li>
          <li>其它iocn</li>
        </ul>
      </div>
      <div class="icon_box">
        <el-select v-model="article_read_icon" clearable placeholder="请选择阅读">
          <el-option
            v-for="item in cities1"
            :key="item.article_read_icon"
            size="mini"
            :label="item.label"
            :value="item.article_read_icon"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <i class="iconfont" :class="item.article_read_icon"></i>
            </span>
          </el-option>
        </el-select>

        <el-select v-model="article_time_icon" clearable placeholder="请选择">
          <el-option
            v-for="item in cities2"
            :key="item.article_time_icon"
            size="mini"
            :label="item.label"
            :value="item.article_time_icon"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <i class="iconfont" :class="item.article_time_icon"></i>
            </span>
          </el-option>
        </el-select>

        <el-select v-model="article_icon" clearable placeholder="请选择">
          <el-option
            v-for="item in cities3"
            :key="item.	article_icon"
            size="mini"
            :label="item.label"
            :value="item.	article_icon"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <i class="iconfont" :class="item.	article_icon"></i>
            </span>
          </el-option>
        </el-select>

        <el-select v-model="article_class_icon" clearable placeholder="请选择">
          <el-option
            v-for="item in cities4"
            :key="item.article_class_icon"
            size="mini"
            :label="item.label"
            :value="item.article_class_icon"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <i class="iconfont" :class="item.article_class_icon"></i>
            </span>
          </el-option>
        </el-select>

        <el-select v-model="article_it_icon" clearable placeholder="请选择">
          <el-option
            v-for="item in cities5"
            :key="item.article_it_icon"
            size="mini"
            :label="item.label"
            :value="item.article_it_icon"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <i class="iconfont" :class="item.article_it_icon"></i>
            </span>
          </el-option>
        </el-select>
      </div>
      <!-- 发布 -->
      <div class="up_article">
        <el-button class="save_btn" icon="el-icon-edit" type="warning"
          >保存草稿</el-button
        >

        <el-button class="up_btn" @click="up_article_btn" type="danger"
          >发布<i class="el-icon-upload el-icon--right"></i
        ></el-button>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <mavoVue @getmdVal="getmdVal"></mavoVue>
    </el-dialog>
  </div>
</template>
<script>
import { MarkdownPro } from "vue-meditor";
import navigater from "../../components/header/Navigater.vue";
import HaderbgkVue from "../../components/header/Haderbgk.vue";
import mavoVue from "../../components/mavon-editor/Mavoneditot.vue";
export default {
  data() {
    return {
      fileList: [],
      fileMd: [],
      ismd: true,
      //分类
      options: [
        {
          value: "值得一看",
          label: "值得一看",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      //icon
      cities1: [
        {
          article_read_icon: "icon-redu",
          label: "火热",
        },
        {
          article_read_icon: "icon-bolanggu",
          label: "击鼓",
        },
        {
          article_read_icon: "icon--",
          label: "标签",
        },
        {
          article_read_icon: "icon-biaoqing",
          label: "笑脸",
        },
        {
          article_read_icon: "icon-yiziB",
          label: "王座",
        },
        {
          article_read_icon: "icon-yuan_huangguan",
          label: "皇冠",
        },
      ],
      article_read_icon: "icon-redu",
      cities2: [
        {
          article_time_icon: "icon-redu",
          label: "火热",
        },
        {
          article_time_icon: "icon-bolanggu",
          label: "击鼓",
        },
        {
          article_time_icon: "icon--",
          label: "标签",
        },
        {
          article_time_icon: "icon-biaoqing",
          label: "笑脸",
        },
        {
          article_time_icon: "icon-yiziB",
          label: "王座",
        },
        {
          article_time_icon: "icon-yuan_huangguan",
          label: "皇冠",
        },
      ],
      article_time_icon: "icon-bolanggu",
      cities3: [
        {
          article_icon: "icon-redu",
          label: "火热",
        },
        {
          article_icon: "icon-bolanggu",
          label: "击鼓",
        },
        {
          article_icon: "icon--",
          label: "标签",
        },
        {
          article_icon: "icon-biaoqing",
          label: "笑脸",
        },
        {
          article_icon: "icon-yiziB",
          label: "王座",
        },
        {
          article_icon: "icon-yuan_huangguan",
          label: "皇冠",
        },
      ],
      article_icon: "icon-biaoqing",
      cities4: [
        {
          article_class_icon: "icon-redu",
          label: "火热",
        },
        {
          article_class_icon: "icon-bolanggu",
          label: "击鼓",
        },
        {
          article_class_icon: "icon--",
          label: "标签",
        },
        {
          article_class_icon: "icon-biaoqing",
          label: "笑脸",
        },
        {
          article_class_icon: "icon-yiziB",
          label: "王座",
        },
        {
          article_class_icon: "icon-yuan_huangguan",
          label: "皇冠",
        },
      ],
      article_class_icon: "icon--",
      cities5: [
        {
          article_it_icon: "icon-redu",
          label: "火热",
        },
        {
          article_it_icon: "icon-bolanggu",
          label: "击鼓",
        },
        {
          article_it_icon: "icon--",
          label: "标签",
        },
        {
          article_it_icon: "icon-biaoqing",
          label: "笑脸",
        },
        {
          article_it_icon: "icon-yiziB",
          label: "王座",
        },
        {
          article_it_icon: "icon-yuan_huangguan",
          label: "皇冠",
        },
      ],
      article_it_icon: "icon-yiziB",
      //上传的字段
      title: "",
      textarea1: "",
      cate_value: "值得一看",
      status_val: 0,
      index_img:"",
      art_md_html: "",
      cont_html_txt: "",
      cont_md_txt: "",
      cont_md_url:"",
      //upload
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      art_md_html: "",
      dialogVisible: false,
      //

      loginForm: {
        username: "iwen",
        password: "123",
      },
    };
  },
  components: {
    MarkdownPro,
    navigater,
    HaderbgkVue,
    mavoVue,
  },
  mounted() {
    // this.test();
    // this.getp();
  },
  methods: {
    //upload_md md文件上传
    upload_md(res) {
      console.log(res.data.url);
      this.ismd = !this.ismd;
      this.cont_md_url = res.data.url;
      console.log("ssup", this.cont_md_url);
    },
    getp() {
      let { username, password } = this.loginForm;
      this.$api.article
        .test({
          username,
          password,
        })
        .then((res) => {
          console.log(res.data);
        });
    },

    //上传文章
    async up_article_btn() {
      let id = JSON.parse(localStorage.getItem('user')).user.id;
      let arr = {
        user_id: id,
        article_title: this.title,
        article_detail: this.textarea1,
        article_category: this.cate_value,
        article_status: this.status_val,
        article_img: this.index_img,
        article_read_icon:this.article_read_icon,
        article_time_icon:this.article_time_icon,
        article_icon:this.article_icon,
        article_class_icon:this.article_class_icon,
        article_it_icon:this.article_it_icon,
        art_arr_cont: {
          cont_md_url: this.cont_md_url,
          cont_html_txt: this.art_md_html,
          cont_md_txt: "",
        },
      };
      console.log("ss", this.cont_md_url);
      const { data: res } = await this.$api.article.art(arr);
      if(res.code === 10000){
        this.$message.success(res.msg)
      }
      if(res.code === 10004){
        this.$message.success(res.msg)
      }
      console.log(res);
      //  this.$http({
      //     url:"http://tp6.lesson.cn/index.php/front/login",
      //     method:"post",
      //     data:{id:123},

      //  }).then(res=>{
      //   console.log(res);
      //  })
    },
    //
    getmdVal(val) {
      console.log("ddd", val);
      this.art_md_html = val;
      this.dialogVisible = false;
    },
    //
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //
    test() {
      this.$api.user
        .test()
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    async oky() {
      const res = this.$axios.post("http://blogs.xiaxianxian.top/article_add", {
        arr: this.arrp,
      });
      console.log(res);
    },
    handleOnSave({ value, theme }) {
      console.log(value, theme);
    },
    //文章状态
    getStatus(callback) {
      console.log(callback);
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    up_ok(res) {
      this.index_img = res.data.url;
      console.log(res.data.url);
      //  op = JSON.stringify(res);
      // alert(JSON.stringify(res))
      // console.log(JSON.stringify(res));
    },
  },
};
</script>
<style lang="less" scoped>
#meditor {
  height: 1000px;
  background-color: #f5f6f7;
  .top {
    width: 100%;
    height: 42.8px;
    background: #07070aeb;
  }
  //内容区
  .content {
    min-height: 600px;
    border: red solid 1px;
    background: #fff;
    margin-top: 30px;
    width: 55%;
    .title {
      width: 80%;
      height: 50px;
      margin: 0 auto;
      border-bottom: 3px solid #eee;
      // background: #eee;
      input {
        font-size: 28px;
        width: 100%;
        height: 100%;
        color: #606266;
      }
    }
    .detail {
      width: 80%;
      // padding: 0 30px;

      margin: 30px auto;
      .detail_text {
      }
    }
    .status {
      display: flex;
      // margin-top: 30px;
      align-items: center;
      justify-content: space-between;
      // border: 1px red solid;
      width: 80%;
      margin: 30px auto;

      // height: 30px;
    }
    // icon 选中 匹配
    .icon_title_ul {
      display: flex;
      justify-content: space-around;
      li {
        flex: 1;
        padding: 5px;
        font-size: 13px;
        // color: #409EFF;
      }
    }
    .icon_box {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      .el-select {
        margin: 3px;
      }
    }
    .up_img {
      padding: 0 80px;
      margin-top: 30px;
      .up_title {
      }
    }
    //文本编辑
    .art_md {
      display: flex;
      width: 80%;
      margin: 30px auto;
      justify-content: space-between;
      .md_text {
        width: 80%;
        margin-right: 10px;
      }
      .md_btn {
        margin-left: 10px;
      }
    }
    // 发布
    .up_article {
      width: 80%;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      .up_btn {
        width: 120px;
        // background: #fc5531;
      }
    }
  }
}
.test {
  height: 1000px;
}
input {
  outline: none;
  border: none;
  background: none;
}
</style>