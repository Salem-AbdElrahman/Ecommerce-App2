import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
private readonly activatedRoute=inject(ActivatedRoute);
private readonly productsService=inject(ProductsService);
private readonly categoriesService=inject(CategoriesService);
private readonly toastrService=inject(ToastrService);
private readonly cartService=inject(CartService);

detailsProduct:IProducts | null=null;
detailsCategories:ICategories | null=null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
 let proId= p.get('id') ;
  this.productsService.getSpecificProduct(proId).subscribe({
next:(res)=>{
console.log(res.data);
this.detailsProduct=res.data
},
error:(err)=>{
  console.log(err);

}
 })

      }
    })

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
  items:1,
    nav: false
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
}
