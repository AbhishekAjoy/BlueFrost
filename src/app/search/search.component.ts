import { Component } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';
import { Location } from '../_interfaces/weather.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public weatherapiService: WeatherapiService){}

  searchTerm:string = '';

  updateLocationKeyDown($event:any){
    this.updateLocation();
  }
  updateLocation(){
    this.searchTerm = '';
    this.weatherapiService.getWeatherByCurrentLocation();
    document.getElementById('weather')?.scrollIntoView();
  }

  searchLocation(){
    this.weatherapiService.getSearchResults(this.searchTerm.trim());
  }
  searchFromResult(lat:number, lon: number){
    this.weatherapiService.getWeatherBySearchLocation(lat, lon);
    document.getElementById('weather')?.scrollIntoView();
    this.weatherapiService.search$.next([]);
    this.searchTerm = '';
  }
}
