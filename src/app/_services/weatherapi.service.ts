import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Weather,Current, Condition ,Location} from '../_interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherapiService {
  weather$ = new BehaviorSubject<Partial<Weather>>({});
  current$ = new Observable<Current | undefined>;
  location$ = new Observable<Location | undefined>;
  condition$ = new Observable<Condition | undefined>;

  search$ = new BehaviorSubject<Location[]>([]);
  constructor(private http: HttpClient) {}


  getLocation() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem('latitude', position.coords.latitude.toString());
          localStorage.setItem(
            'longitude',
            position.coords.longitude.toString()
          );
          this.setWeather(localStorage.getItem('latitude')??'40.71',localStorage.getItem('longitude')??'-74.01');
        },
        () => {
          console.error('unable to retreive your position! Please Refresh Page');
        },
        { timeout: 3000 }
      );
    }
  }

  setWeather(lat: string, long: string){
    fetch(`/.netlify/functions/fetch-weather?lat=${lat}&long=${long}`).then(function(response) {
      return response.json();
    }).then((data: Weather) => {
       // this will be a string
       this.weather$.next(data);
       this.current$ = this.weather$.pipe(map(x => x.current));
       this.location$ = this.weather$.pipe(map(x => x.location));
       this.condition$ = this.current$.pipe(map(x => x?.condition))
    });
    console.log(this.weather$);
  }
  getWeatherByCurrentLocation() {

     this.getLocation();
  }

  getSearchResults(input: string){
    fetch(`/.netlify/functions/search-complete?input=${input}`).then(function(response) {
      return response.json();
    }).then((data: Location[]) => {
      if(data.length !== 0){
        this.search$.next(data)
      } 
      else{
        alert('Entered location not found!');
      }
    });
  }

  getWeatherBySearchLocation(lat: number, lon: number){
    this.setWeather(lat.toString(),lon.toString());
    localStorage.setItem('latitude', lat.toString());
          localStorage.setItem(
            'longitude',
           lon.toString()
          );
  }
}
