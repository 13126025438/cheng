<template>
    <div class="search">
        <Navigater/>
        <Haderbgk :isNvg="false"/>
        <Centeritem :isShowSeiper="false" />
    </div>
</template>
<script>
import Navigater from "../../components/header/Navigater.vue";
import Haderbgk from "../../components/header/Haderbgk.vue";
import Centeritem from "../../components/body/Centeritem.vue";
export default {
    data(){
        return{
        }
    },
    created(){
    
    },
  components: {
    Haderbgk,
    Navigater,
    Centeritem
  },
}
</script>
<style lang="less" scoped>

</style>