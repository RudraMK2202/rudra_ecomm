import { Component,OnInit } from '@angular/core';
import { product } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMsg:string|undefined;

  constructor(private product:ProductService) {}

  ngOnInit(): void {
    
  }
  submitProduct(data:product) {
   console.warn(data);
   this.product.addProduct(data).subscribe((result)=>{
    console.warn(result);
    
    if(result){
      this.addProductMsg="Product is successfully added."
    }
    setTimeout(()=>this.addProductMsg=undefined,7000);
   })
  }

}
