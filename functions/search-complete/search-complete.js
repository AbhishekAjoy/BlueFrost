const axios = require('axios');

const handler = async (event) => {
  const {input} = event.queryStringParameters
  const API_KEY =  process.env["NG_APP_API_KEY"]
  const URL = "https://api.weatherapi.com/v1/search.json?q="+input+"&key="+API_KEY;
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