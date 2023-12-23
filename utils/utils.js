const fs = require("node:fs");
const redirectToFileWithStreams = (filePath, res) => {
  const stream = fs.createReadStream(`${__dirname}/../${filePath}`);
  stream.pipe(res);
};

module.exports = { redirectToFileWithStreams };
