import { Component, OnInit } from '@angular/core';
import { Login, SignUp, product, cart } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  userLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();

  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }

  logIn(data: Login) {
    this.user.userLogIn(data);
    this.user.invalidUserauth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user details"
      } else {
        this.localCartToRemoteCart();
      }
    })
  }
  toLogIn() {
    this.userLogin = true;
  }
  toSignUp() {
    this.userLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.AddToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("item stored in db");
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);

      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }

}
