import { Component, inject, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { error } from 'console';
import { IOrders } from '../../shared/interfaces/iorders';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  private readonly OrdersService=inject(OrdersService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  allOrders!:IOrders[]
  ngOnInit(): void {
 this.getUserorders()
  }
  getUserorders():void{
    if(isPlatformBrowser(this.pLATFORM_ID)){
      const userID=localStorage.getItem('userID') as string
      this.OrdersService.getAllOrders(userID).subscribe({
        next:(res)=>{
          console.log(res);
          this.allOrders=res
        }

      })
    }

  }
}
