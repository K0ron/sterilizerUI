import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Temperature } from '../temperature/temperature';
import { Timer } from '../timer/timer';
import { SterilizerService } from '../../services/sterilizer-service';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls implements OnInit {
  constructor(private sterilizerService: SterilizerService) {}
  ngOnInit(): void {}

  onStart() {
    this.sterilizerService.start();
  }

  emergency() {
    this.sterilizerService.stopEmergency();
  }

  reset() {
    this.sterilizerService.reset();
  }
}
