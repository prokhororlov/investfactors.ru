const isValidTime = (timeStart, timeEnd, days = [1, 2, 3, 4, 5]) => {
  const start = timeStart.split(':').reduce((acc, next) => (Number(acc) * 100 + Number(next)), 0);
  const end = timeEnd.split(':').reduce((acc, next) => (Number(acc) * 100 + Number(next)), 0);

  const date = new Date();
  date.setHours(date.getUTCHours() + 3);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const currentTime = +[hours, minutes, seconds].join('');

  return days.includes(day)
    && ((currentTime > start && currentTime <= 235959) || (currentTime < end && currentTime > 0));
};

const arrToMap = (arr, key) => {
  const res = {};
  arr.forEach((item) => {
    res[item[key]] = item;
  });
  return res;
};

module.exports = {
  isValidTime,
  arrToMap,
};
