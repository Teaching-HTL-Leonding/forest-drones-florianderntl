import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drone, DroneService, Position } from '../drone.service';

@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.css']
})
export class DroneComponent implements OnInit {
  public droneId?: number;
  public drone?: Drone;
  public x: number;
  public y: number;
  public trees: Position[];
  public nearestTreeIx?: number;

  constructor(private route: ActivatedRoute, public droneService: DroneService) {
    this.x = 0;
    this.y = 0;
    this.trees = [];
  }

  ngOnInit(): void {
    this.droneId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.droneService.getDrones().subscribe(data => {
      for (let drone of data) {
        if (drone.id === this.droneId) {
          this.drone = drone;
          break;
        }
      }
    });
  }

  public getStatus(): string {
    if (this.drone?.isActive) {
      return 'Active';
    }
    return 'Deactivated';
  }

  public getButtonStatus(): string {
    if (this.drone?.isActive) {
      return 'Shutdown';
    }
    return 'Activate';
  }

  public activateDrone(): void {
    this.droneService.activateDrone(this.droneId!, !this.drone?.isActive).subscribe(_ => this.ngOnInit())
  }

  public fly(): void {
    this.droneService.flyTo(this.droneId!, this.x, this.y).subscribe(_ => this.ngOnInit());
    this.x = 0;
    this.y = 0;
  }

  public scan(): void {
    this.droneService.scan(this.droneId!).subscribe(data => {
      this.trees = data.damagedTrees;
      this.nearestTreeIx = this.getNearestTreeIx();
    });
  }

  private getManhattanDistance(treeIx: number): number {
    return Math.abs(this.drone!.position!.x - this.trees[treeIx].x) + Math.abs(this.drone!.position!.y - this.trees[treeIx].y);
  }

  private getNearestTreeIx(): (number | undefined) {
    if (this.trees.length === 0) {
      return undefined;
    }

    let nearestTreeIx = 0;
    let nearestTreeManhattanDistance = this.getManhattanDistance(0);

    for (let ix = 1; ix < this.trees.length; ix++) {
      if (nearestTreeManhattanDistance > this.getManhattanDistance(ix)) {
        nearestTreeIx = ix;
      }
    }

    return nearestTreeIx;
  }

  public markTreeAsExamined(ix: number): void {
    this.droneService.markTreeAsExamined(this.trees[ix]).subscribe(_ => {
      this.trees.splice(ix, 1);
      this.nearestTreeIx = this.getNearestTreeIx();
    });
  }

  public flyAndScan(): void {
    this.droneService.flyTo(this.droneId!, this.x, this.y).subscribe(_ => {
      this.ngOnInit();
      this.scan();
    });
    this.x = 0;
    this.y = 0;
  }
}
