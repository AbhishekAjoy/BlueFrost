import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private http: HttpClient) { }

  readonly BASE_URL = 'http://api.weatherapi.com/v1/current.json?key=' + environment.API_KEY;


  getWeather(city: string){
    return this.http.get(this.BASE_URL + '&q=' + city + '&aqi=yes');
  }

  getWeatherByCurrentLocation(){
    let lat:string = localStorage.getItem('latitude')??'error';
    let long:string = localStorage.getItem('longitude')??'error';
    if(lat === 'error' || long === 'error'){
      throw Error("User Location not available");
    }
    let URL = this.BASE_URL + '&q=' + lat+','+long + '&aqi=yes';
    return this.http.get(URL);
  }
}
