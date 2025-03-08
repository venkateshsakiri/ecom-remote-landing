import { Component, OnInit } from '@angular/core';
import { Customer } from '../demo/domain/customer';
import { CustomerService } from '../demo/service/customerservice';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  public isLoadingComplete:boolean = false;


  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.isLoadingComplete = true;
      this.customerService.getCustomersMedium().then(data => {
        this.isLoadingComplete = false;
          this.customers = data;
      });
  }

  calculateCustomerTotal(name) {
      let total = 0;

      if (this.customers) {
          for (let customer of this.customers) {
              if (customer.representative.name === name) {
                  total++;
              }
          }
      }

      return total;
  }


}
