import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<any[]>(`${this.apiUrl}/rooms`);
  }
}
