import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootScopeData } from 'src/app/rootScope/rootScopeData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }

  isLoggedIn(){
    if(RootScopeData.userInfo){
      return true;
    }else{
      return false;
    }
  }

  public getUserLogin(form:any){
    let reqData = {
      email:form?.email,
      password:form?.password
    }
    if(environment.isSimilate){
      return this.http.get('/assets/similateApi/user-login.json')
    }else{

      return this.http.post(environment.baseUrl+'/api/auth/login',reqData)
    }
  }

  public registerUsers(reqData:any){
    return this.http.post(environment.baseUrl+'/api/auth/register',reqData)
  }

  public updateUserDetails(id:any,reqData:any){
    return this.http.put(environment.baseUrl+'/api/auth/update/'+id,reqData);
  }

  public getAllUsers(){
    return this.http.get(environment.baseUrl+'/api/admin/customers-list');

  }
}
