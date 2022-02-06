const db = require('../connect');
const config = require('../config');

const PAGE_SIZE = 20;

const SORT_TYPES = ['NAME', 'PRICE', 'CHANGE', 'CAP']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

const SORT_STAGES = ['UP', 'DOWN']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

function paginate({ data, page }) {
  return data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

function search({ data, query }) {
  return data.filter((item) => {
    const regexp = new RegExp(`^${query}`, 'ig');
    return regexp.test(item.ticker) || regexp.test(item.name);
  });
}

function sortFunction(options) {
  return (a, b) => {
    let result;
    switch (options.type) {
      case SORT_TYPES.PRICE:
        result = [b.price - a.price, a.price - b.price];
        break;

      case SORT_TYPES.CHANGE:
        result = [b.change - a.change, a.change - b.change];
        break;

      case SORT_TYPES.CAP:
      default: {
        const aCap = a.cap || 0;
        const bCap = b.cap || 0;
        result = [bCap - aCap, aCap - bCap];
        break;
      }
    }

    return result[({ UP: 0, DOWN: 1 })[options.stage]];
  };
}

function sort({ data, type, stage }) {
  return data.sort(sortFunction({ type, stage }));
}

module.exports = async (req, res) => {
  try {
    const query = {
      page: req.body.page || 1,
      search: req.body.search || '',
      sort_type: req.body.sort_type || SORT_TYPES.CAP,
      sort_stage: req.body.sort_stage || SORT_STAGES.UP,
      market: req.body.market || 'MOEX',
    };
    const snapshot = await db.database().ref(config.refs.stocks).child(query.market).once('value');
    const stocks = Object.values(snapshot.val());

    const searchResult = search({
      data: stocks,
      query: query.search,
    });

    const sortResult = sort({
      data: searchResult,
      type: query.sort_type,
      stage: query.sort_stage,
    });

    const pageResult = paginate({
      data: sortResult,
      page: query.page,
    });

    res.status(200).send({
      meta: {
        total: sortResult.length,
        page_size: PAGE_SIZE,
      },
      data: pageResult,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
