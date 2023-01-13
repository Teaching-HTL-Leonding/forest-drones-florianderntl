import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DronesComponent } from './drones/drones.component';
import { DroneComponent } from './drone/drone.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const BASE_URL = new InjectionToken<string>('baseUrl');

@NgModule({
  declarations: [
    AppComponent,
    DronesComponent,
    DroneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost:5110' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
