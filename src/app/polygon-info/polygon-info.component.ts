import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { marker } from 'leaflet';

@Component({
  selector: 'app-polygon-info',
  templateUrl: './polygon-info.component.html',
  styleUrls: ['./polygon-info.component.scss']
})



export class PolygonInfoComponent implements OnInit {
  @Input() markers: any
  @Output() isWindowOpen: EventEmitter<boolean> = new EventEmitter<boolean>
  totalTemperature: number = 0
  averageTemperature: number = 0

  ngOnInit(): void {
    this.calculateAverageTemperature()
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
