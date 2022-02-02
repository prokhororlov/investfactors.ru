const fs = require('fs');

function logToFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  logToFile,
};
