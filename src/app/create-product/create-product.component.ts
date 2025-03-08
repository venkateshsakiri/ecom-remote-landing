import { Component, OnInit } from "@angular/core";
import { ProductService } from "../demo/service/productservice";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppBreadcrumbService } from "../app.breadcrumb.service";

@Component({
    selector: "app-create-product",
    templateUrl: "./create-product.component.html",
    styleUrls: ["./create-product.component.scss"],
    providers:[MessageService]
})
export class CreateProductComponent implements OnInit {
  selectedImages: string[] = [];
  public categoryList:any;
  public statuses:any;
  public productDetailsForm!:FormGroup;
  public selectedProductData:any;
  public isLoading:boolean = false;
    constructor(public productService:ProductService,public fb:FormBuilder,public activatedRoute:ActivatedRoute,public messageService:MessageService,public breadcrumbService:AppBreadcrumbService) {
      this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];

    }

    ngOnInit(): void {
      this.getCategoriesList();
      this.productDetailsForm = this.fb.group({
        name:[''],
        description:[''],
        productId:[''],
        images:[''],
        price:[''],
        ratings:[''],
        category:[''],
        status:['']
      })
      this.activatedRoute.queryParams.subscribe((res:any)=>{
        this.selectedProductData = JSON.parse(res?.data);
        this.breadcrumbService.setItems([
          {label: 'Modules'},
          {label: 'products', routerLink: ['/dashboard/products']},
          {label: 'Details', routerLink: ['/dashboard/ecommerce/create-product']}
        ]);
      })

      this.productDetailsForm.controls['name'].setValue(this.selectedProductData?.name);
      this.productDetailsForm.controls['productId'].setValue(this.selectedProductData?._id);
      this.productDetailsForm.controls['category'].setValue(this.selectedProductData?.category);
      this.productDetailsForm.controls['ratings'].setValue(this.selectedProductData?.rating+'');
      this.productDetailsForm.controls['price'].setValue(this.selectedProductData?.price);
      this.productDetailsForm.controls['status'].setValue({label:this.selectedProductData?.inventoryStatus});

    }

    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
          for (let i = 0; i < input.files.length; i++) {
              const file = input.files[i];
              const reader = new FileReader();
              reader.onload = (e) => {
                  this.selectedImages.push(e.target.result as string);
                  this.productDetailsForm.controls['images'].setValue(this.selectedImages);
              };
              reader.readAsDataURL(file);
          }
      }
  }

  removeImage(image: string) {
      this.selectedImages = this.selectedImages.filter(img => img !== image);
  }
  public getCategoriesList(){
    this.productService.getAllCategories().subscribe((res:any)=>{
        this.categoryList = res;
    },()=>{

    })
  }

  public saveProductDetails(){
    console.log(this.productDetailsForm.value)
    if(this.productDetailsForm.valid){
      this.isLoading = true;
      let obj = {
        name:this.productDetailsForm.value.name,
        description:this.productDetailsForm.value.description,
        productId:this.productDetailsForm.value.productId,
        images:this.productDetailsForm.value.images,
        price:this.productDetailsForm.value.price,
        ratings:this.productDetailsForm.value.ratings,
        category:this.productDetailsForm.value.category?.name,
        status:this.productDetailsForm.value.status?.label,
      }
      this.productService.postProductDetails(obj).subscribe((res:any)=>{
        this.isLoading =false;
        if(res?.code == 200){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
          this.productDetailsForm.reset();
          this.selectedImages = [];
        }
      },()=>{
        this.isLoading = false;
      })
    }
  }
}
