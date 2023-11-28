import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-communication-room',
  templateUrl: './communication-room.component.html',
  styleUrls: ['./communication-room.component.css'],
})
export class CommunicationRoomComponent implements OnInit {
  private socket: any; // Replace with your server URL
  message: string = '';
  messages: any[] = [];
  roomID: string = ''; // Room ID will be set from the route
  currentUser:string='';
  constructor(private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
    // this.currentUser = localStorage.getItem("username")||null
  }

  ngOnInit(): void {
        this.roomID = this.route.snapshot.paramMap.get('roomID')!;
        this.joinRoom(); // Automatically join the room
        
        const storedUsername = localStorage.getItem("username");

        if (storedUsername !== null) {
          this.currentUser = storedUsername; // Assign only if it's not null
        } else {
          // Handle the case where "username" is not in local storage
        }
        
        this.fetchChatMessages();

        this.socket.on('chat message', (msg:any) => {
          this.messages.push(msg);
        });
  }
  sendMessage() {
    if (this.message.trim() !== '') {
      console.log(this.message)
      this.socket.emit('chat message', { roomID: this.roomID, content: this.message,sender:localStorage.getItem("username") });
      // console.log(this.message,this.roomID)
      this.message = '';
    }
  }
  isAdminRole(): boolean {
    // Check the role from localStorage or wherever you store it
    const role = localStorage.getItem('role'); // Replace 'role' with the actual key
  
    // Check if the role is 'admin'
    return role === 'admin';
  }

  exitRoom() {
    // Check the role from localStorage or wherever you store it
    const role = localStorage.getItem('role'); // Replace 'role' with the actual key
    const roomID = localStorage.getItem('roomID'); // Replace 'roomID' with the actual key
  
    if (role === 'admin') {
      // If the user is an admin, send a request to delete the room
      this.http.delete(`http://localhost:3000/api/delete-room/${roomID}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            // Room deletion successful
            localStorage.removeItem("role")
            this.router.navigate(['/home'])
            console.log('Room Deleted Successfully');
            // Handle the response or navigate to a different page if needed
          }
        },
        (error) => {
          // Handle other errors (e.g., display an error message)
          console.error(error);
        }
      );
    } else {

      // If the user is not an admin, perform exit room action
      // You can implement the logic for exiting the room as a player here
      const playerName = localStorage.getItem('username'); // Replace with actual storage mechanism

  // Create a request object that includes the player's name and room ID
      const requestData = {
        playerName: playerName,
        roomID: roomID, // Replace with the actual way you identify the room
      };

      this.http.post('http://localhost:3000/api/leave-room', requestData).subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('Left Room Successfully');
            // Update your frontend UI or navigate to another page as needed
          }
        },
        (error) => {
          console.error(error);
        }
      );
      localStorage.removeItem("role")
       this.router.navigate(['/home'])
      console.log('Exit Room as a Player');
    }
  }
  formatDate(timestamp: string | null): string {
    if (!timestamp) {
      return ''; // Return an empty string or handle null values as needed
    }
    
    const datePipe = new DatePipe('en-US');
    const formattedTimestamp = datePipe.transform(timestamp, 'short');
    return formattedTimestamp || ''; // Use empty string if formatting fails
  }
  fetchChatMessages() {
    this.http.get<any[]>(`http://localhost:3000/api/messages/${this.roomID}`).subscribe((data) => {
      this.messages = data;
    });
    // this.http.get(``).subscribe((data: any[]) => {
    // });
  }

  joinRoom() {
    this.socket.emit('join room', this.roomID);
  }
  // ...rest of your code
}
