import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor(public weatherapiService: WeatherapiService) { 
  }
  ngOnInit(): void {

    this.weatherapiService.getWeatherByCurrentLocation();
  }


  

}
