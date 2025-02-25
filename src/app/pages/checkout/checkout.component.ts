import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  {


  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ordersService=inject(OrdersService);
  private readonly router=inject(Router);
  cartId:string =''
  selectedMethod:string='';
  checkOutForm:FormGroup=new FormGroup({
    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null,[Validators.required]),
   })
 ngOnInit(): void {
  this.getCartId()

 }

getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(param)=>{
    this.cartId =  param.get('id') !;
    }
  })
}




   submitForm(selectedMethod:string):void{
    // console.log(this.checkOutForm.value);
    if(selectedMethod === 'online'){
  this.onLinePayment()
   }
   else{
this.cashPayment()
   }
  }
   onLinePayment():void{
    this.ordersService.checkOutPayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
    console.log(res);
if(res.status==='success'){
  open(res.session.url,'_self')
}
      },
      error:(err)=>{
        console.log(err);

      }
    })

   }
  cashPayment():void{
    this.ordersService.cachePayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
    console.log(res);
if(res.status==='success'){
this.router.navigate(['/allorders'])
}
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
