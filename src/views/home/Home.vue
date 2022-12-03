<template>
    <div id="home">
        <!-- index top -->
       <NavigaterVue></NavigaterVue>
        <HaderbgkVue></HaderbgkVue>
        <!-- centeritem -->
        <centeritem></centeritem>
    </div>
</template>
<script>
import NavigaterVue from '../../components/header/Navigater.vue';
import HaderbgkVue from '../../components/header/Haderbgk.vue';
// import hedindex from '../../components/header/Heidex.vue'
import centeritem from '../../components/body/Centeritem.vue'
export default {
    // name: home,
    data(){
        return{
           token:""
        }
    },
    components:{
        NavigaterVue,
        centeritem,
        HaderbgkVue
    },
    mounted(){
      this.auth();
    },
    methods:{
        auth(){
           const token = localStorage.getItem('token');
    
        }
    }
}
</script>
<style scoped>

</style>