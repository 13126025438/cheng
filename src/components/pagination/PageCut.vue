<template>
    <div style="text-align: center; margin: 10px">
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="changePage"
      :current-page="currentPage"
      background
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      total: {
        type: Number,
        default: 100,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
    },
    // watch: {
    //   currentPage(val) {
    //     console.log("---val--", val);
    //   },
    // },
    methods: {
      changePage(page) {
        this.$emit("changePage", page);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    },
    created() {},
  };
  </script>
  
  <style lang="less" >
  .el-pagination__total,.el-pagination__jump{
    color: #FFF !important;
  }

  </style>