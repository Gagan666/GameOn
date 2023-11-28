import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-nav-bar',
  templateUrl: './home-nav-bar.component.html',
  styleUrls: ['./home-nav-bar.component.css']
})
export class HomeNavBarComponent {
  constructor(private router:Router){

  }
  logout() {
    // Implement logout logic (e.g., clear user session/token)
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
