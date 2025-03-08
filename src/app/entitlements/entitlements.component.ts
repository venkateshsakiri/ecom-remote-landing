import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomerService } from '../demo/service/customerservice';
import { MessageService } from 'primeng/api';
import { AppBreadcrumbService } from '../app.breadcrumb.service';

@Component({
  selector: 'app-entitlements',
  templateUrl: './entitlements.component.html',
  styleUrls: ['./entitlements.component.scss'],
  providers:[MessageService]
})
export class EntitlementsComponent implements OnInit {
  public name:any;
  public key:any;
  public role:any;
  public rolesList:any;

  public customers1:any;
  loading:boolean = false;
  isLoadingComplete:boolean = false;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;
  constructor(public customerService:CustomerService,private messageService: MessageService,public breadcrumbService:AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Modules'},
      {label: 'entitlements', routerLink: ['/dashboard/entitlements']}
  ]);
    this.rolesList = [
      {name: 'Admin', code: 'ADMIN'},
      {name: 'Customer', code: 'CUSTOMER'}
    ];
  }

  ngOnInit(): void {
    this.getAllEntitlements();
  //   this.customerService.getCustomersLarge().then(customers => {
  //     this.customers1 = customers;
  //     this.loading = false;

  //     // @ts-ignore
  //     this.customers1.forEach(customer => customer.date = new Date(customer.date));
  // });
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  public addEntitlements(){
    this.isLoadingComplete = true;
    this.customerService.postEntitlements({name:this.name,key:this.key,role:this.role.code}).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      if(res.code == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
      }else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
      }
      this.name = '';
      this.key = '';
      this.role = '';
      this.getAllEntitlements();
    },(err)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.isLoadingComplete = false;
    })
  }

  public getAllEntitlements(){
    this.loading = true;
    this.customerService.getEntitlements().subscribe((res:any)=>{
      this.loading = false;
      if(res){
        this.customers1 = res?.data
      }
    },()=>{
      this.loading = false;
    })
  }
}
