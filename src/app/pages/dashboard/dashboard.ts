import { Component } from '@angular/core';
import { Temperature } from '../../components/temperature/temperature';
import { Timer } from '../../components/timer/timer';
import { Controls } from '../../components/controls/controls';

@Component({
  selector: 'app-dashboard',
  imports: [Temperature, Timer, Controls],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
