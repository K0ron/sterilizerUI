import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SterilizerService } from '../../services/sterilizer-service';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer implements OnInit {
  hours = 0;
  minutes = 0;

  totalTimeSec = 0;
  remainingTimeSec = 0;

  constructor(private sterilizerService: SterilizerService) {}

  ngOnInit(): void {
    this.sterilizerService.getTotalTimeSec().subscribe((total) => {
      this.totalTimeSec = total;
    });

    this.sterilizerService.getRemainingTime().subscribe((remaining) => {
      this.remainingTimeSec = remaining;
    });

    this.pushTimeToService();
  }

  increaseMinutes(): void {
    this.minutes += 5;
    if (this.minutes >= 60) {
      this.minutes = 0;
      this.hours += 1;
    }
    this.pushTimeToService();
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
    this.pushTimeToService();
  }

  increaseHours(): void {
    this.hours += 1;
    this.pushTimeToService();
  }

  decreaseHours(): void {
    if (this.hours > 0) {
      this.hours -= 1;
      this.pushTimeToService();
    }
  }

  private pushTimeToService(): void {
    const totalSec = this.hours * 3600 + this.minutes * 60;
    this.sterilizerService.setTotalTimeSec(totalSec);
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
