<template>
  <div class="home">
    <mavon-editor
      :codeStyle="codeStyle"
      :toolbars="toolbars"
      v-model="POSTDocx.input.value.docxContent"
      :ishljs="true"
      ref="md"
      @change="change"
      @imgAdd="handleEditorImgAdd"
    />
    <!-- <el-button @click="outiptText()">text md</el-button> -->
    <div class="save_btn">
      <el-button class="" type="primary" @click="outiptHtml"> 保存文章 </el-button>

    </div>
    <div class="markdown-body"></div>
  </div>
</template>
  <!-- 
    https://blog.csdn.net/qq_44706619/article/details/119377414
   -->
  <script>
export default {
  data() {
    return {
      //工具栏
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      //主题
      codeStyle: "monokai-sublime",
      POSTDocx: {
        input: {
          value: {
            docxTitle: undefined,
            docxBrief: undefined,
            docxContent: `请输入文章正文`,
            categoryId: undefined,
            // docxTime: new Date().format("yyyy/MM/dd hh:mm:ss"),
          },
        },
        format_html: undefined, //这是html结构的用于详情页展示
      },
      mdval:""
    };
  },
  methods: {
    outiptHtml() {
      //这两个就可以分别拿去存到数据库，针对不同场景进行使用
      this.mdval = this.$refs.md.d_render
      this.$emit("getmdVal",this.mdval);
      // console.log(this.mdval);
      // console.log('md格式',this.$refs.md.d_value)
    },
    // outiptText() {
    //   //这两个就可以分别拿去存到数据库，针对不同场景进行使用
    //   // console.log('html格式',this.$refs.md.d_render)
    //   console.log("md格式", this.$refs.md.d_value);
    // },
    //上传图片
    handleEditorImgAdd(place, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      this.http({
        cmd: "POSTImgUpload", //POSTAdminInvitationAdd
        input: formdata,
        success(res) {
          if (res.code === 200) {
            this.$message.success("上传成功");
            let url = res.data.url.replace(/\\/g, "/");
            //第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
            this.$refs.md.$img2Url(place, window.config.host + url);
          } else {
            this.$message.error(res.msg);
          }
        },
      });
    },

    outputENter() {
      // console.log(JSON.stringify(this.content))
      // console.log(this.$refs.md.d_render)
      // console.log(this.$refs.md.d_value)
      console.log(JSON.stringify(this.test_html)); //就用这个存数据库  然后进行回显即可
      // this.$axios.post("http://127.0.0.1:3009",{
      //   params:{
      //     msg:this.test_html
      //   }
      // }).then((res)=>{
      //   console.log(res)
      //   console.log("响应成功")
      // })
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.test_html = render;
    },
  },
};
</script>
  <style lang="less" scoped>
.hljs {
  border-radius: 4px !important;
}
.save_btn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
  