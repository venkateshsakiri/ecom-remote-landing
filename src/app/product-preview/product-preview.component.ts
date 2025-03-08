import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { ProductService } from '../demo/service/productservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  public productDetails:any;
  public selectedProduct:any;
  public isLoadingComplete:boolean = false;
  public selectedPreviewImage:any;

  constructor(public breadcrumbService:AppBreadcrumbService,public productService:ProductService,public activatedRoute:ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: "E-Commerce" },
      {
          label: "Product List",
          routerLink: ["/dashboard/ecommerce/product-list"],
      },
      {
          label: "Product preview",
          routerLink: ["/dashboard/ecommerce/product-preview"],
      },
  ]);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.selectedProduct = JSON.parse(res?.data);
      this.getProductDetails();
    })
  }

  public getProductDetails(){
    this.isLoadingComplete = true;
    this.productService.getProductDetails(this.selectedProduct?._id).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.productDetails = res?.data;
      this.selectedImage(this.productDetails?.images[0]);
      console.log(res)
    },()=>{
      this.isLoadingComplete = false;
    })
  }

  public selectedImage(image:any){
    this.selectedPreviewImage = image;
  }

}
