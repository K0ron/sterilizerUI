import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer implements OnInit {
  totalTimeSec: number = 1000;
  remainingTimeSec: number = 500;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // const interval = setInterval(() => {
    //   if (this.remainingTimeSec > 0) {
    //     this.remainingTimeSec -= 1; // -1s à chaque tick
    //     this.cd.detectChanges(); // forcer la détection des changements
    //   } else {
    //     clearInterval(interval); // on arrête quand target atteinte
    //   }
    // }, 500);
  }

  get progress(): number {
    return Math.min(((this.totalTimeSec - this.remainingTimeSec) / this.totalTimeSec) * 100, 100);
  }

  get formatedTime(): string {
    const h = Math.floor(this.remainingTimeSec / 3600);
    const m = Math.floor((this.remainingTimeSec % 3600) / 60);
    const s = this.remainingTimeSec % 60;

    return `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  get progressColor(): string {
    const ratio = this.remainingTimeSec / this.totalTimeSec;

    return '#b7b7b7';
  }
}
