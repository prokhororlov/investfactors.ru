const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GD_TABLE);

const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

async function init() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GD_CLIENT_EMAIL,
    private_key: process.env.GD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();
}

async function getStocks(title) {
  const sheet = doc.sheetsByTitle[title];
  const grid = sheet.gridProperties;
  await sheet.loadCells(`A1:${alpha[grid.columnCount]}${grid.rowCount}`);

  const keys = Array.from(Array(grid.columnCount).keys())
    .map((i) => sheet.getCell(0, i).value);

  const tickers = Array.from(Array(grid.rowCount).keys())
    .map((i) => sheet.getCell(i, 0).value);

  return tickers.reduce((accItems, ticker, i) => [
    ...accItems,
    keys.reduce((accItem, key, j) => ({
      ...accItem,
      [key]: sheet.getCell(i, j).value,
    }), {}),
  ], []).slice(1);
}

async function getRows(title, from, to) {
  const sheet = doc.sheetsByTitle[title];
  const grid = sheet.gridProperties;
  await sheet.loadCells(`${alpha[from]}2:${alpha[to]}${grid.rowCount}`);

  const items = Array.from(Array(grid.rowCount).keys()).slice(1);
  const rows = Array.from(Array(to - from + 1).keys()).map((i) => i + from);

  return items.map((_, i) => rows.map((row) => (
    sheet.getCell(i + 1, row).value
  )));
}

module.exports = {
  getRows,
  getStocks,
  init,
};
