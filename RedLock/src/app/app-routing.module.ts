import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { CommunicationRoomComponent } from './communication-room/communication-room.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  { path: 'join-room', component: JoinRoomComponent },
  {path:'',redirectTo:'/login',pathMatch:'full'},
  { path: 'communication-room/:roomID', component: CommunicationRoomComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
