import { Component } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';


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
  }

  searchLocation(){
    this.weatherapiService.getSearchResults(this.searchTerm.trim());
  }
  searchFromResult(result: string){
    this.weatherapiService.getWeatherBySearchLocation(result);
    window.location.href = '/#weather';
    this.weatherapiService.search$.next([]);
    this.searchTerm = '';
  }
}
