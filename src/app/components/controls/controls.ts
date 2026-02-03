import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Temperature } from '../temperature/temperature';
import { Timer } from '../timer/timer';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls implements OnInit {
  @Input() temperature!: Temperature;
  @Input() timer!: Timer;

  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log('Temperature et Timer prêts', this.temperature, this.timer);
  }

  onStart() {
    // Démarre la montée de la température
    this.temperature.heatUp();
  }
}
