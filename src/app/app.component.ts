import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-orus'
  apiData!: Array<any>;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 4,
    lng: -74
  };
  zoom = 4;
  markers: Array<any> = [];
  showInfo: boolean = true;
  showAddForm: boolean = false
  polygonVertices: google.maps.LatLngLiteral[] = [];
  layoutMode: boolean = false
  isWindowOpen: boolean = false
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap | undefined;
  @ViewChild('infoWindowContent', { static: false }) infoWindowContent!: ElementRef;
  @ViewChild('externalButton', { static: false }) externalButton!: ElementRef;

  infoContent!: any;
  infoContentCopy: any;
  polygonDraw!: google.maps.Polygon;

  myPolygon = new google.maps.Polygon({
    paths: [],
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  polygonMarkers: Array<any> = [];

  constructor(private dataService: DataService, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    this.dataService.getValidators().subscribe((data: any) => {
      this.apiData = data
      this.addMarker()
      if (this.map?.googleMap) {
        this.polygonDraw = this.myPolygon;
        this.myPolygon.setMap(this.map.googleMap);
      }
    })

  }

  openInfoWindow(marker: MapMarker, content: any) {
    this.showInfo = true
    this.infoContentCopy = JSON.parse(JSON.stringify(content));
    this.infoContent = content
    this.dataService.setContent(content)
    this.infoWindow.open(marker);
}

changeInfoView() {
  this.infoContent = JSON.parse(JSON.stringify(this.infoContentCopy));
  this.showInfo = !this.showInfo
}

refreshMarkers() {
  this.dataService.getValidators().subscribe((data: any) => {
    this.apiData = data
    this.addMarker()
  })
}

toggleAddForm() {
  this.showAddForm = !this.showAddForm
}

toggleMode() {
  this.layoutMode = !this.layoutMode
  if (this.layoutMode) {
    window.alert('Para dibujar un poligono añade vertices haciendo click en cualquier lugar del mapa')
  }
}

onMapClick(event: google.maps.MapMouseEvent): void {
  if(event.latLng && this.layoutMode) {
  const lat = event.latLng.toJSON().lat;
  const lng = event.latLng.toJSON().lng;


  this.polygonVertices.push({ lat, lng });
  this.myPolygon.setPaths(this.polygonVertices)

}
  }
deletPolygon() {
  this.polygonVertices = []

  if (this.map?.googleMap) {
    this.polygonDraw.setPaths(this.polygonVertices);
  }
}


showPolygonInfo() {
  this.polygonMarkers = [];
  if (this.polygonVertices.length > 2) {
    this.markers.forEach(marker => {
      const markerPosition = new google.maps.LatLng(
        marker.position.lat,
        marker.position.lng
      );

      const isMarkerInPolygon = google.maps.geometry.poly.containsLocation(
        markerPosition,
        this.polygonDraw
      );

      if (isMarkerInPolygon) {
        this.polygonMarkers.push(marker);
      }
    });
  }
  this.dataService.setSelectedMarkers(this.polygonMarkers)
  this.isWindowOpen = true
}

toggleWindow(event: any) {
  this.isWindowOpen = event.value
}
closeInfoWindow() {
  this.showInfo = false
}
moveMap(event: google.maps.MapMouseEvent) {
  if (!this.layoutMode) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
}
move(event: google.maps.MapMouseEvent) {
  if (event.latLng != null) this.display = event.latLng.toJSON();
}

markerOptions: google.maps.MarkerOptions = {
  draggable: false
};
markerPositions: google.maps.LatLngLiteral[] = [];

addMarker() {
  this.markers = []
  this.apiData?.map(marker => {
    var temperature = marker.temperature;
    var iconColor;
    if (temperature < 15) {
      iconColor = '../assets/svg/icon-blue.svg';
    } else if (temperature < 25) {
      iconColor = '../assets/svg/icon-green.svg';
    } else {
      iconColor = '../assets/svg/icon-red.svg';
    }
    this.markers.push({
      id: marker.id,
      position: {
        lat: marker.latitude,
        lng: marker.longitude
      },
      title: marker.ubication,
      temperature: marker.temperature,
      client: marker.client,
      icon: iconColor
    });
  })

}

}
