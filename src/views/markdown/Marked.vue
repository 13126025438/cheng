
<template>
   <div id="marked">
      <div class="markdown-body" v-html="articalContent"></div>

   </div>
</template>

<script>
import {marked} from 'marked'
export default {
    name: '',
    data() {
        return {
            // htmlMD: '',
            articalContent:""
        };
    },
    mounted() {
        // this.getHtmlMD(this.$route.query.databaseType);
    },
  created() {
   this.$api.upload.mdUrl().then(res=>{
      console.log(res)
      return;
      const htmlMD = marked(res.data);
         console.log(res)
        this.articalContent = htmlMD;
   })
   //  this.$http.get("http://127.0.0.1:8803/project.md").then(res => {
   //      const htmlMD = marked(res.data);
   //       console.log(res)
   //      this.articalContent = htmlMD;
   //    });
  },
methods: {
        getHtmlMD(type) {
            // this.htmlMD = require(`./cheng/${type.toLowerCase()}.md`); //导入md 我这里根据不同的类型拿不同md文件
        }
    }
};
</script>
<style lang="less" scoped>
#marked{
   color: #f5f5f5;
}
.markdown-body {
   padding: 20px;
   min-width: 200px;
   max-width: 900px;
   font-size: 12px;
   h2 {
      font-size: 18px;
      margin: 1em 0 15px;
      padding-top: 0.8em;
      padding-bottom: 0.8em;
   }
   h3 {
      font-size: 14px;
      margin: 22px 0 16px;
   }
   h4 {
      font-size: 13px;
      margin: 20px 0 16px;
   }
   h5 {
      font-size: 12px;
      margin: 16px 0 16px;
      font-weight: 700;
   }
   p {
      font-size: 12px;
      line-height: 24px;
      color: #666666;
      margin-top: 0px;
      margin: 8px 0;
      margin: 14px 0 14px;
   }
   pre {
      background-color: #eee;
      margin-bottom: 8px;
      margin-top: 8px;
      margin: 12px 0 12px;
   }
   blockquote {
      margin-bottom: 8px;
      margin-top: 8px;
      margin: 14px 0 14px;
      background-color: #eee;
      padding: 16px 16px;
   }
   tr {
      background-color: #f5f5f5;
   }
   code {
      background-color: #eee;
   }
   ul,
   ol,
   li {
      list-style: unset;
      font-size: 12px;
      line-height: 20px;
      color: #666666;
      margin-top: 0px;
      margin: 8px 0;
   }
   blockquote {
      border-color: #48b6e2;
   }
   table {
      display: table;
      width: 100%;
      max-width: 100%;
      margin-bottom: 20px;
   }
}


</style>