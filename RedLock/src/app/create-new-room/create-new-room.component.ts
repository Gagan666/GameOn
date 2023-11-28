import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css']
})
export class CreateNewRoomComponent {
  showCreateRoom = false;
  // apiUrl = "http://localhost:3000/api/create-room"
  newRoom: { gameName: string, location: string, playersNeeded: number, players: string[] } = {
    gameName: '',
    location: '',
    playersNeeded: 0,
    players: [],
  };
  constructor(private router: Router,private http: HttpClient) {}
  createRoom() {
    console.log(this.newRoom);

    // Add the current player to the players array
    const user = localStorage.getItem('username');
    if(user)
    this.newRoom.players.push(user)
    console.log(this.newRoom)
    this.http.post('http://localhost:3000/api/create-room', this.newRoom).subscribe(
      (response: any) => {
        console.log(response)
        if (response.status === 200) {
          // Redirect to the home page when login is successful
          localStorage.setItem('role','admin');
          localStorage.setItem('roomID',response.roomID);
          this.router.navigate(['/communication-room/'+response.roomID])
          console.log("Created Room Successfully")
        } 
        
      },
      (error) => {
        // Handle other errors (e.g., display an error message)
        console.error(error);
      }
    );
  }

}
