import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { product } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  updateMsg1:undefined | string;
  updateMsg2:undefined|string;

  constructor(private route: ActivatedRoute, private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })
  }

  submitProduct(data: any) {
    if(this.productData){
      data.id=this.productData.id;
    }
   this.product.updateProduct(data).subscribe((result)=>{
    if(result) {
      console.warn(result);
      this.updateMsg1="Product successfully updated."
      this.updateMsg2="Page will be redirect to All List after 5 sec.";
    }
   });
   setTimeout(()=>{this.updateMsg1=undefined;this.router.navigate(['/seller-home'])},5000);
  }
 

}
