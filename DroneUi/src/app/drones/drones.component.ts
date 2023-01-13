import { Component, OnInit } from '@angular/core';
import { Drone, DroneService } from '../drone.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css']
})
export class DronesComponent implements OnInit {
  public drones: Drone[];

  constructor(private droneService: DroneService) {
    this.drones = [];
  }

  public ngOnInit(): void {
    this.droneService.getDrones().subscribe(data => this.drones = data);
  }
}
