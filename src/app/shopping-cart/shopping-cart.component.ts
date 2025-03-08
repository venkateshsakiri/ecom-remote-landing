import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { ProductService } from '../demo/service/productservice';
import { RootScopeData } from '../rootScope/rootScopeData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public cartList:any;
  public quantityList:any;
  public isLoadingComplete:boolean = false;
  public deleteProductDialog:boolean = false;
  public cartTotal:number = 0;
  public vatFee:number = 8;
  public totalFee:number = 0;
  public selectedCartItem:any;
  constructor(public breadcrumbService:AppBreadcrumbService,public productService:ProductService,public router:Router) {
    this.breadcrumbService.setItems([
      { label: "E-Commerce" },
      {
          label: "Shopping Cart",
          routerLink: ["/dashboard/ecommerce/cart"],
      }
  ]);
  }

  ngOnInit(): void {
    this.quantityList = [
      {number:1},
      {number:2},
      {number:3},
      {number:4},
      {number:5},
      {number:6},
    ];
    this.getAllCartProducts();
  }

  public getAllCartProducts(){
    this.isLoadingComplete = true;
    this.productService.getAllCartProduct(RootScopeData.userInfo?.user?.id).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.cartList = res?.data;
      this.totalAmount();
      console.log(res)
    },()=>{
      this.isLoadingComplete = false;
    })
  }
  public totalAmount(){
    this.cartList.forEach((element:any) => {
      this.cartTotal+= Number(element?.products?.price);
    });
    this.totalFee = this.cartTotal + this.vatFee;
  }

  public goToCheckout(){
    this.router.navigate(['/dashboard/ecommerce/check-out'],{
      queryParams:{
        data:JSON.stringify(this.cartList)
      }
    })
  }

  public deleteProduct(){
    this.isLoadingComplete = true;
    this.productService.deleteCartProduct(this.selectedCartItem?.cartId).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.getAllCartProducts();
      this.deleteProductDialog = false;
    },()=>{
      this.isLoadingComplete = false;
    })
  }

  public openDeletePopup(product:any){
    this.selectedCartItem = product;
    this.deleteProductDialog = true;
  }
}
