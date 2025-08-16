// app_admin/src/app/app.module.ts

import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AppComponent }         from './app.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent }    from './trip-card/trip-card.component';

@NgModule({
  // <-- standalone components go here, not in declarations
  imports: [
    BrowserModule,         // pulls in CommonModule under the hood
    CommonModule,          // ensures pipes (currency, date, ngFor, etc.) are available
    AppComponent,          // standalone root component
    TripListingComponent,  // standalone listing
    TripCardComponent      // standalone card
  ],
  // <-- nothing declared, since everything is standalone
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
