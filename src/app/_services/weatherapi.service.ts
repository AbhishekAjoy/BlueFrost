import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Weather,Current, Condition ,Location} from '../_interfaces/weather.interface';
import { Search } from '../_interfaces/search.interface';

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
        },
        () => {
          console.log('unable to retreive your position! Please Refresh Page');
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
  }
  getWeatherByCurrentLocation() {
    this.getLocation();
    let lat: string = localStorage.getItem('latitude') ?? 'error';
    let long: string = localStorage.getItem('longitude') ?? 'error';
    if (lat === 'error' || long === 'error') {
       throw Error('User Location not available');
    }
    this.setWeather(lat, long);
  }

  getSearchResults(input: string){
    fetch(`/.netlify/functions/search-complete?input=${input}`).then(function(response) {
      return response.json();
    }).then((data: Location[]) => {
       this.search$.next(data)
    });
  }

  getWeatherBySearchLocation(location: Location){
    this.setWeather(location.lat.toString(),location.lon.toString());
  }
}
