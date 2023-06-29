
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/contracts/data-type';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined | product[];

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit(): void {
    let query =this.route.snapshot.paramMap.get('query');
    //query should not be null-> that's why 'query && ...'
    query && this.product.searchProducts(query).subscribe((result)=>{
     this.searchResult=result;
    })
  }

}
