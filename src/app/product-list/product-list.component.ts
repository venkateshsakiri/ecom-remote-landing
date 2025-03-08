import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../app.breadcrumb.service";
import { ProductService } from "../demo/service/productservice";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { RootScopeData } from "../rootScope/rootScopeData";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.scss"],
    providers:[MessageService]
})
export class ProductListComponent implements OnInit {
    public products: any;
    public isLoadingComplete:boolean = false;
    activeTabIndex: number = 0;

    // products!: any[];

    sortOptions: any[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    constructor(
        public breadcrumbService: AppBreadcrumbService,
        public ProductsService: ProductService,
        public messageService:MessageService,
        public _router:Router
    ) {
      this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ] ;
        this.breadcrumbService.setItems([
            { label: "E-Commerce" },
            {
                label: "Product List",
                routerLink: ["/dashboard/ecommerce/product-list"],
            },
        ]);
    }

    ngOnInit(): void {
      this.getAllProducts();
    }

    public getAllProducts(){
      this.isLoadingComplete = true;
      this.ProductsService.getAllProducts().subscribe((res:any)=>{
        this.isLoadingComplete = false;
        if(res?.code == 200){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
          this.products = res.data;
        }
      },()=>{
        this.isLoadingComplete = false;
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

  public goToPreview(data:any){
    this._router.navigate(['/dashboard/ecommerce/product-preview'],{
      queryParams:{
        data:JSON.stringify(data)
      }
    })
  }

  public addToCart(data:any){
    console.log(data)
    let obj={
      productId:data?._id,
      productDetailsId:'',
      userId:RootScopeData.userInfo?.user?.id
    }
    this.isLoadingComplete = true;
    this.ProductsService.addToCartProduct(obj).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      if(res?.code == 200){
      }
      this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
    },()=>{
      this.isLoadingComplete = false;
    })
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
}
