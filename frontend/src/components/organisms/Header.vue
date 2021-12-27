<template>
  <div class="header">
    <el-menu mode="horizontal"
      :default-active="activeIndex"
      @click="onClickMenuItem">
      <el-menu-item index="0"><router-link to="/">Home</router-link></el-menu-item>
      <el-menu-item index="1"><router-link to="/stocks/">Stocks</router-link></el-menu-item>
    </el-menu>
    <div class="header__right">
      <template v-if="$auth.authenticated">
        <el-button @click="logout">LogOut</el-button>
        <el-avatar shape="circle" :size="32" :src="$auth.user?.picture" />
      </template>
      <template v-else>
        <el-button @click="login">LogIn</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWithPopup()
        .then(console.log);
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: '/' });
    },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  padding: 0 16px;

  &__right {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 16px;
    align-items: center;
  }

  .el-menu.el-menu--horizontal {
    border: none;
  }

  .el-menu-item {
    position: relative;
  }
  a.router-link-exact-active {
    color: lightseagreen!important;
  }
}
</style>
