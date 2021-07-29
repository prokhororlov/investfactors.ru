<template>
  <el-menu class="header" mode="horizontal"
    :default-active="activeIndex"
    @click="onClickMenuItem">
    <el-menu-item index="0"><router-link to="/">Home</router-link></el-menu-item>
    <el-menu-item index="1"><router-link to="/stocks/">Stocks</router-link></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    onClickMenuItem(e) {
      const target = e.path[0];
      if (target.tagName === 'LI') {
        const link = e.path[0].querySelector('a');
        if (link) link.click();
      }
    },
  },
  computed: {
    activeIndex() {
      return ({
        Home: '0',
        Stocks: '1',
      })[this.$route.name];
    },
  },
};
</script>

<style lang="scss">
.header {
  .el-menu-item {
    position: relative;
  }
  a.router-link-exact-active {
    color: lightseagreen!important;
  }
}
</style>
