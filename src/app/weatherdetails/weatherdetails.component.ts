import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Current } from '../_interfaces/weather.interface';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnChanges {


  @Input() weather: Partial<Current> = {};

  airQuality: string = '';
  airQualityDesc:{ [key: number]: string } = {1:"Good",2:"Moderate",3:"Unhealthy for sensitive",4:"Unhealthy",5:"Very Unhealthy",6:"Hazardous"};
  uv:number = -1;
  ngOnChanges(changes: SimpleChanges){
    if(this.weather.air_quality && this.weather.uv){
      this.airQuality = this.airQualityDesc[this.weather.air_quality['us-epa-index']];
      this.uv = this.weather.uv;
    }
  }

}
