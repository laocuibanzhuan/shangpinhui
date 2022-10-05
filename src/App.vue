<template>
  <div>
    <Head></Head>
    <router-view></router-view>
    <Foot v-show="$route.meta.show" content=""></Foot>
  </div>
</template>

<script>
import Head from "@/components/header/Head.vue";
import Foot from "@/components/footer/Foot.vue";

export default {
  components: {
    Head,
    Foot,
  },
  mounted() {
    this.$store.dispatch("home/categoryList")
  },
};
</script>

<style></style>
