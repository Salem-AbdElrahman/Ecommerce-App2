import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { ICategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,FormsModule,CurrencyPipe,TermtextPipe,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
  private readonly CategoriesService=inject(CategoriesService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly wishlistService=inject(WishlistService);
  products:IProducts[] |null=null
  categories:ICategories[] | null=null
  text:string=''
  wishlist: Set<string> = new Set();
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
  items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
 this.products=res.data;
 console.log(this.products);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  getCategories(){
    this.CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
       console.log(res.data);
        this.categories=res.data;

      },
      error:(err)=>{
console.log(err);

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
},
error:(err)=>{
  console.log(err);

}
})
}


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
toggleWishList(id: string): void {
  if (this.wishlist.has(id)) {
    this.wishlist.delete(id);
  } else {
    this.wishlist.add(id);
  }}
}
