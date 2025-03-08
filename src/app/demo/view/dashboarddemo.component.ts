import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import { AppMainComponent } from '../../app.main.component';
import {AppConfig} from '../domain/appconfig';
import {ConfigService} from '../service/app.config.service';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class DashboardDemoComponent implements OnInit {

    ordersChart: any;

    ordersOptions: any;

    activeOrders = 0;

    trafficChart: any;

    trafficOptions: any;

    activeTraffic = 0;

    goalChart: any;

    goalOptions: any;

    items: MenuItem[];

    val1 = 1;

    val2 = 2;

    orderWeek: any;

    selectedOrderWeek: any;

    products: Product[];

    productsThisWeek: Product[];

    productsLastWeek: Product[];

    config: AppConfig;

    subscription: Subscription;

    constructor(private productService: ProductService, private breadcrumbService: AppBreadcrumbService, private appMain: AppMainComponent, public configService: ConfigService) {
        this.breadcrumbService.setItems([
            { label: 'Favorites' },
            { label: 'Dashboard' }
        ]);

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.productService.getProducts().then(data => this.productsThisWeek = data);
        this.productService.getProductsMixed().then(data => this.productsLastWeek = data);

        this.ordersChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                label: 'Revenue',
                data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
                borderColor: [
                    '#f1b263',
                ],
                backgroundColor: [
                    'rgba(241, 178, 99, 0.1)'
                ],
                borderWidth: 2,
                fill: true,
                borderDash: [3, 6],
                tension: .4
            }, {
                label: 'Cost',
                data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
                borderColor: [
                    '#2f8ee5',
                ],
                backgroundColor: [
                    'rgba(47, 142, 229, 0.05)',
                ],
                borderWidth: 2,
                fill: true,
                pointRadius: 3,
                tension: .4
            }],
            responsive: true
        };

        this.trafficChart = this.getTrafficChartData();

        this.trafficOptions = {
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: true,
            cutout: 70
        };

        this.appMain['refreshTrafficChart'] = () => {
            this.trafficChart = this.getTrafficChartData();
        };

        this.goalChart = {
            labels: [
                'Complete',
                'Not Complete',
                'Extra Tasks',
            ],
            datasets: [{
                data:  [183, 62, 10],
                backgroundColor: [
                    '#ffffff',
                    'rgba(255,255,255,.2)',
                    'rgba(255,255,255,.5)',
                ],
                borderWidth: 0,
            }]
        };

        this.goalOptions = {
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: true,
        };

        this.items = [
            {label: 'View Profile', icon: 'pi pi-user'},
            {label: 'Update Profile', icon: 'pi pi-refresh'},
            {label: 'Delete Profile', icon: 'pi pi-trash'},
        ];

        this.orderWeek = [
            {name: 'This Week', code: '0'},
            {name: 'Last Week', code: '1'}
        ];
    }

    getTrafficChartData() {
        return {
            labels: [
                'Add View',
                'Total View',
            ],
            datasets: [{
                data:  [48, 52],
                backgroundColor: [
                    getComputedStyle(document.body).getPropertyValue('--primary-dark-color') || '#2c84d8',
                    getComputedStyle(document.body).getPropertyValue('--content-alt-bg-color') || '#B1B9C9',
                ],
                borderWidth: 0,
            }]
        };
    }

    changeDataset(event) {
        const dataSet = [
            [31, 83, 69, 29, 62, 25, 59, 26, 46],
            [40, 29, 7, 73, 81, 69, 46, 21, 96],
        ];
        const dataSet2 = [
            [67, 98, 27, 88, 38, 3, 22, 60, 56],
            [74, 67, 11, 36, 100, 49, 34, 56, 45],
        ];

        this.activeOrders = parseInt(event.currentTarget.getAttribute('data-index'));

        this.ordersChart.datasets[0].data = dataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
        this.ordersChart.datasets[1].data = dataSet2[parseInt(event.currentTarget.getAttribute('data-index'))];
        this.ordersChart.datasets[0].label = event.currentTarget.getAttribute('data-label');
        this.ordersChart.datasets[0].borderColor = event.currentTarget.getAttribute('data-stroke');
    }

    changeTrafficset(event){
        const traffidDataSet = [
            [48, 52],
            [26, 74],
            [12, 88],
        ];
        this.activeTraffic = parseInt(event.currentTarget.getAttribute('data-index'));

        this.trafficChart.datasets[0].data = traffidDataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
    }

    recentSales(event) {
        if (event.value.code === '0') {
            this.products = this.productsThisWeek;
        } else {
            this.products = this.productsLastWeek;
        }
    }

    updateChartOptions() {
        if(this.config.dark){
            this.applyDarkTheme();
        } else {
            this.applyLightTheme();
        }
    }

    applyDarkTheme() {

        this.ordersOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    applyLightTheme() {

        this.ordersOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#A0A7B5'
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                x: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    ngOnDestroy() {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
