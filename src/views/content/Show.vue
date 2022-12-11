<template>
  <div id="show">
    <Navigater/>
    <Haderbgk :isNvg="false"
    :title_info="title_info"
    :bkg_img="bgd"
    :isEndIcon="false"
    > </Haderbgk>
    <!-- content -->
    <div class="show_info vessel">
      <h3></h3>
      <div class="title_info">
        <span>
          <!-- {{show_item.art_title}} -->
        </span>
      </div>
      <!-- 文档 -->
      <div class="markdown-body" v-html="articalContent"></div>
      <!-- 评论 -->
      <div class="comment_box">
        <CommentVue  :art_id_com="active_art_id"/>
      </div>
    </div>
  </div>
</template>
<script>
import { marked } from "marked";

// import hedindex from "../../components/header/Heidex.vue";
import Navigater from "../../components/header/Navigater.vue";
import Haderbgk from "../../components/header/Haderbgk.vue";
import CommentVue from "../../components/comment/Comment.vue";
export default {
  name: "Show",
  props: {},
  data() {
    return {
      active_art_id:-1,
      show_item: [],
      headerInfo: [],
      title_info: {},
      bgd:"",
      articalContent: "<span style= 'color:red'>文章丢失<span/>",
    };
  },
  components: {
    Haderbgk,
    Navigater,
    CommentVue
  },
  mounted() {},
  destroyed(){
    console.log('销毁');
    localStorage.removeItem('article_id');
  },
  created() {
    this.getShowInfo(this.$route.query.item);

    // this.$http.get("http://blogs.serve.xiaxianxian.top/toplic/20221121/f7310f5fdc019884b7b88da7d4d8a3ae.md").then(res => {
    //     const htmlMD = marked(res.data);
    //      console.log(res)
    //     this.articalContent = htmlMD;
    //   });
  },
  methods: {
    // async get_md_url(url){
    //   const {data:res} =await this.$api.article.get_art_url(url);
    //   console.log(res)

    // },
 
    async get_art_id(id) {
      const { data: res } = await this.$api.article.get_art_content({
        art_id: id,
      });
      if (res.code == 10000) {
        // this.get_md_url(res.data.cont_md_url);

        if (res.data.cont_html_txt == "") {
          this.articalContent = "<span style= 'color:red'>文章丢失<span/>";
          console.log(this.articalContent, "dddddddd");
          return;
        }
        this.articalContent = res.data.cont_html_txt;
      } else {
        this.$message.error("获取文章失败了");
      }
      // this.active_art_id = res.data.art_id;
      console.log('res',res);
    },
    //刷新更新数据
    async get_one_article(id){
      const {data:res} = await this.$api.article.get_one_art({id:id});
      if(res.code==10000){
        console.log(res)
        this.getShowInfo(res.data);
      }else if(res.code == 10004){
        this.$message.error(res.msg);
      }
    },
    //接受路由传值
    getShowInfo(item) {

      console.log(item);
      if(item.id){
        console.log('item')
        let head_info = {
          title_icon:item.article_icon,
          title_name:item.article_title,
            un_icon:item.article_icon,
            pre_text:[
              {pre_icon:item.article_time_icon, span: item.create_time},
              {pre_icon:item.article_read_icon, span: item.read_count,detail:"阅读"},
              // {pre_icon:this.$route.query.item.article_time_icon, span: this.$route.query.item.create_time},
            ]
        }
        this.bgd = item.article_img;
        this.title_info = head_info;
        console.log('info',this.title_info)
        if(item.id){
        localStorage.setItem('article_id',item.id);
        this.get_art_id(item.id);
      this.active_art_id = item.id;

        }else{

        this.get_one_article(localStorage.getItem('article_id'));
        }
        // this.get_one_article();
        
      }else{
        console.log('op')
        this.get_one_article(localStorage.getItem('article_id'));
      this.active_art_id = parseInt(localStorage.getItem('article_id'));

      }

      // if (this.$route.query.item.id) {
      //   this.get_art_id(this.$route.query.item.id);
      //   localStorage.setItem("art_id", this.$route.query.item.id);
      // } else {
      //   this.get_art_id(localStorage.getItem("art_id"));
      //   console.log(localStorage.getItem("art_id"));
      // }
    },
  },
};
</script>
<style lang="less" scoped>
#show {
  background-color: #f4f4f4;
}
.show_info {
  min-height: 500px;
  padding-top: 20px;
  color: whitesmoke;
  .title_info {
    padding: 20px;
    line-height: 22px;
  }
}
// 文档css e9ecef
.markdown-body {
  width: 847px;
  padding: 20px;
}
.comment_box{
  background: #1f1b24;
  width: 847px;
  padding-bottom: 50px;
  // padding-right: 333px;
}
</style>
