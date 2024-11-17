import { API_CONFIG } from "./config";

class weatherAPI {
  _createUrl(endpoints, params) {
    if (
      typeof endpoints !== "string" ||
      !endpoints
    ) {
      throw new Error(
        "Endpoints must be a non-empty string"
      );
    }

    if (
      typeof params !== "object" ||
      Object.keys(params).length === 0
    ) {
      throw new Error(
        "Params must be an non-empty object"
      );
    }

    const searchParams =
      new URLSearchParams({
        appid: API_CONFIG.API_KEY,
        ...params,
      });

    return `${endpoints}?${searchParams.toString()}`;
  }
    
   async _fetchAPI(url) {
        if (typeof url !== 'string' || !url)
            throw new Error('url cannot be empty')
       const res = await fetch(url);
       if (!res.ok) {
           throw new Error(`Weather API error : ${res.statusText}`)

       }
       return await res.json()
   }
    
  async getCurrentWeather({ lat, lon }) {
      
        const url = this._createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",

        })
    console.log('enter weather.js  getcurrentweather lat and lon: ', lat, lon)
    const data = await this._fetchAPI(url)
    console.log('weatherjs data: ',data)
        return data;
    }

    async getForecast({lat,lon}) {
        const url = this._createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
                  lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",

        })
        const data =
          await this._fetchAPI(url);
        console.log(
          "weatherjs forecast data: ",
          data
        );
        return data;
    }
    async reverseGeocode({
    lat,
    lon,
  }) {
    const url = this._createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    const data = await this._fetchAPI(
      url
    );
    console.log(
      "weatherjs  location data: ",
      data
    );
    return data;
  }

  async searchLocations(query) {
    const url = this._createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this._fetchAPI(url);
  }
}
const WeatherAPI = new weatherAPI();
 
export default WeatherAPI