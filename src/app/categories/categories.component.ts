import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../demo/service/customerservice';
import { MessageService } from 'primeng/api';
import { AppBreadcrumbService } from '../app.breadcrumb.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers:[MessageService]
})
export class CategoriesComponent implements OnInit {

  public description:any;
  public name:any;
  public isLoadingComplete:boolean = false;
  public categoryList:any;
  public loading:boolean = false;
  public isEdit:boolean =false;

  constructor(public customerService:CustomerService,public service: MessageService,public breadcrumbService:AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Modules'},
      {label: 'category', routerLink: ['/dashboard/category']}
  ]);
   }

  ngOnInit(): void {
    this.getAllCategoryList();
  }



  public addCategory(){
    this.isLoadingComplete = true;
    this.customerService.postCategory({name:this.name,description:this.description}).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      if(res.code == 200){
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: res?.message });
      }
      this.name = '';
      this.description = '';
    },()=>{
      this.isLoadingComplete = false;
    })
  }
  public getAllCategoryList(){
    this.loading = true;
    this.customerService.getAllCategories().subscribe((res:any)=>{
      this.loading = false;
      if(res){
        this.categoryList = res;
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: res?.message });
      }
    },()=>{
      this.loading = false;
    })
  }

  public editCategory(event:any){
    this.isEdit = false;
    this.name = event.name;
    this.description = event.description;
  }
  public deleteCategory(event:any){

  }

}
