import { Component,OnInit } from '@angular/core';
import { product ,order} from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  orderData:order[]|undefined;

  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.getOrderList(); 
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList(); 
    })
  }
 
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
     })
  }
}
