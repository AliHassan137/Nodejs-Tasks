const axios = require('axios');

async function downloadContents(urls) {
  const downloadPromises = urls.map(async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error downloading from ${url}: ${error.message}`);
      return null;
    }
  });

  return Promise.all(downloadPromises);
}

module.exports = { downloadContents };