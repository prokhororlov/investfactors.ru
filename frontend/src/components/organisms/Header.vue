<template>
  <div class="header">
    <div class="header__left">
      <router-link to="/">
        <img :src="logo" class="header__logo" alt="">
      </router-link>
    </div>
    <!-- <el-menu mode="horizontal" class="header__middle"
      :default-active="activeIndex"
      @click="onClickMenuItem">
      <el-menu-item index="1" class="header__nav-item">
        <router-link to="/stocks/">Котировки</router-link>
      </el-menu-item>
    </el-menu> -->
    <div class="header__right">
      <template v-if="$auth.authenticated">
        <el-button @click="logout" round>Выйти</el-button>
        <el-avatar shape="circle" :size="32" :src="$auth.user?.picture" />
      </template>
      <template v-else>
        <el-button @click="login" round>Войти</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';

export default {
  data: () => ({
    logo,
  }),
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
  border: none;
  padding: 0 16px;
  box-shadow: 0 0 16px #0003;
  position: relative;
  height: 60px;

  &__logo {
    width: 100px;
    margin-top: -2px;

    @media (max-width: 575px) {
      width: 80px;
    }
  }

  &__right {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 16px;
    align-items: center;
  }

  .el-menu.el-menu--horizontal {
    border: none;
  }

  &__nav-item {
    border: none!important;
    padding: 0 8px;
  }

  .el-menu-item {
    position: relative;
  }
  a.router-link-exact-active {
    color: lightseagreen!important;
  }
}
</style>
