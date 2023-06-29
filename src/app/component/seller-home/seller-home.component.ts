import { Component,OnInit } from '@angular/core';
import { product } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined|product[];
  productMsg:undefined|string;
  deleteIcon= faTrash;
  editIcon= faEdit;

  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.list();
  }
deleteProduct(id:number){
  console.warn("test id", id)
  this.product.deleteProduct(id).subscribe((result)=>{
    if(result) {
      this.productMsg="Product is deleted.";
      this.list();
    }
  })

  setTimeout(()=>{this.productMsg=undefined},5000);
}
list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result);
    if(result){
      this.productList=result;
    }
  })
}

}
