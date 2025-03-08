import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
// import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
// import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
// import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
// import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
// import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
// import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
// import {MediaDemoComponent} from './demo/view/mediademo.component';
// import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
// import {MiscDemoComponent} from './demo/view/miscdemo.component';
// import {EmptyDemoComponent} from './demo/view/emptydemo.component';
// import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
// import {FileDemoComponent} from './demo/view/filedemo.component';
// import {DocumentationComponent} from './demo/view/documentation.component';
// import {AppMainComponent} from './app.main.component';
// import {AppNotfoundComponent} from './pages/app.notfound.component';
// import {AppErrorComponent} from './pages/app.error.component';
// import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
// import {AppLoginComponent} from './pages/app.login.component';
// import {InputDemoComponent} from './demo/view/inputdemo.component';
// import {ButtonDemoComponent} from './demo/view/buttondemo.component';
// import {TableDemoComponent} from './demo/view/tabledemo.component';
// import {ListDemoComponent} from './demo/view/listdemo.component';
// import {TreeDemoComponent} from './demo/view/treedemo.component';
// import {IconsComponent} from './utilities/icons.component';
// import {AppCrudComponent} from './pages/app.crud.component';
// import {AppCalendarComponent} from './pages/app.calendar.component';
// import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
// import {AppInvoiceComponent} from './pages/app.invoice.component';
// import {AppHelpComponent} from './pages/app.help.component';
// import {BlocksComponent} from './blocks/blocks/blocks.component';
// import { QuoteComponent } from './quotes/quote/quote.component';
// import { CustomersComponent } from './customers/customers.component';
// import { LeadComponent } from './leads/lead/lead.component';
// import { JobviewComponent } from './jobs/jobview/jobview.component';
// import { CalenderComponent } from './calenders/calender/calender.component';
// import { PurchaseComponent } from './purchases/purchase/purchase.component';
// import { SupplierComponent } from './suppliers/supplier/supplier.component';
// import { SignupComponent } from './signup/signup.component';
// import { AuthGuardGuard } from './services/auth-guard/auth-guard.guard';
// import { EntitlementsComponent } from './entitlements/entitlements.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { ProductListComponent } from './product-list/product-list.component';
// import { AccountInfoComponent } from './account-info/account-info.component';
// import { ProductPreviewComponent } from './product-preview/product-preview.component';
// import { CreateProductComponent } from './create-product/create-product.component';
// import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
// import { CategoryListComponent } from './category-list/category-list.component';
// import { CheckOutFormComponent } from './check-out-form/check-out-form.component';
// import { UserListComponent } from './user-list/user-list.component';
// import { OrderSummaryComponent } from './order-summary/order-summary.component';
// import { CouponsComponent } from './coupons/coupons.component';
// import { ChattingComponent } from './chatting/chatting.component';
// import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'',redirectTo:'remote-entry',pathMatch:'full'},
            // {path:'ecom' ,component:LeadComponent},
            { path: 'remote-entry', loadChildren: () => import('./remote-entry/remote-entry.module').then(m => m.RemoteEntryModule) },
            
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
