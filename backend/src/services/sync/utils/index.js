const isValidTime = () => {
  const date = new Date();
  date.setHours(date.getUTCHours() + 3);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const currentTime = +[hours, minutes, seconds].join('');

  return ![6, 7].includes[day] // exclude weekends
    && currentTime > 75959 + 1500 // 07:29:59 (trading start) + 00:15:00 (moex delay)
    && currentTime < 235959 + 1500; // 23:59:59 (trading start) + 00:15:00 (moex delay)
};

module.exports = {
  isValidTime,
};
