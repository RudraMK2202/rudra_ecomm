import { Component,OnInit } from '@angular/core';
import { product } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularItems:undefined | product[];
  trendyItems:undefined | product[];

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularItems=data; 
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyItems=data;
    });
  }

}
