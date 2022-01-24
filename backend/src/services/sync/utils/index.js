const isValidTime = (timeStart, timeEnd) => {
  const date = new Date();
  date.setHours(date.getUTCHours() + 3);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const currentTime = +[hours, minutes, seconds].join('');

  return ![6, 7].includes[day] // exclude weekends
    && currentTime > (timeStart + 1500) // 06:59:59 (trading start)
    && (timeStart < timeEnd
      ? currentTime < (timeEnd + 1500)
      : currentTime <= 235959
        || (currentTime >= 0 && currentTime < (timeEnd + 1500))); // 23:59:59 (trading start)
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
