import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import { MenuService } from './app.menu.service';
import { RootScopeData } from './rootScope/rootScopeData';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
        <app-ajax-loader *ngIf="isLoadingComplete"></app-ajax-loader>
    `
})
export class AppMenuComponent implements OnInit {
    isLoadingComplete:boolean = false;
    model: any[];

    constructor(public app: AppComponent,public menuService:MenuService) {}

    ngOnInit() {
        this.getAllEntitlements();
        this.model = [
            {
                label: 'Favorites', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']}
                ]
            },
            // {
            //     label: 'Modules', icon: 'pi pi-fw pi-star-fill', routerLink: ['/'],
            //     items:[]
            //     // items:[
            //     //     {label: 'Customers', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/customer']},
            //     //     {label: 'leads', icon: 'pi pi-fw pi-dollar', routerLink: ['/dashboard/lead']},
            //     //     {label: 'Quotes', icon: 'pi pi-fw pi-sitemap', routerLink: ['/dashboard/quote']},
            //     //     {label: 'Jobs', icon: 'pi pi-fw pi-briefcase', routerLink: ['/dashboard/job']},
            //     //     {label: 'Calender', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/calender']},
            //     //     {label: 'Purchases', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/dashboard/purchase']},
            //     //     {label: 'Suppliers', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/supplier']},
            //     // ]
            // },
            // {
            //     label: 'UI Kit', icon: 'pi pi-fw pi-star-fill', routerLink: ['/uikit'],
            //     items: [
            //         {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/uikit/formlayout']},
            //         {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/uikit/input']},
            //         {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/uikit/floatlabel']},
            //         {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/dashboard/uikit/invalidstate']},
            //         {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/dashboard/uikit/button'], class: 'rotated-icon'},
            //         {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/uikit/table']},
            //         {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/uikit/list']},
            //         {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/uikit/tree']},
            //         {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/uikit/panel']},
            //         {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/dashboard/uikit/overlay']},
            //         {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/dashboard/uikit/media']},
            //         {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/dashboard/uikit/menu'], preventExact: true},
            //         {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message']},
            //         {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/uikit/file']},
            //         {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/uikit/charts']},
            //         {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/dashboard/uikit/misc']}
            //     ]
            // },
            // {
            //     label:'Prime Blocks', icon:'pi pi-fw pi-prime', routerLink: ['/blocks'],
            //     items:[
            //         {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/blocks']},
            //         {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'},
            //     ]
            // },
            // {
            //     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
            //     items: [
            //         {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons']},
            //         {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank'},
            //     ]
            // },
            // {
            //     label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
            //     items: [
            //         {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/dashboard/pages/crud']},
            //         {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/dashboard/pages/calendar']},
            //         {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/pages/timeline']},
            //         {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
            //         {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/dashboard/login']},
            //         {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/dashboard/pages/invoice']},
            //         {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/dashboard/pages/help']},
            //         {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
            //         {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
            //         {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
            //         {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
            //     ]
            // },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
            //                         {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
            //                         {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
            //                         {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Start', icon: 'pi pi-fw pi-download',
            //     items: [
            //         {
            //             label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
            //         },
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
            //         }
            //     ]
            // }
        ];
    }

    public getAllEntitlements(){
        this.isLoadingComplete = true;
        let user = RootScopeData.userInfo;
        this.menuService.getEntitlements({role:user.user.UserRole}).subscribe((res:any)=>{
            this.isLoadingComplete = false;
            res.data.forEach((element:any,index:any) => {
                if(element.role === 'ADMIN' && index ==0){
                    let obj = {
                        label: 'Modules',
                        items:[]
                    }
                    let obj1 = {
                        label: 'User Management',
                        items:[]
                    }
                    this.model.splice(1, 0, obj);
                    this.model.splice(2, 0, obj1);
                }
                if(element.role === 'CUSTOMER'&& index ==0){
                    let obj = {
                        label: 'E-Commerce',
                        items:[]
                    }
                    let obj1 = {
                        label: 'User Management',
                        items:[]
                    }
                    this.model.splice(1, 0, obj);
                    this.model.splice(2, 0, obj1);
                }
                if(element.key === 'ENTITLEMENTS' && element.role === 'ADMIN'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/entitlements']
                    })

                }
                if(element.key === 'CATEGORIES' && element.role === 'ADMIN'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-eject', routerLink: ['/dashboard/category']
                    })

                }
                if(element.key === 'PRODUCTS' && element.role === 'ADMIN'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-ticket', routerLink: ['/dashboard/products']
                    })
                }
                if(element.key === 'ORDER_SUMMARY' && element.role === 'ADMIN'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/ecommerce/orders']
                    })
                }
                if(element.key === 'COUPONS' && element.role === 'ADMIN'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboard/admin/coupons']
                    })
                }
                // if(element.key === 'CUSTOMERS'){
                //     this.model[1].items.push({
                //         label:element.name,
                //         icon: 'pi pi-fw pi-users',
                //         routerLink: ['/dashboard/customer']
                //     })
                // }
                // if(element.key === 'LEADS'){
                //     this.model[1].items.push({
                //         label: element.name, icon: 'pi pi-fw pi-dollar', routerLink: ['/dashboard/leads']
                //     })
                // }
                // if(element.key === 'QUOTES'){
                //     this.model[1].items.push({
                //         label: element.name, icon: 'pi pi-fw pi-sitemap', routerLink: ['/dashboard/quote']
                //     })
                // }

                if(element.key === 'PRODUCT_LIST'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/ecommerce/product-list']
                    })
                }
                if(element.key === 'CATEGORIES' && element.role === 'CUSTOMER'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-eject', routerLink: ['/dashboard/ecommerce/category-list']
                    })
                }
                if(element.key === 'SHOPPING_CART' && element.role === 'CUSTOMER'){
                    this.model[1].items.push({
                        label: element.name, icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/dashboard/ecommerce/cart']
                    })
                }
                if(element.key === 'CHAT' && element.role === 'CUSTOMER'){
                    this.model[2].items.push({
                        label: element.name, icon: 'pi pi-fw pi-comments', routerLink: ['/dashboard/chat']
                    })
                }
                if(element.key === 'CUSTOMERS' && element.role === 'ADMIN'){
                    this.model[2].items.push({
                        label: element.name, icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/admin/customers']
                    })
                }
                if(element.key === 'CHAT' && element.role === 'ADMIN'){
                    this.model[2].items.push({
                        label: element.name, icon: 'pi pi-fw pi-comments', routerLink: ['/dashboard/chat']
                    })
                }


            });

        },(err)=>{
            this.isLoadingComplete = false;
        })
    }
}
