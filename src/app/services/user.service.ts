import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../contracts/data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserauth = new EventEmitter<boolean>;

  constructor(private http:HttpClient, private route:Router) { }

  userSignUp(user:SignUp) {
   this.http.post("http://localhost:3000/users",user,{observe:'response'})
   .subscribe((result)=>{
    console.warn(result);
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body));
      this.route.navigate(['/'])
    }   
   }) 
  }

  userLogIn(data:Login) {
  this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
  .subscribe((result)=>{
    if(result && result.body?.length) {
      this.invalidUserauth.emit(false);
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      this.route.navigate(['/'])
      
    } else {
      this.invalidUserauth.emit(true);
    }
  }) 
  }

 userAuthReload(){
  if(localStorage.getItem('user')){
    this.route.navigate(['/'])
  }
 }

}
