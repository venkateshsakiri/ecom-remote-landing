import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers:[MessageService]
})
export class UserListComponent implements OnInit {
  customers1: any;

  loading:boolean = false;

  openDialog:boolean = false;

  openDialogReject:boolean = false;

  selectedUser:any;

  @ViewChild('dt') table: Table;

  @ViewChild('filter') filter: ElementRef;

  constructor(public authService:AuthService,public router:Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUserList();
  }

  public getAllUserList(){
    this.loading = true;
    this.authService.getAllUsers().subscribe((res:any)=>{
      this.loading = false;
      this.customers1 = res.data;
      console.log(res);
    },()=>{
      this.loading = false;
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

  public actionOnCustomer(cust:any,action:any){
    this.selectedUser = cust;
    if(action === 'approve'){
      this.openDialog = true;
    }else{
      this.openDialogReject = true;
    }
  }

  public approveCustomer(){
    this.selectedUser['status']='Y';
    this.authService.updateUserDetails(this.selectedUser?._id,this.selectedUser).subscribe((res:any)=>{
      this.openDialog = false;
      this.getAllUserList();
    },()=>{

    })
  }

  public rejectCustomer(){
    // this.selectedUser['status']='RA';
    // this.authService.updateUserDetails(this.selectedUser?._id,this.selectedUser).subscribe((res:any)=>{
    //   this.openDialog = false;
    //   this.getAllUserList();
    // },()=>{

    // })
  }

}
