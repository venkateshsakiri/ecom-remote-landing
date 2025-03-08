import { Component, OnInit } from "@angular/core";
import { QuoteserviceService } from "src/app/services/quoteservice.service";
import { MessageService, SortEvent } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-quote",
    templateUrl: "./quote.component.html",
    styleUrls: ["./quote.component.scss"],
    providers:[MessageService]
})
export class QuoteComponent implements OnInit {
    cols: any[] = [];
    public users: any;
    public visible = false;
    first: number = 0;
    public isLoadingComplete:boolean = false;

    rows: number = 10;
    accountForm!: FormGroup;
    constructor(private service: QuoteserviceService, public fb: FormBuilder,private messageService: MessageService) {
        this.accountForm = this.fb.group({
            accountName: ["", Validators.required],
            accountType: ["", Validators.required],
            address:[''],
            email: [""],
        });
    }

    ngOnInit() {
     this.getAccount();
    }
    public getAccount(){
      this.isLoadingComplete = true;
      this.service.getAccounts().subscribe((res) => {
        this.isLoadingComplete = false;
        this.users = res;
        console.log(res);
    });
    }
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) {
                result = -1;
            } else if (value1 != null && value2 == null) {
                result = 1;
            } else if (value1 == null && value2 == null) {
                result = 0;
            } else if (
                typeof value1 === "string" &&
                typeof value2 === "string"
            ) {
                result = value1.localeCompare(value2);
            }
            // else if (typeof value1 === 'number' && typeof value2 === 'number')
            // {
            //   result = value1.localeCompare(value2);

            // }
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }
    showDialog() {
        this.visible = true;
    }

    public ClearAccountForm() {
        this.accountForm.reset();
    }
    public saveAccountForm() {
      this.isLoadingComplete = true;
        let reqData = {
            accountName: this.accountForm.controls.accountName.value,
            accountType: this.accountForm.controls.accountType.value,
            address: this.accountForm.controls.address.value,
            email: this.accountForm.controls.email.value,
            age: "",
            phoneNumber: 7799068377,
        };
        this.service.saveAccounts(reqData).subscribe((res: any) => {
          this.visible = false;
          this.ClearAccountForm();
          this.isLoadingComplete = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
          this.getAccount();

        },(error:any)=>{
          this.isLoadingComplete = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
          this.visible = false;
        });
    }


    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
