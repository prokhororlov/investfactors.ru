<template>
  <div class="profile" :style="{ height: `${height}px`}">
    <template v-if="!isLoading">
      <div class="profile__item">
        <div class="profile__label">Сектор: </div>
        <div class="profile__value">{{details.sector}}</div>
      </div>
      <div class="profile__item">
        <div class="profile__label">Отрасль: </div>
        <div class="profile__value">{{details.industry}}</div>
      </div>
      <div class="profile__desc">
          {{details.desc}}
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  props: {
    ticker: String,
    height: Number,
  },
  data() {
    return {
      isLoading: false,
      details: {
        sector: '',
        industry: '',
        desc: '',
      },
    };
  },
  methods: {
    getDetails() {
      if (this.isLoading) return;
      const [market, ticker] = this.ticker.split(':');

      this.isLoading = true;
      axios.post('/api/details', {
        market,
        ticker,
      })
        .then((response) => {
          this.details.sector = response.data.sector || '-';
          this.details.industry = response.data.industry || '-';
          this.details.desc = response.data.desc || 'Пока нет данных о компании';
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getDetails();
  },
};
</script>

<style lang="scss">
.profile {
  grid-gap: 4px;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #e0e3eb;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: left;
  line-height: 1.4;

  &__item{
    margin-bottom: 12px;
    display: flex;
  }
  &__label{
    font-weight: bold;
    margin-right: 8px;
  }
  &__desc {
    margin-top: 20px;
  }
}
</style>
