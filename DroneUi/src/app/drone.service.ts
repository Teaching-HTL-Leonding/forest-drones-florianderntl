import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from "./app.module";

export interface Drone {
  id: number,
  isActive: boolean,
  position?: {
    x: number,
    y: number
  },
}

export interface Position {
  x: number,
  y: number,
}

export interface ScanResult {
  dronePosition: Position,
  damagedTrees: Position[]
}

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  constructor(private httpClient: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}

  public getDrones(): Observable<Drone[]> {
    return this.httpClient.get<Drone[]>(`${this.baseUrl}/drones`);
  }

  public activateDrone(droneId: number, activate: boolean): Observable<any> {
    if (activate) {
      return this.httpClient.post<any>(`${this.baseUrl}/drones/${droneId}/activate`, '');
    }
    return this.httpClient.post<any>(`${this.baseUrl}/drones/${droneId}/shutdown`, '');
  }

  public flyTo(droneId: number, x: number, y: number): Observable<Position> {
    return this.httpClient.post<Position>(`${this.baseUrl}/drones/${droneId}/flyTo`, {x, y});
  }

  public scan(droneId: number): Observable<ScanResult> {
    return this.httpClient.get<ScanResult>(`${this.baseUrl}/drones/${droneId}/scan`);
  }

  public markTreeAsExamined(position: Position): Observable<Position> {
    return this.httpClient.post<Position>(`${this.baseUrl}/trees/markAsExamined`, position);
  }
}
