import { Component } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css'],
})
export class WeatherdetailsComponent {
  constructor(public weatherapiService: WeatherapiService) {}

  airQualityDesc: { [key: number]: string } = {
    1: 'Good',
    2: 'Moderate',
    3: 'Unhealthy for sensitive',
    4: 'Unhealthy',
    5: 'Very Unhealthy',
    6: 'Hazardous',
  };
}
