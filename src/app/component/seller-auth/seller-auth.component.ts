import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/contracts/data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router) {}
  showLogin= false;
  authError:string = "";

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signup(data:SignUp):void {

    this.seller.userSignUp(data)
  }
  login(data:SignUp):void {
    this.authError="";
  //console.warn(data)
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError) {
        this.authError="Email or Password is not correct."
      }
    })
  }
  openLogin() {
   this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
  
}
