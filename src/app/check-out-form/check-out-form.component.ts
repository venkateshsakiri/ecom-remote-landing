import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { CustomerService } from '../demo/service/customerservice';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.scss'],
  providers:[MessageService]
})
export class CheckOutFormComponent implements OnInit {
  public couponCode:any;
  msgs: Message[] = [];
  public productsList:any;
  public loading:boolean = false;

  constructor(public router:Router,public breadcrumbService:AppBreadcrumbService,public customerService:CustomerService,public msgService:MessageService,public activatedRoute:ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: "E-Commerce" },
      {
          label: "Shopping Cart",
          routerLink: ["/dashboard/ecommerce/cart"],
      },
      {
        label: "Check Out",
        routerLink: ["/dashboard/ecommerce/check-out"],
    }
  ]);
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      console.log((JSON.parse(res?.data)))
      this.productsList = JSON.parse(res?.data);
    })
  }

  public goToCart(){
    this.router.navigate(['/dashboard/ecommerce/cart']);
  }

  public checkCoupon(){
    this.loading = true;
    this.customerService.getCouponByCode(this.couponCode).subscribe((res:any)=>{
      this.loading = false;
      if(res?.data){
        this.msgs.push({ severity: 'success', summary: res?.message, detail: 'Message sent' });
      }
      console.log(res)
    },()=>{
      this.loading = false
    })
  }

  getImageSrc(base64String: string): string {
    if (!base64String) {
        return 'path/to/default/image.jpg'; // Default image if none provided
    }

    if (!base64String.startsWith('data:image')) {
        return 'data:image/jpeg;base64,' + base64String;
    }

    return base64String;
}

}
