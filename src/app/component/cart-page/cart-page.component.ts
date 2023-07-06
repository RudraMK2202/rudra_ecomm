import { Component,OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { cart,priceSummary } from 'src/app/contracts/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:cart[]|undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {
   this.loadDetails();
  }

  removeFromCart(cartId:number|undefined){
   cartId && this.cartData && this.product.removeFromCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    }); 
  }

  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
       if(item.quantity){
        price=price+ Number(item.price);
       }
      });
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=40;
      this.priceSummary.total=Math.round(price+(price/10)+40-(price/10));
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
     });
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

}
