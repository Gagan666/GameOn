import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showCreateRoom = false;
  showJoinRoom = false;

  newRoom = {
    gameName: '',
    location: '',
    playersNeeded: 0,
  };
  constructor(private router:Router){
    if(localStorage.getItem("role"))
    this.router.navigate(["/communication-room/"+localStorage.getItem("roomID")])
  }
  logout() {
    // Implement logout logic (e.g., clear user session/token)
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  navigateToJoinRoom(){
    this.router.navigate(['/join-room']);
  }
  
}
