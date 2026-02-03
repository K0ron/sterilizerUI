import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  hours = 0;
  minutes = 0;
  totalTimeSec: number = 0;
  remainingTimeSec: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.updateTotalTime();
    // const interval = setInterval(() => {
    //   if (this.remainingTimeSec > 0) {
    //     this.remainingTimeSec -= 1; // -1s à chaque tick
    //     this.cd.detectChanges(); // forcer la détection des changements
    //   } else {
    //     clearInterval(interval); // on arrête quand target atteinte
    //   }
    // }, 500);
  }

  increaseMinutes(): void {
    this.minutes += 5;

    if (this.minutes >= 60) {
      this.minutes = 0;
      this.hours += 1;
    }

    this.updateTotalTime();
  }

  decreaseMinutes(): void {
    this.minutes -= 5;

    if (this.minutes < 0) {
      if (this.hours > 0) {
        this.hours--;
        this.minutes = 55;
      } else {
        this.minutes = 0;
      }
    }
    this.updateTotalTime();
  }

  updateTotalTime() {
    this.totalTimeSec = this.hours * 3600 + this.minutes * 60;

    if (!this.intervalId) {
      this.remainingTimeSec = this.totalTimeSec;
    }
  }

  get progress(): number {
    if (this.totalTimeSec === 0) return 0;

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
    return '#b7b7b7';
  }
}
