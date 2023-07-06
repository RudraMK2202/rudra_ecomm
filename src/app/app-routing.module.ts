import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SellerAuthComponent } from './component/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { SellerGuard } from 'src/seller.guard';
import { SellerAddProductComponent } from './component/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './component/seller-update-product/seller-update-product.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { UserAuthComponent } from './component/user-auth/user-auth.component';
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { MyordersComponent } from './component/myorders/myorders.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"seller-auth",component:SellerAuthComponent},
  {path:"seller-home",component:SellerHomeComponent,canActivate:[SellerGuard]},
  {path:"seller-add-product",component:SellerAddProductComponent,canActivate:[SellerGuard]},
  {path:"seller-update-product/:id",component:SellerUpdateProductComponent,canActivate:[SellerGuard]},
  {path:"search/:query", component:SearchComponent},
  {path:"details/:productId", component:ProductDetailsComponent},
  {path:"user-auth", component:UserAuthComponent},
  {path:"cart-page", component:CartPageComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"myorders", component:MyordersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
