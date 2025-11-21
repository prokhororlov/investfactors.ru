<template>
  <div class="stocks-list">
    <el-table
      border
      v-loading="isLoading"
      :data="stocks.data"
      class="stocks-list__table"
      style="width: 100%"
    >
      <el-table-column fixed style="padding: 0" :width="width >= 992 ? 250 : 100">
        <template #header>
          <el-input
            v-model="search"
            @change="addSearchQuery"
            class="stocks-list__search"
            placeholder="Search"
            size="small"
          />
        </template>
        <template #default="scope">
          <div class="stocks-list__item-link">
            <router-link :to="`/stocks/${scope.row.market}:${scope.row.ticker}`">
              <div
                class="stocks-list__item-logo"
                :style="`
                  background:
                    url(https://yastatic.net/s3/fintech-icons/1/i/${normalTicker(
                      scope.row.ticker
                    )}.svg),
                    url(https://pic.onlinewebfonts.com/thumbnails/icons_311343.svg),
                    #F3F3F3;
                  background-size: cover, 70%;
                  background-repeat: no-repeat;
                  background-position: center;
                `"
              />
              <div class="stocks-list__item-ticker">{{ scope.row.ticker }}</div>
            </router-link>
            <div class="stocks-list__item-name">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CAP')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('CAP')"
          >
            Market Cap.
            <Icon
              v-if="sortType === 'CAP'"
              :name="sortStage === 'UP' ? 'arrow-up-short' : 'arrow-down-short'"
              :size="16"
            />
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
            :class="getSortActiveClassConstructor('PRICE')"
          >
            Price
            <Icon
              v-if="sortType === 'PRICE'"
              :name="sortStage === 'UP' ? 'arrow-up-short' : 'arrow-down-short'"
              :size="16"
            />
          </div>
        </template>
        <template #default="scope">
          <div>
            {{
              scope.row.price
                ? `${scope.row.price} ${{ USD: '$', RUB: '₽' }[scope.row.currency]}`
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
            :class="getSortActiveClassConstructor('CHANGE')"
          >
            Change
            <Icon
              v-if="sortType === 'CHANGE'"
              :name="sortStage === 'UP' ? 'arrow-up-short' : 'arrow-down-short'"
              :size="16"
            />
          </div>
        </template>
        <template #default="scope">
          <div
            class="stocks-list__item-change"
            :class="{
              'stocks-list__item-change_increased': scope.row.change > 0 && scope.row.price,
              'stocks-list__item-change_decreased': scope.row.change < 0 && scope.row.price,
              'stocks-list__item-change_neutral':
                (!scope.row.change || scope.row.change === 0) && scope.row.price,
              'stocks-list__item-change_trading':
                scope.row.market === 'MOEX' ? scope.row.is_trading : stocks.meta.is_trading,
            }"
          >
            <Icon
              v-if="scope.row.change && scope.row.price && scope.row.change !== 0"
              :name="scope.row.change > 0 ? 'arrow-up' : 'arrow-down'"
              :size="14"
              class="stocks-list__item-change-icon"
            />
            {{
              scope.row.change && scope.row.price
                ? `${(scope.row.change > 0 ? '+' : '') + scope.row.change}%`
                : '0%'
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div>P/E</div>
        </template>
        <template #default="scope">
          <div>
            {{ scope.row.pe || '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div>EPS</div>
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
            {{ market === 'MOEX' ? 'Daily' : '52 weeks' }}
          </div>
        </template>
        <template #default="scope">
          <PriceRange
            class="stocks-list__price-range"
            :current="scope.row.price"
            :min="scope.row.low52 ?? scope.row.low"
            :max="scope.row.high52 ?? scope.row.high"
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
      :total="stocks?.meta.total"
    />
  </div>
</template>

<script>
import PriceRange from '../atoms/PriceRange/PriceRange.vue';
import { Icon } from '../atoms';

const SORT_TYPES = ['NAME', 'PRICE', 'CHANGE', 'CAP'].reduce((t, i) => ({ ...t, [i]: i }), {});

const SORT_STAGES = ['UP', 'DOWN'].reduce((t, i) => ({ ...t, [i]: i }), {});

export default {
  name: 'StockList',
  components: {
    PriceRange,
    Icon,
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
      // if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'T' };

      return value
        ? `${new Intl.NumberFormat({ USD: 'en-US', RUB: 'ru-RU' }[currency], {
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
        'stocks-list__item-filter_up':
          sortType === this.sortType && this.sortStage === SORT_STAGES.UP,
        'stocks-list__item-filter_down':
          sortType === this.sortType && this.sortStage === SORT_STAGES.DOWN,
      };
    },
    addSearchQuery() {
      this.addToQuery({ search: this.search || undefined });
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
    normalTicker(ticker) {
      return ticker.length === 5 && ticker[4] === 'P' ? ticker.slice(0, 4) : ticker;
    },
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
  },
  computed: {
    market() {
      return this.$route.query.market || 'MOEX';
    },
  },
};
</script>

<style lang="scss">
.stocks-list {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 16px;

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-accent-hover);
    }
  }

  &__search {
    margin-right: 50px;
    max-width: 250px;
  }

  &__table {
    min-height: 450px;
    margin-top: 16px;
    background-color: var(--color-bg-elevated);
    box-shadow: 0 0 10px 10px #ededed;
    border-radius: 8px;

    th {
      font-size: 13px;
      font-weight: 600;
      background-color: var(--color-table-header-bg) !important;
      color: var(--color-table-header-text) !important;
      border-color: var(--color-table-border) !important;
      transition: background-color var(--transition-base);
    }

    td {
      border-color: var(--color-table-border) !important;
      background-color: var(--color-bg-elevated) !important;
    }

    tr:hover td {
      background-color: var(--color-table-row-hover) !important;
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
    &-link {
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
      border: 1px solid var(--color-border-secondary);
      width: 25px;
      height: 25px;
      border-radius: 25px;
      transition: border-color var(--transition-fast);
    }

    @media (max-width: 991px) {
      &-name {
        display: none;
      }
    }

    &-filter {
      cursor: pointer;
      transition: all var(--transition-fast);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
      user-select: none;

      &:hover {
        color: var(--color-accent);
        background-color: var(--color-bg-hover);
      }

      &_active {
        color: var(--color-accent);
        font-weight: 600;
      }
    }

    &-change {
      opacity: 0.5;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);

      &_trading {
        opacity: 1;
      }
      &_increased {
        color: var(--color-success);
        background-color: var(--color-success-bg);
        opacity: 1;

        .stocks-list__item-change-icon {
          color: var(--color-success);
        }
      }
      &_decreased {
        color: var(--color-danger);
        background-color: var(--color-danger-bg);
        opacity: 1;

        .stocks-list__item-change-icon {
          color: var(--color-danger);
        }
      }
      &_neutral {
        color: var(--color-text-tertiary);
        background-color: var(--color-bg-secondary);
        opacity: 1;
      }

      &-icon {
        flex-shrink: 0;
      }
    }
  }
}
</style>
