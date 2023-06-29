import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../contracts/data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string="default";
  sellerName:string="";
  searchResult:undefined | product[];
  userName:string= "";
  cartCount=0;

  constructor(private route:Router, private products:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName= sellerData.name;
            this.menuType="seller";
      
        } else if(localStorage.getItem('user') ){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType= 'user';
          this.products.getCartList(userData.id);
        }
        else{
         
          this.menuType="default";
        }
      }
    });

  let cartData = localStorage.getItem('localCart');
  if(cartData) {
    this.cartCount = JSON.parse(cartData).length;
  }

  this.products.cartData.subscribe((items)=>{
    this.cartCount= items.length;
  });

  }
logout() {
  //empty local storage and redirect to home page.
  localStorage.removeItem('seller');
  this.route.navigate(['/']);
}

userLogout(){
  localStorage.removeItem('user');
  this.route.navigate(['/user-auth']);
  this.products.cartData.emit([]);
}

searchProducts(query:KeyboardEvent) {
  if(query){
    const element=query.target as HTMLInputElement;
    this.products.searchProducts(element.value).subscribe((result)=>{

      if(result.length>5){
        result.length=5;
      }
      this.searchResult= result;
    })
  }
}
hideSearch(){
  this.searchResult=undefined;
}
redirectToDetails(id:number) {
  this.route.navigate(['/details/'+id]); 
}
productSearch(val:string) {
  console.warn(val);
  this.route.navigate([`/search/${val}`]);
}


}
