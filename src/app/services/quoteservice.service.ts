import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class QuoteserviceService {
   url = appUrl;
  constructor(private http: HttpClient) { }
  ActionQuoteList(search:string,statusId:number,index:number,noOfRecords:number,accessmode:number,userempid:number,sortTypeId:number,sortby:number,locId:number,userID:any): Observable<any> {
    return this.http.get<any>(this.url +  'api/QList/ActionQuoteList?search=' + search + "&statusId=" + statusId + "&index=" + index + "&noOfRecords=" + noOfRecords + "&preferenceId=" + accessmode + "&userRefId=" + userempid + "&sortTypeId=" + sortTypeId + "&quoteSortId=" + sortby + "&locId=" + locId + "&userId=" + userID)
  }

  public getAccounts(){
    return this.http.get('http://localhost:8080/cloudService/accounts')
  }

  public saveAccounts(reqData:any){
    return this.http.post('http://localhost:8080/cloudService/account',reqData,{responseType: 'text'})
  }
}
