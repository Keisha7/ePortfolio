// src/app/trip-card/trip-card.component.ts
import { Component, Input } from '@angular/core';
import { Trip }             from '../data/trips';

@Component({
  selector:   'app-trip-card',
  standalone: true,
  templateUrl:'./trip-card.component.html',
  styleUrls:  ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
}
