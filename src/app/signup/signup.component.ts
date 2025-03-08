import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { RootScopeData } from "../rootScope/rootScopeData";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
    providers:[MessageService]
})
export class SignupComponent implements OnInit {
    public registerForm!: FormGroup;
    public loginForm!: FormGroup;
    public isLoadingComplete: boolean = false;
    constructor(private fb: FormBuilder,public authService:AuthService,public router:Router,private messageService: MessageService) {}

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        email: [""],
        name:[''],
        password: [""],
        confirmPassword: [""],
      });
      this.loginForm = this.fb.group({
        email: ["admin@gmail.com"],
        password: ["123456"],
        // email: [""],
        // password: [""],
      });
    }

    LoginUser() {
      this.isLoadingComplete = true;
      this.authService.getUserLogin(this.loginForm.value).subscribe((res:any)=>{
        this.isLoadingComplete = false;
        RootScopeData.userInfo = res;
        if(res?.status === 'SUCCESS'){
          this.router.navigate(['/dashboard']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
        }else{
          this.messageService.add({ severity: 'error', summary: 'error', detail: res?.message });
        }

      },(error:any)=>{
        this.isLoadingComplete = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      })
    }
    registerUser(){
      this.isLoadingComplete = true;
      this.authService.registerUsers(this.registerForm.value).subscribe((res:any)=>{
        this.isLoadingComplete = false;
        if(res.code == 200){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });

        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.message });
        }
        this.registerForm.reset();
      },(error:any)=>{
        this.isLoadingComplete = false;
      })
    }
}
