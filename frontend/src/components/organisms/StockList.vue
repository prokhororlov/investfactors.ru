<template>
  <div class="stocks-list">
    <el-table
      border
      v-loading="isLoading"
      :data="stocks.data"
      class="stocks-list__table"
      style="width: 100%">
      <el-table-column style="padding: 0;" :width="width >= 992 ? 250 : 100">
        <template #header>
          <el-input
            v-model="search"
            @change="addSearchQuery"
            class="stocks-list__search"
            placeholder="Поиск"
            size="small"
          />
        </template>
        <template #default="scope">
          <div class="stocks-list__item-link">
            <router-link :to="`/stocks/${scope.row.market}:${scope.row.ticker}`">
              <div
                class="stocks-list__item-logo"
                :style="`
                  background: url(https://yastatic.net/s3/fintech-icons/1/i/${scope.row.ticker}.svg), #F3F3F3;
                `" />
              <div class="stocks-list__item-ticker" >{{ scope.row.ticker }}</div>
            </router-link>
            <div class="stocks-list__item-name" >{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CAP')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('CAP')">
            Капитализация
          </div>
        </template>
        <template #default="scope">
          {{ formatCap(scope.row.cap, scope.row.currency) }}
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('PRICE')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('PRICE')">
            Цена
          </div>
        </template>
        <template #default="scope">
          <div>
            {{
              scope.row.price
                ? `${scope.row.price} ${({ USD: '$', RUB: '₽'})[scope.row.currency]}`
                : '-'
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CHANGE')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('CHANGE')">
            Изменение
          </div>
        </template>
        <template #default="scope">
          <div class="stocks-list__item-change"
          :class="{
            'stocks-list__item-change_increased': scope.row.change > 0 && scope.row.price,
            'stocks-list__item-change_decreased': scope.row.change < 0 && scope.row.price,
          }">
            {{ scope.row.change && scope.row.price ? `${scope.row.change}%` : '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('VOLUME')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('VOLUME')">
            Объём
          </div>
        </template>
        <template #default="scope">
          <div v-if="scope.row.volume">
            {{ formatCap(scope.row.volume * 1000, scope.row.currency) }}
          </div>
          <template v-else>-</template>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div>
            P/E
          </div>
        </template>
        <template #default="scope">
          <div>
            {{ scope.row.pe || '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div>
            EPS
          </div>
        </template>
        <template #default="scope">
          <div>
            {{ scope.row.eps || '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="120">
        <template #header>
          <div>
            52 недели
          </div>
        </template>
        <template #default="scope">
          <PriceRange
            class="stocks-list__price-range"
            :current="scope.row.price"
            :min="scope.row.low52"
            :max="scope.row.high52"
          />
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      small
      v-if="stocks?.data?.length"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentPageChange"
      :page-size="stocks?.meta.page_size"
      v-model:currentPage="currentPage"
      :disabled="isLoading"
      :total="stocks?.meta.total" />
  </div>
</template>

<script>

import PriceRange from '../atoms/PriceRange/PriceRange.vue';

const SORT_TYPES = ['NAME', 'PRICE', 'CHANGE', 'CAP', 'VOLUME']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

const SORT_STAGES = ['UP', 'DOWN']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

export default {
  name: 'StockList',
  components: {
    PriceRange,
  },
  props: {
    stocks: {
      meta: Object,
      data: Array,
    },
    isLoading: Boolean,
  },
  data() {
    return {
      width: window.innerWidth,
      search: this.$route.query.search || '',
      page: +this.$route.query.page || 1,
      sortType: this.$route.query.sort_type || SORT_TYPES.CAP,
      sortStage: this.$route.query.sort_stage || SORT_STAGES.UP,
    };
  },
  methods: {
    addToQuery(data) {
      this.$router.push({
        path: '/stocks/',
        query: {
          ...this.$route.query,
          ...data,
        },
      });
    },
    setSortType(type) {
      switch (this.sortStage) {
        case SORT_STAGES.UP:
          this.sortStage = SORT_STAGES.DOWN;
          this.sortType = type;
          break;
        case SORT_STAGES.DOWN:
          this.sortStage = SORT_STAGES.UP;
          this.sortType = type;
          break;
        default:
          this.sortType = SORT_TYPES.CAP;
          this.sortStage = SORT_STAGES.UP;
      }

      this.addToQuery({
        page: 1,
        sort_type: this.sortType,
        sort_stage: this.sortStage,
      });
    },
    formatCap(value, currency) {
      let cap = { value, measure: '' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'K' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'M' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'B' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'T' };

      return value
        ? `${
          new Intl.NumberFormat(({ USD: 'en-US', RUB: 'ru-RU' })[currency], {
            style: 'currency',
            currency,
          }).format(cap.value)} ${cap.measure}`
        : '-';
    },
    handleCurrentPageChange(page) {
      this.addToQuery({ page });
      window.scrollTo({
        top: 61 + 16,
        behavior: 'smooth',
      });
    },
    getSortActiveClassConstructor(sortType) {
      return {
        'stocks-list__item-filter_active': sortType === this.sortType && this.sortStage,
        'stocks-list__item-filter_up': sortType === this.sortType && this.sortStage === SORT_STAGES.UP,
        'stocks-list__item-filter_down': sortType === this.sortType && this.sortStage === SORT_STAGES.DOWN,
      };
    },
    addSearchQuery() {
      this.addToQuery({ search: this.search || undefined });
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
  },
};
</script>

<style lang="scss">
  .stocks-list {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 16px;

    a {
      color: lightseagreen;
      text-decoration: none;
    }

    &__search {
      margin-right: 50px;
      max-width: 250px;
    }

    &__table {
      min-height: 450px;
      margin-top: 16px;

      th {
        font-size: 12px;
        font-weight: lighter;
      }

      .cell {
        white-space: nowrap;
        line-height: 1;
        margin: -1px;
      }
    }

    .el-table_1_column_1 .cell {
      padding-left: 1px;
    }
    td.el-table_1_column_8 .cell {
      padding: 0 4px;
    }

    &__item {
      &-link{
        display: inline-grid;
        align-items: center;
        grid-auto-flow: column;
        grid-gap: 8px;
        line-height: 1;

        a {
          display: grid;
          grid-auto-flow: column;
          justify-content: space-between;
          align-items: center;
          grid-gap: 8px;
        }
      }

      &-logo {
        border: 1px solid #E8E8E8;
        width: 25px;
        height: 25px;
        border-radius: 25px;
      }

      @media (max-width: 991px) {
        &-name{
          display: none;
        }
      }

      &-filter {
        cursor: pointer;
        transition: 0.3s;
        &:hover, &_active {
          color: lightseagreen;
        }

        &_up::after{
          content: '↑';
        }
        &_down::after{
          content: '↓';
        }
      }

      &-change {
        &_increased {
          color: green;
        }
        &_decreased {
          color: red;
        }
      }
    }
  }
</style>
