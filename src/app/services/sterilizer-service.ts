import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SterilizerState } from '../models/sterelizer-states.model';

@Injectable({
  providedIn: 'root',
})
export class SterilizerService {
  private state$ = new BehaviorSubject<SterilizerState>(SterilizerState.IDLE);

  private currentTemp$ = new BehaviorSubject<number>(20);
  private targetTemp$ = new BehaviorSubject<number>(105);

  private totalTimeSec$ = new BehaviorSubject<number>(60); // valeur par défaut (démo)
  private remainingTimeSec$ = new BehaviorSubject<number>(60);

  private heatingInterval: any;
  private timerInterval: any;

  /* ========= GETTERS ========= */

  getState() {
    return this.state$.asObservable();
  }

  getTemperature() {
    return this.currentTemp$.asObservable();
  }

  getTargetTemperature() {
    return this.targetTemp$.asObservable();
  }

  getTotalTimeSec() {
    return this.totalTimeSec$.asObservable();
  }

  getRemainingTime() {
    return this.remainingTimeSec$.asObservable();
  }

  /* ========= SETTERS (CONFIG) ========= */

  setTargetTemperature(temp: number) {
    if (this.state$.value !== SterilizerState.IDLE) return;
    this.targetTemp$.next(temp);
  }

  setTotalTimeSec(totalSec: number) {
    if (this.state$.value !== SterilizerState.IDLE) return;
    this.totalTimeSec$.next(totalSec);
    this.remainingTimeSec$.next(totalSec);
  }

  /* ========= ACTIONS ========= */

  start() {
    if (this.state$.value !== SterilizerState.IDLE) return;

    // s'assure que remaining = total au démarrage
    this.remainingTimeSec$.next(this.totalTimeSec$.value);

    this.state$.next(SterilizerState.HEATING);
    this.startHeating();
    this.startTimer();
  }

  stopEmergency() {
    this.state$.next(SterilizerState.ERROR);
    this.clearIntervals();
  }

  reset() {
    this.clearIntervals();
    this.state$.next(SterilizerState.IDLE);
    this.currentTemp$.next(20);
    this.remainingTimeSec$.next(this.totalTimeSec$.value);
  }

  /* ========= INTERNAL LOGIC ========= */

  private startHeating() {
    this.clearHeatingInterval();

    this.heatingInterval = setInterval(() => {
      if (this.state$.value === SterilizerState.ERROR) return;

      const temp = this.currentTemp$.value;
      const target = this.targetTemp$.value;

      if (temp < target) {
        this.currentTemp$.next(temp + 1);
      } else {
        this.state$.next(SterilizerState.HOLD);
        this.clearHeatingInterval();
      }
    }, 500); // 500ms pour la démo (plus fluide)
  }

  private startTimer() {
    this.clearTimerInterval();

    this.timerInterval = setInterval(() => {
      if (this.state$.value !== SterilizerState.HOLD) return;

      const remaining = this.remainingTimeSec$.value - 1;

      if (remaining <= 0) {
        this.remainingTimeSec$.next(0);
        this.state$.next(SterilizerState.FINISHED);
        this.clearTimerInterval();
      } else {
        this.remainingTimeSec$.next(remaining);
      }
    }, 1000);
  }

  private clearIntervals() {
    this.clearHeatingInterval();
    this.clearTimerInterval();
  }

  private clearHeatingInterval() {
    if (this.heatingInterval) {
      clearInterval(this.heatingInterval);
      this.heatingInterval = undefined;
    }
  }

  private clearTimerInterval() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }
}
