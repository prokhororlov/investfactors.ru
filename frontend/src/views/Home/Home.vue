<template>
  <div class="home">
    <div class="home-screen-welcome">
      <div class="home-screen-welcome__content">
        <div class="home-screen-welcome__header">
          Invest wisely
          <span>using professional researches</span>
        </div>
        <div class="home-screen-welcome__desc">
          Explore&nbsp;&amp;&nbsp;verify factors to&nbsp;buy or&nbsp;sell,
          take part in&nbsp;discussions, follow best rated authors,
          share your&nbsp;own&nbsp;expertise
        </div>
        <div class="home-screen-welcome__button">
          <router-link to="/stocks/">
            <el-button type="success">Go to stocks</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
.home {
  & > * {
    box-sizing: border-box;
  }
  .home-screen{

    &-welcome {
      background: #3c5ecd url('./assets/img/bg.png');
      background-size: cover;
      background-position: center;
      height: calc(100vh - 60px);
      text-align: left;
      color: white;
      padding: 80px 120px;

      @media(max-width: 767px) {
        padding: 60px 32px;
      }

      &__content{
        max-width: 380px;
        display: grid;
        grid-gap: 24px;
      }

      &__header {
        font-size: 34px;
        font-weight: bold;
        line-height: 1;

        span {
          font-size: 30px;
          font-weight: lighter;
        }
      }
      &__desc {
        font-size: 16px;
        line-height: 1.4;
        font-weight: lighter;
        opacity: 0.7;
      }

    }
  }

}
</style>
