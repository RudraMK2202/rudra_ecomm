import { Component,OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { cart,priceSummary } from 'src/app/contracts/data-type';

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

  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.product.currentCart().subscribe((result)=>{
    this.cartData=result;
    let price=0;
    result.forEach((item)=>{
      price=price+item.price;
    });
    this.priceSummary.price=price;
    this.priceSummary.discount=price/10;
    this.priceSummary.tax=price/10;
    this.priceSummary.delivery=40;
    this.priceSummary.total=price+(price/10)+40-(price/10);
    console.warn(this.priceSummary);
    
   });
  }

}
