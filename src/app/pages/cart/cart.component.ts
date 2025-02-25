import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart, IProduct } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink,SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly cartService=inject(CartService);
private readonly toastrService=inject(ToastrService);
cartDetails:ICart={} as ICart;
ngOnInit(): void {
this.getCartData()
}

getCartData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cartDetails=res.data;//{totalcartprice, products[{}]}
    },
    error:(err)=>{
console.log(err);

    }
  })
}

removeItem(id:string):void{


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
      this.cartService.removeSpecificCartItem(id).subscribe({
        next:(res)=>{
        console.log(res);
        this.cartDetails=res.data
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        },
        error:(err)=>{
          console.log(err);

        }
      })
    }
  });

}

updatCount(id:string,newCount:number):void{
this.cartService.updateProductQuantity(id,newCount).subscribe({
  next:(res)=>{
    console.log(res);
    if (res.status==="success") {
      this.toastrService.info('Count of item update successfully!','Fresh Cart');
    }
  this.cartDetails=res.data;
  },
  error:(err)=>{
console.log(err);

  }
})
}

initCartCount(item:IProduct,isPlus:boolean):void{

  if(isPlus){
    ++item.count
  }else{
   if(item.count >=1){
    --item.count
   }
  }
}
clearUserCart():void{


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
      this.cartService.clearCart().subscribe({
        next:(res)=>{
          console.log(res);
       if (res.message) {
        this.cartDetails={} as ICart;
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
       }
        },
       error:(err)=>{
        console.log(err);

       }
      })
    }
  });

}
}
