// src/app/trip-card/trip-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';   // ← add this
import { Trip }             from '../models/trip';     // ← see next step

@Component({
  selector:   'app-trip-card',
  standalone: true,
  imports:    [CommonModule],                         // ← and include it here
  templateUrl:'./trip-card.component.html',
  styleUrls:  ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
}
