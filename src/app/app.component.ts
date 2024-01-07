import { Component, DoCheck, HostListener, OnInit, inject } from '@angular/core';
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
    if(!(localStorage.getItem('lat') && localStorage.getItem('long'))){
      this.weatherapiService.getWeatherByCurrentLocation();
      console.log('refetch')
    }
  }
}
