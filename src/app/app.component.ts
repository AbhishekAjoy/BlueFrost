import { Component } from '@angular/core';
import { Current } from './_interfaces/weather.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlueFrost';
  weatherData: Partial<Current> = {};

  getWeather(data: Partial<Current>){
    this.weatherData = data;
  }
}
