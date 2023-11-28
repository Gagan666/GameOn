import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username:string;
  password: string;
  confpassword:string;
  mobile:string;
  registrationMessage: string;
  constructor(private http: HttpClient){
    this.username = '';
    this.password = '';
    this.confpassword = '';
    this.mobile= '';
    this.registrationMessage='';
  }
  onRegistration(){
    const registrationData = {
      username: this.username,
      password: this.password,
      confpassword: this.confpassword,
      mobile: this.mobile
    };
    if(this.confpassword!=this.password){
      this.registrationMessage="Password and Confirm Password Incorrect";
      return;
    }
    this.http.post('http://localhost:3000/api/register', registrationData).subscribe(
      (response: any) => {
        console.log(response)
        if (response.status === 200) {
          this.registrationMessage = 'Registration successful'; // Display the success message
        } else if (response.status === 409) {
          this.registrationMessage = 'Mobile number is already registered'; // Display mobile already registered message
        } else {
          this.registrationMessage = 'Registration failed'; // Display a generic registration failure message
        }
      },
      (error) => {
        console.log(error)
        this.registrationMessage = 'Registration failed'; // Handle other errors
      }
    );
    console.log(this.username+this.password);
  }
}
