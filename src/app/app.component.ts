import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inovations-app';
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  isSidenavOpen = true;
  toggleSidenav() {
    console.log(this.sidenav);
    this.sidenav.toggle();
    this.isSidenavOpen = this.sidenav.opened;
  }
}
