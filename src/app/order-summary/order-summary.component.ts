import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(public breadcrumbService:AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Modules'},
      {label: 'order summary', routerLink: ['/dashboard/ecommerce/orders']}
  ]);
  }

  ngOnInit(): void {
  }

}
