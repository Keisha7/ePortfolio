import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { trips, Trip }    from '../data/trip';

@Component({
  selector:   'app-trip-listing',
  standalone: true,
  imports:    [ CommonModule, TripCardComponent ],
  templateUrl:'./trip-listing.component.html',
  styleUrls:  ['./trip-listing.component.css']
})
export class TripListingComponent {
  // initialize directly from the imported array
  public trips: Trip[] = trips;
}
