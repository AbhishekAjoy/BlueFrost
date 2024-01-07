import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
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

  search$ = new BehaviorSubject<string[]>([]);
  constructor(private http: HttpClient) {}

  readonly BASE_URL =
    'https://api.weatherapi.com/v1/current.json?key=' + environment.API_KEY;

  readonly SEARCH_API_URL = "https://api.geoapify.com/v1/geocode/autocomplete?apiKey=" + environment.AUTOCOMPLETE_API;

  getWeather(city: string) {
    return this.http.get(this.BASE_URL + '&q=' + city + '&aqi=yes');
  }

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
  getWeatherByCurrentLocation() {
    this.getLocation();
    let lat: string = localStorage.getItem('latitude') ?? 'error';
    let long: string = localStorage.getItem('longitude') ?? 'error';
    if (lat === 'error' || long === 'error') {
      throw Error('User Location not available');
    }
    let URL = this.BASE_URL + '&q=' + lat + ',' + long + '&aqi=yes';
    this.http.get<Weather>(URL).subscribe({
      next: (response) => {
        this.weather$.next(response);
        this.current$ = this.weather$.pipe(map(x => x.current));
        this.location$ = this.weather$.pipe(map(x => x.location));
        this.condition$ = this.current$.pipe(map(x => x?.condition))
      },
      error: (e) => alert(e.error.message),
    });
  }

  getSearchResults(input: string){

    let URL = this.SEARCH_API_URL + '&text=' + input;
    this.http.get<Search>(URL).subscribe({
      next: response => this.search$.next(response.features.map(x => x.properties.address_line1)),
      error: e => console.error('search failed')
    });
  }

  getWeatherBySearchLocation(location: string){
    let URL = this.BASE_URL + '&q='+location+'&aqi=yes';
    this.http.get<Weather>(URL).subscribe({
      next: (response) => {
        this.weather$.next(response);
      },
      error: (e) => alert('Location not found!'),
  });
  }
}
