const axios = require('axios');

async function fetchDataFromAPI(url) {
  try {
    const response = await axios.get(url);
    console.log('Data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`HTTP error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

module.exports = { fetchDataFromAPI };