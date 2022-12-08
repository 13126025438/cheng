<template>
    <div id="letter">
        <CommentVue :opop_title="'留言本子'" :art_id_com="0"/>
    </div>
  </template>
  <script>
  import { calculateDiffTime } from '../../assets/util/timestamp';
  import CommentVue from '../../components/comment/Comment.vue';
  export default {
    data() {
      return {
      };
    },
    components:{
      CommentVue,
    },
    created(){
  
    },
    methods:{
    
    }
  };
  </script>
  <style lang="less" scoped>
#letter{
    color: white;
}
  </style>