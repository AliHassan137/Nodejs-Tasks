const fs = require('fs');
const path = require('path');

function listFilesWithExtension(directoryPath, fileExtension) {
  const files = fs.readdirSync(directoryPath);
  return files.filter((file) => path.extname(file) === `.${fileExtension}`);
}

module.exports = { listFilesWithExtension };