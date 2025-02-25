import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
private readonly wishlistService=inject(WishlistService)
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)
wislist!:IWishlist[]

ngOnInit(): void {
  this.getLoggedUserWishList();
}
getLoggedUserWishList(){
  this.wishlistService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      console.log(res.data);

this.wislist=res.data;
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

  removeItemFormWishlist(id:string){




      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.wishlistService.removeItemFormWishlist(id).subscribe({
            next:(res)=>{
              console.log(res)
              this.getLoggedUserWishList()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
        }
      });

  }
}
