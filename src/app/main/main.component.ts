import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../_services/weatherapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent{

  constructor(public weatherapiService: WeatherapiService) { 
  }


}
