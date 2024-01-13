// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios');

function getWeatherByCurrentLocation(BASE_URL,lat,long) {
    let URL = BASE_URL + '&q=' + lat + ',' + long + '&aqi=yes';
    return URL;
  }

const handler = async (event) => {
  const API_KEY =  process.env["NG_APP_API_KEY"]
  const {lat, long} = event.queryStringParameters

  BASE_URL = 'https://api.weatherapi.com/v1/current.json?key=' + API_KEY;
  let URL = getWeatherByCurrentLocation(BASE_URL,lat,long);
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
  


  
  

  // getSearchResults(input: string){

  //   let URL = this.SEARCH_API_URL + '&text=' + input;
  //   this.http.get<Search>(URL).subscribe({
  //     next: response => this.search$.next(response.features.map(x => x.properties.address_line1)),
  //     error: e => console.error('search failed')
  //   });
  // }

  // getWeatherBySearchLocation(location: string){
  //   let URL = this.BASE_URL + '&q='+location+'&aqi=yes';
  //   this.http.get<Weather>(URL).subscribe({
  //     next: (response) => {
  //       this.weather$.next(response);
  //     },
  //     error: (e) => alert('Location not found!'),
  // });
  // }


module.exports = { handler }
