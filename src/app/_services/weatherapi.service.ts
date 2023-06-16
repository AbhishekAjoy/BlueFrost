import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../_interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  weatherForecast = new BehaviorSubject<Partial<Weather>>({});

  constructor(private http: HttpClient) { }

  readonly BASE_URL = 'http://api.weatherapi.com/v1/current.json?key=' + environment.API_KEY;


  getWeather(city: string){
    return this.http.get(this.BASE_URL + '&q=' + city + '&aqi=yes');
  }

  getLocation(){
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem('latitude', position.coords.latitude.toString());
          localStorage.setItem('longitude',position.coords.longitude.toString());
        },
        () => {
          console.log('unable to retreive your position! Please Refresh Page');
        },
        { timeout: 10000 }
      );
    }
  }
  getWeatherByCurrentLocation(){
    this.getLocation();
    let lat:string = localStorage.getItem('latitude')??'error';
    let long:string = localStorage.getItem('longitude')??'error';
    if(lat === 'error' || long === 'error'){
      throw Error("User Location not available");
    }
    let URL = this.BASE_URL + '&q=' + lat+','+long + '&aqi=yes';
    return this.http.get(URL);
  }
}
