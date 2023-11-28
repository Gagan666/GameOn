import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string;
  password: string;
  loginMsg:string;
  constructor(private http: HttpClient,private router: Router){
    this.username = '';
    this.password = '';
    this.loginMsg='';
  }
  onLogin(){
    const loginData = {
        username:this.username,
        password:this.password
    }
    this.http.post('http://localhost:3000/api/login', loginData).subscribe(
      (response: any) => {
        console.log(response)
        if (response.status === 200) {
          // Redirect to the home page when login is successful
          localStorage.setItem('username', this.username);
          this.router.navigate(['/home']);
        } else {
          // Handle unsuccessful login (e.g., display an error message)
          this.loginMsg="Incorrect Credentials";
          console.error('Login failed');
        }
      },
      (error) => {
        // Handle other errors (e.g., display an error message)
        console.error(error);
      }
    );
  }
}
