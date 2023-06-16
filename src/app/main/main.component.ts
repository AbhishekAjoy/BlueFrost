import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';
import {
  Current,
  Weather,
  Location,
  Condition,
} from '../_interfaces/weather.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private weatherapiService: WeatherapiService) {}

  @Output() weatherData = new EventEmitter<Partial<Current>>();

  currentForecast: Partial<Weather> = {};
  currentWeather: Partial<Current> = {};
  currentLocation: Partial<Location> = {};
  currentCondition: Partial<Condition> = {};

  ngOnInit(): void {
    this.weatherapiService.getWeatherByCurrentLocation().subscribe({
      next: (result) => {
        this.currentForecast = result;
        console.log(this.currentForecast);
        this.currentWeather = this.currentForecast.current ?? {};
        this.currentLocation = this.currentForecast.location ?? {};
        this.currentCondition = this.currentWeather.condition ?? {};
        this.weatherData.emit(this.currentWeather);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
