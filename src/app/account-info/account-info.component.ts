import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../app.breadcrumb.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RootScopeData } from "../rootScope/rootScopeData";
import { AuthService } from "../services/auth/auth.service";
import { MessageService } from "primeng/api";

@Component({
    selector: "app-account-info",
    templateUrl: "./account-info.component.html",
    styleUrls: ["./account-info.component.scss"],
    providers:[MessageService]
})
export class AccountInfoComponent implements OnInit {
    public countries: any[] = [];
    public accountInfoForm!: FormGroup;
    public userInfo: any;
    public isLoadingComplete: boolean = false;

    constructor(
        public breadcrumbService: AppBreadcrumbService,
        public fb: FormBuilder,
        public auth: AuthService,
        public messageService: MessageService
    ) {
        this.breadcrumbService.setItems([
            { label: "Dashboard" },
            {
                label: "Account Info",
                routerLink: ["/dashboard/account-info"],
            },
        ]);
    }

    ngOnInit(): void {
        this.userInfo = RootScopeData.userInfo;
        this.accountInfoForm = this.fb.group({
            name: ["", Validators.required],
            avatar: [""],
            bio: [""],
            email: ["", Validators.required],
            city: [""],
            state: [""],
        });
        this.accountInfoForm.controls["name"].setValue(
            this.userInfo?.user?.name
        );
        this.accountInfoForm.controls["email"].setValue(
            this.userInfo?.user?.email
        );
        this.accountInfoForm.controls["city"].setValue(
            this.userInfo?.user?.city
        );
        this.accountInfoForm.controls["state"].setValue(
            this.userInfo?.user?.state
        );
        this.accountInfoForm.controls["bio"].setValue(
            this.userInfo?.user?.bio
        );
    }

    public updateUser() {
      console.log(this.accountInfoForm.value);
      this.isLoadingComplete = true;
      this.auth.updateUserDetails(this.userInfo?.user?.id,this.accountInfoForm.value).subscribe(
          (res: any) => {
            console.log(res);
            this.isLoadingComplete = false;
            this.messageService.add({
              severity: "Success",
              summary: "Success",
              detail: res?.message,
          });
          },
          () => {
            this.isLoadingComplete = false;
          }
      );
    }
    public onSelect(event: any) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.match(/image\/*/)) {
          this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Please upload an image file",
          });
          return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.accountInfoForm.controls["avatar"].setValue(e.target.result);
          this.messageService.add({
              severity: "info",
              summary: "Success",
              detail: "File Selected",
          });
      };
      console.log(this.accountInfoForm.value)
      reader.onerror = (error) => {
          this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to read file",
          });
      };

      reader.readAsDataURL(file);
    }
}
