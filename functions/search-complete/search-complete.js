const axios = require('axios');

const handler = async (event) => {
  const {input} = event.queryStringParameters
  const AUTOCOMPLETE_API = process.env["NG_APP_AUTOCOMPLETE_API"];

  const URL = "https://api.geoapify.com/v1/geocode/autocomplete?apiKey=" + AUTOCOMPLETE_API + '&text=' + input;
  console.log(URL);
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