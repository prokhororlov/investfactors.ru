<template>
  <div class="company-profile" :style="{ height: `${height}px`}">
    <template v-if="!isLoading">
      <div class="company-profile__item">
        <div class="company-profile__label">Сектор: </div>
        <div class="company-profile__value">{{details.sector}}</div>
      </div>
      <div class="company-profile__item">
        <div class="company-profile__label">Отрасль: </div>
        <div class="company-profile__value">{{details.industry}}</div>
      </div>
      <div class="company-profile__desc">
        <p v-for="(paragraph, i) of details.desc" :key="i">{{paragraph}}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CompanyProfile',
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
        desc: [''],
      },
    };
  },
  methods: {
    getDetails() {
      if (this.isLoading) return;
      const [market, ticker] = this.ticker.split(':');

      this.isLoading = true;
      this.$store.state.api.getCompanyDetails({ market, ticker })
        .then((response) => {
          this.details.sector = response.data.sector || '-';
          this.details.industry = response.data.industry || '-';
          this.details.desc = response.data.desc.replace(/\n+/g, '\n').split('\n') || ['Пока нет данных о компании'];
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
.company-profile {
  grid-gap: 4px;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #e0e3eb;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: left;
  line-height: 1.4;
  font-size: 14px;
  background: white;
  box-shadow: 0 0 10px 10px #ededed;

  &::-webkit-scrollbar             { width: 5px; height: 5px; }
  &::-webkit-scrollbar-track       { background: transparent; }
  &::-webkit-scrollbar-thumb       {
    background: #9598a1;
    border-radius: 3px;
    border: 1px solid #f0f3fa;
  }
  &::-webkit-scrollbar-thumb:hover { background:  #9598a1; }

  &__item{
    margin-bottom: 4px;
    display: flex;
  }
  &__label{
    font-weight: bold;
    margin-right: 8px;
  }
  &__desc {
    margin-top: 16px;

    p {
      margin: 8px 0;
    }
  }
}
</style>
