<template>
  <div class="home">
    <div class="home-screen-welcome">
      <div class="home-screen-welcome__hero">
        <div class="home-screen-welcome__logo">
          <router-link to="/">
            <img :src="logoWhite" class="home-screen-welcome__logo-img" alt="Invest Factors" />
          </router-link>
        </div>
        <div class="home-screen-welcome__content">
          <div class="home-screen-welcome__header">
            Make smarter investment decisions
            <span>with data-driven insights</span>
          </div>
          <div class="home-screen-welcome__desc">
            Discover verified investment factors, analyze market trends, engage with expert traders,
            and share your own research in a professional community
          </div>
          <div class="home-screen-welcome__button">
            <router-link to="/stocks/">
              <el-button type="primary" size="large" class="cta-button"> Explore Stocks </el-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="home-features">
        <div class="home-features__container">
          <FeatureCard
            icon="graph-up"
            title="Market Analysis"
            :description="`Real-time stock data with advanced metrics including
              P/E ratios, EPS, market cap, and 52-week ranges`"
          />
          <FeatureCard
            icon="people"
            title="Expert Community"
            :description="`Connect with top-rated analysts, follow investment
              strategies, and participate in market discussions`"
          />
          <FeatureCard
            icon="shield-check"
            title="Verified Research"
            :description="`Access peer-reviewed investment factors and data-backed
              insights to validate your decisions`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FeatureCard } from '../../components/molecules';
import logoWhite from '../../assets/img/logo-white.svg';

export default {
  name: 'Home',
  components: {
    FeatureCard,
  },
  data() {
    return {
      logoWhite,
    };
  },
};
</script>

<style lang="scss">
.home {
  & > * {
    box-sizing: border-box;
  }

  .home-screen {
    &-welcome {
      background: var(--color-primary) url('./assets/img/bg.jpg');
      background-size: cover;
      background-position: center;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      color: white;
      position: relative;
      overflow: hidden;

      @media (max-width: 991px) {
        height: max-content;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(60, 94, 205, 0.9) 0%, rgba(0, 201, 255, 0.7) 100%);
        z-index: 0;
      }

      &__hero {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 80px 120px 40px;
        position: relative;
        z-index: 1;

        @media (max-width: 767px) {
          padding: 60px 32px 32px;
        }
      }

      &__logo {
        margin-bottom: 40px;

        @media (max-width: 767px) {
          margin-bottom: 32px;
        }
      }

      &__logo-img {
        height: 40px;
        width: auto;

        @media (max-width: 767px) {
          height: 32px;
        }
      }

      &__content {
        max-width: 560px;
        display: grid;
        grid-gap: 32px;
      }

      &__header {
        font-size: 48px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.5px;

        @media (max-width: 767px) {
          font-size: 36px;
        }

        span {
          display: block;
          font-size: 32px;
          font-weight: 300;
          margin-top: 8px;
          opacity: 0.95;

          @media (max-width: 767px) {
            font-size: 24px;
          }
        }
      }

      &__desc {
        font-size: 18px;
        line-height: 1.6;
        font-weight: 300;
        opacity: 0.9;
        max-width: 500px;

        @media (max-width: 767px) {
          font-size: 16px;
        }
      }

      &__button {
        .cta-button {
          font-weight: 600;
          padding: 16px 32px;
          font-size: 16px;
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);

          &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
        }
      }
    }
  }

  .home-features {
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 40px 120px 60px;
    position: relative;
    z-index: 1;
    mask-image: linear-gradient(to bottom, transparent 0%, black 40px);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40px);

    @media (max-width: 991px) {
      padding: 80px 120px 40px;
    }

    @media (max-width: 767px) {
      padding: 60px 32px 32px;
    }

    &__container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      width: 100%;

      @media (max-width: 991px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  }
}
</style>
