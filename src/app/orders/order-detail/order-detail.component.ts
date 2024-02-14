import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';

type Order = {
  id: number;
  total_price: number;
  customer_id: number;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  order: Order;
  error: string;


  constructor(private route: ActivatedRoute, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1), map(res => res['id'])).subscribe({
      next: (id) => {
        this.ordersService.getOrder(id).pipe(take(1)).subscribe({
          next: (order: Order) => {
            this.order = order;
          },
          error: (err) => {
            this.error = err.message;
            throw new Error(err)
          }
        })
      },
      error: (err) => {
        this.error = err;
        throw new Error(err)
      }
    })
  }
}
