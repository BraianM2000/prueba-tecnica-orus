import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { marker } from 'leaflet';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-polygon-info',
  templateUrl: './polygon-info.component.html',
  styleUrls: ['./polygon-info.component.scss']
})



export class PolygonInfoComponent implements OnInit {
  @Output() isWindowOpen: EventEmitter<boolean> = new EventEmitter<boolean>
  totalTemperature: number = 0
  averageTemperature: number = 0
  markers: any

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getSelectedMarkers().subscribe(data=>{
      this.markers = data
      this.calculateAverageTemperature()
    })
  }

  closeWindow() {
    this.isWindowOpen.emit(false)
  }

  calculateAverageTemperature() {
    this.markers.map((marker: any) => {
      this.totalTemperature = this.totalTemperature + marker.temperature
    })
    this.averageTemperature = this.totalTemperature != 0 ? this.totalTemperature / this.markers.length : 0
  }
}
