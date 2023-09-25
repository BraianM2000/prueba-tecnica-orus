import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { UpdateStateComponent } from './update-station/station-form.component';
import { AddStationComponent } from './add-station/add-station.component';
import { MatIconModule } from '@angular/material/icon';
import { PolygonInfoComponent } from './polygon-info/polygon-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateStateComponent,
    AddStationComponent,
    PolygonInfoComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
