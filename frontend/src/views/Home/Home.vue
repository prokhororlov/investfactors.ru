<template>
  <div class="home">
    <div class="home-screen-welcome">
      <div class="home-screen-welcome__content">
        <div class="home-screen-welcome__header">
          Invest wisely with Invest Factors
        </div>
        <div class="home-screen-welcome__desc">
          Invest Factors is a project created
          for long-term investors intended to&nbsp;track
          actual state of&nbsp;potential company
          growth&nbsp;&amp;&nbsp;falls factors
        </div>
        <div class="home-screen-welcome__button">
          <router-link to="/stocks/">
            <el-button>Go to stocks</el-button>
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
    padding: 60px 120px;
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

      @media(max-width: 767px) {
        padding: 60px 32px;
      }

      &__content{
        max-width: 340px;
        display: grid;
        grid-gap: 24px;
      }

      &__header {
        font-size: 40px;
        font-weight: bold;
        line-height: 1;
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
