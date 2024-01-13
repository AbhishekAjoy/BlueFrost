// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios');

const handler = async (event) => {
  const API_KEY =  process.env["NG_APP_API_KEY"]
  const {loc} = event.queryStringParameters
  BASE_URL = 'https://api.weatherapi.com/v1/current.json?key=' + API_KEY;
  let URL = BASE_URL + '&q=' + loc + '&aqi=yes';
  try {
    const { data } = await axios.get(URL)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}

module.exports = { handler }
