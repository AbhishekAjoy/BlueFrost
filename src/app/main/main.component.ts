import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';
import { Current, Weather, Location} from '../_interfaces/weather.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private weatherapiService: WeatherapiService) {}

  currentForecast: Partial<Weather> = {};
  currentWeather: Partial<Current> = {};
  currentLocation: Partial<Location> = {};

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem('latitude', position.coords.latitude.toString());
          localStorage.setItem('longitude',position.coords.longitude.toString());
        },
        () => {
          console.log('unable to retreive your position');
        },
        { timeout: 10000 }
      );
    }
    this.weatherapiService.getWeatherByCurrentLocation().subscribe({
      next: (result) => {
        this.currentForecast = result;
        console.log(this.currentForecast);
        this.currentWeather = this.currentForecast.current??{};
        this.currentLocation = this.currentForecast.location??{};
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
