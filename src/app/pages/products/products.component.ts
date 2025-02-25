import { CurrencyPipe } from '@angular/common';
import { Component,  inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProducts } from '../../shared/interfaces/iproducts';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-products',
  imports: [FormsModule,SearchPipe,TermtextPipe,RouterLink,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
input:string=''
private readonly productsService=inject(ProductsService)
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)
private readonly wishlistService=inject(WishlistService)
allProducts:IProducts[] |null=null
wishlist: Set<string> = new Set();
ngOnInit(): void {
  this.getAllproducts();
}

getAllproducts():void{
this.productsService.getAllProducts().subscribe({
  next:(res)=>{
    this.allProducts=res.data;
    console.log(this.allProducts);
  }
})
}
addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log(res);//show
    if(res.status ==="success"){
      this.toastrService.success(res.message,'Fresh Cart')
    }
  }
  })
  }

  toggleWishList(id: string): void {
    if (this.wishlist.has(id)) {
      this.wishlist.delete(id);
    } else {
      this.wishlist.add(id);
    }}

    addToWishlist(id:string):void{
      this.wishlistService.addToWishlist(id).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status ==="success"){
            this.toastrService.success(res.message,'Fresh Cart')
          }
        }
      })
      }
}
