import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timer } from '../timer/timer';

@Component({
  selector: 'app-temperature',
  imports: [CommonModule],
  templateUrl: './temperature.html',
  styleUrl: './temperature.scss',
})
export class Temperature implements OnInit {
  @Input() timer!: Timer;

  currentTemperature: number = 20;
  targetTemperature: number = 105;
  tempsOk: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  increaseTemp(): void {
    if (this.targetTemperature < 150) {
      this.targetTemperature += 5;
      console.log(this.targetTemperature);
    }
  }

  decreaseTemp(): void {
    if (this.targetTemperature > 20) {
      this.targetTemperature -= 5;
    }
    console.log(this.targetTemperature);
  }

  ngOnInit(): void {}

  get progress(): number {
    return Math.min((this.currentTemperature / this.targetTemperature) * 100, 100);
  }

  get progressColor(): string {
    return this.currentTemperature < 50 ? '#00983f' : '#d42a17';
  }

  heatUp() {
    const interval = setInterval(() => {
      if (this.currentTemperature < this.targetTemperature) {
        this.currentTemperature += 1;
        this.cd.detectChanges(); // met à jour l'affichage
      } else {
        // température atteinte
        this.tempsOk = true;
        clearInterval(interval);

        // lance le timer UNE SEULE FOIS
        if (this.timer) {
          console.log('temp OK');

          this.timer.start();
        }
      }
    }, 500);
  }
}
