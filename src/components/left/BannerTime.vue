<template>
  <div id="banner_time">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in banner_time"
          :key="index"
          :timestamp="
            calculateDiffTime(
              item.create_time,
              Math.round(new Date().getTime() / 1000).toString(),
              6
            )
          "
          placement="top"
        >
          <div class="time_content">
            <!--  -->
            <span class="text_see">{{ item.dictum }}</span>
            
            <span><span>  - - - - - - - -  </span> {{ item.user.username }}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { calculateDiffTime } from "../../assets/util/timestamp";
export default {
  data() {
    return {
      banner_time: [],
      loadingBanner: false,
      calculateDiffTime: calculateDiffTime,
    };
  },
  created() {
    this.get_banner();
  },
  methods: {
    //获取最新banner
    async get_banner() {
      const { data: res } = await this.$api.banner.get_all_banner();
      this.loadingBanner = false;

      if (res.code == 10004) {
        return;
      }
      this.banner_time = res.data;
      // this.loadingBanner= false;
      console.log("df", res.data);
    },
  },
};
</script>
<style lang="less" scoped>
#banner_time {
  .block {
    padding: 20px;
  }
}
/deep/ .el-timeline-item__tail {
  position: absolute;
  left: 6px;
  height: 100%;
  border-left: 2px solid #2d477c;
}
/deep/ .el-timeline-item__node--normal {
  border: 2px solid #002fff;
  width: 16px;
  height: 16px;
}
/deep/ .el-timeline-item__timestamp {
  color: #ffffffce;
  line-height: 1;
  font-size: 16px;
}
.time_content {
  background: #121212;
  padding: 20px;
  color: #ffffffce;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  border: 1px solid #0f0f0f;
}
.text_see {
  max-width: 60%;
  line-clamp: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>