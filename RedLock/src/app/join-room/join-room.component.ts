import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
})
export class JoinRoomComponent implements OnInit {
  rooms: any[] = [];
  searchQuery: string = '';
  filteredRooms: any[] = [];

  constructor(private roomService: RoomService,private router:Router,private http:HttpClient) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        this.filteredRooms = [...this.rooms]; // Initialize filteredRooms with all rooms
      },
      (error) => {
        console.error('Error fetching rooms', error);
      }
    );
  }

  joinRoom(roomId: string) {
    // Get the player's name (you may retrieve it from localStorage)
    localStorage.setItem("role","player")
    localStorage.setItem("roomID",roomId)
    const playerName = localStorage.getItem('username'); // Replace with actual storage mechanism
  
    // Create a request object that includes the player's name and room ID
    const requestData = {
      playerName: playerName,
      roomID: roomId, // Replace with the actual way you identify the room
    };
  
    this.http.post('http://localhost:3000/api/join-room', requestData).subscribe(
      (response: any) => {
        if (response.status === 200) {
          console.log('Joined Room Successfully');
          // Update your frontend UI or navigate to the room chat page
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this.router.navigate(['/communication-room', roomId]);
  }
  
  // joinRoom(roomId: string) {

  //   localStorage.setItem("role","player")
  //   this.router.navigate(['/communication-room', roomId]);
  //   // Implement the logic to join the room
  // }

  filterRooms() {
    console.log('tom')
    this.filteredRooms = this.rooms.filter((room) => {
      // Implement your filtering logic based on game or location
      return (
        room.gameName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
}
