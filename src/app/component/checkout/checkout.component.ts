import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order,cart } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMsg:string|undefined;

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
       if(item.quantity){
        price=price+ Number(item.price);
       }
      });
      this.totalPrice=Math.round(price+(price/10)+40-(price/10));
      console.warn(this.totalPrice);
      

     });
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

     this.cartData?.forEach((item)=>{
      setTimeout(() => {
      item.id && this.product.deleteCartItems(item.id);

      }, 800);
     })

      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMsg="Your order has been placed successfully."
          setTimeout(() => {
            this.router.navigate(['/myorders']);
            this.orderMsg=undefined;
          }, 3000);
        }
      })
    }
   
  }

}
