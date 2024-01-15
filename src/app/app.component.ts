import { Component, HostListener, OnInit} from '@angular/core';
import { Location }  from './_interfaces/weather.interface';
import { WeatherapiService } from './_services/weatherapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BlueFrost';
  isMobile:boolean = false;
  constructor(public weatherapiService: WeatherapiService) { 
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.screen.availWidth < 768 ){
      this.isMobile = true;
    } 
    else{
      this.isMobile = false;
    }
  }
  
  ngOnInit(): void {
    if(window.screen.availWidth < 768 ){
      this.isMobile = true;
    } 
    else{
      this.isMobile = false;
    }
    let lat = parseFloat(localStorage.getItem('latitude')??'40.71');
    let long = parseFloat(localStorage.getItem('longitude')?? '-74.01'); 
    this.weatherapiService.getWeatherBySearchLocation(lat,long);
    document.getElementById('weather')?.scrollIntoView();
  }
}
