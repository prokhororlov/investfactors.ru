<template>
  <div class="header">
    <div class="header__left">
      <router-link to="/">
        <img :src="logo" class="header__logo" alt="">
      </router-link>
    </div>
    <el-menu mode="horizontal" class="header__middle"
      :default-active="activeIndex"
      @click="onClickMenuItem">
      <el-menu-item index="1" class="header__nav-item">
        <router-link to="/stocks/">Stocks</router-link>
      </el-menu-item>
      <el-menu-item index="2" class="header__nav-item" disabled>
        <router-link to="/scriners/">Scriners</router-link>
      </el-menu-item>
      <el-menu-item index="3" class="header__nav-item" disabled>
        <router-link to="/about/">About</router-link>
      </el-menu-item>
    </el-menu>
    <div class="header__right" v-if="!$auth.user?.loading">
      <span class="header__user-email">{{ $auth.user?.email }}</span>
      <template v-if="$auth.authenticated">
        <el-dropdown>
          <el-avatar
            class="header__user-pic"
            shape="circle"
            :size="32"
            :src="$auth.user?.picture"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.replace('/profile/')" class="header__dropdown-item">
                <Icon name="person-fill" :size="16"/> Профиль
              </el-dropdown-item>
              <el-dropdown-item @click="logout" class="header__dropdown-item">
                <Icon name="power" :size="16"/> Выйти
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button size="medium" disabled>Log in</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';
import { Icon } from '../atoms';

export default {
  components: {
    Icon,
  },
  data: () => ({
    logo,
  }),
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      const token = (await this.$auth.getTokenSilently());

      this.$store.commit('setToken', token);
    },
    async logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });

      await this.$auth.handleRedirectCallback();
      this.$store.commit('setToken', '');
    },
    onClickMenuItem(e) {
      if (e?.target?.tagName === 'LI') {
        const link = e.target.querySelector('a');
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
  box-shadow: var(--shadow-md);
  background-color: var(--color-bg-elevated);
  position: relative;
  height: 60px;
  transition: background-color var(--transition-base), box-shadow var(--transition-base);

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
    align-items: center;
    grid-gap: 16px;
    align-items: center;
  }

  &__user-email {
    font-size: 12px;
    color: var(--color-text-secondary);

    @media(max-width: 575px) {
      display: none;
    }
  }
  &__user-pic {
    cursor: pointer;
  }

  &__middle {
    border: none!important;
    background: none;

    @media(max-width: 575px) {
      display: none;
    }
  }

  &__nav-item {
    border: none!important;
    padding: 0 16px;
    background-color: transparent;

    @media (max-width: 991px) {
      padding: 0 12px;
    }

    &.is-disabled {
      pointer-events: none;
    }
  }

  .el-menu-item {
    position: relative;
  }
  a.router-link-exact-active {
    color: lightseagreen!important;
  }
  &__dropdown-item {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: 4px;
    justify-content: left;
    text-decoration: none;
    font-family: sans-serif;
  }
}
</style>
