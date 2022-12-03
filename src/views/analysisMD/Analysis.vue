<template>
  <div id="analysis">
    <div class="left" >
      代码高亮
      <pre v-highlight>
        pp
    <code class="" v-html="code" @click="getVal(code)"></code>
</pre>

<pre v-highlight>
     <code class="hljs">
        <div class="copy" >复制</div>{{code}}</code>
 </pre>




    </div>
    <div class="right">md文件 解析</div>
  </div>
</template>
<script>
export default {
  name: "Analysis",
  props: {},
  data() {
    return {
      code: `
      let x = 5;
      let y=10;
      let obj={
        age:12,
        name:'lihao'
      }`,
    };
  },
  components: {},
  mounted() {},
  methods: {
    getVal(val){
        // const copyText = val;
        // copyText.select();
        // document.execCommand("copy");
    }
  },
};
</script>
<style lang="less" scoped>
#analysis {
  color: aliceblue;
  display: flex;
  div {
    flex: 1;
  }
  .left{
    background: black;
  }
}

pre {
  position: relative;
  min-width: 600px;
  margin: 0;
}
.hljs {
  display: block;
  width: 100%;
  margin: 0;
  padding: 1px;
  color: #abb2bf;
  font-weight: 200;
  font-size: 0.75rem;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  line-height: 1.5;
  white-space: pre-wrap;
  border: 0;
}
.hljs ol {
  margin: 0 0 0 35px;
  padding: 0;
  list-style-type: decimal;
}
.hljs ol li {
  // padding: 5px;
  // padding-left: 10px;
  color: #abb2bf;
  white-space: pre;
  // list-style: decimal-leading-zero;
  list-style-position: outside;
  border-left: 1px solid #c5c5c5;
}
code{
    position: relative;
}
.copy{

}
</style>
