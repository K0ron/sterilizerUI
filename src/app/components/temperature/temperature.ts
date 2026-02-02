import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temperature',
  imports: [CommonModule],
  templateUrl: './temperature.html',
  styleUrl: './temperature.scss',
})
export class Temperature implements OnInit {

  currentTemperature: number = 20;
  targetTemperature: number = 105;

  constructor(private cd : ChangeDetectorRef) {}

 ngOnInit(): void {
      const interval = setInterval(() => {
      if (this.currentTemperature < this.targetTemperature) {
        this.currentTemperature += 1; // +1°C à chaque tick
        this.cd.detectChanges(); // forcer la détection des changements
      } else {
        clearInterval(interval); // on arrête quand target atteinte
      }
    }, 200);
 }
  

  get progress(): number {
    return Math.min((this.currentTemperature / this.targetTemperature) * 100, 100);

  }

  get progressColor(): string {
    return this.currentTemperature < 50 ? '#00983f' : '#d42a17'; 
  }

}
