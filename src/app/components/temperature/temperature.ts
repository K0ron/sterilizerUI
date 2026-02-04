import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timer } from '../timer/timer';
import { SterilizerService } from '../../services/sterilizer-service';

@Component({
  selector: 'app-temperature',
  imports: [CommonModule],
  templateUrl: './temperature.html',
  styleUrl: './temperature.scss',
})
export class Temperature implements OnInit {
  currentTemperature = 20;
  targetTemperature = 105;
  tempsOk = false;

  private heatingInterval?: any;

  constructor(private sterilizerService: SterilizerService) {}

  ngOnInit(): void {
    this.sterilizerService.getTemperature().subscribe((t) => (this.currentTemperature = t));

    this.sterilizerService.getTargetTemperature().subscribe((t) => (this.targetTemperature = t));
  }

  increaseTemp() {
    this.sterilizerService.setTargetTemperature(this.targetTemperature + 5);
  }

  decreaseTemp() {
    this.sterilizerService.setTargetTemperature(this.targetTemperature - 5);
  }

  get progress(): number {
    return Math.min((this.currentTemperature / this.targetTemperature) * 100, 100);
  }

  get progressColor(): string {
    return this.currentTemperature < 50 ? '#00983f' : '#d42a17';
  }
}
