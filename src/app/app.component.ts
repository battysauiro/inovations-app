import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './servicios/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    public authService:AuthService,
    private router: Router
  ){}
  
  toggleSidenav() {
    console.log(this.sidenav);
    this.sidenav.toggle();
    this.isSidenavOpen = this.sidenav.opened;
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
