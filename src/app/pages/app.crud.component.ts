import {Component, OnInit} from '@angular/core';
import {Product} from '../demo/domain/product';
import {ProductService} from '../demo/service/productservice';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppBreadcrumbService} from '../app.breadcrumb.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.crud.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../assets/demo/badges.scss']
})
export class AppCrudComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    isLoading: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: any;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    categoryList:any;

    selectedCategory:any;

    rowsPerPageOptions = [5, 10, 20];

    base64Image:any;

    public isProductsLoading:boolean = false;

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private breadcrumbService: AppBreadcrumbService,public sanitizer:DomSanitizer,public router:Router) {
        this.breadcrumbService.setItems([
            {label: 'Modules'},
            {label: 'products', routerLink: ['/dashboard/products']}
        ]);
    }

    ngOnInit() {
        this.getCategoriesList();
        this.getAllProducts();
        // this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.selectedProducts = product
        this.product = product;
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.productService.deleteProductById(this.selectedProducts?._id).subscribe((res:any)=>{
            this.deleteProductDialog = false;
            if(res.code == 200){
                this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
            }
            this.getAllProducts();
        })
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.isLoading = true;
        const req = {
            code:this.createId(),
            name:this.product.name,
            description:this.product.description,
            category:this.product.category,
            inventoryStatus:this.product.inventoryStatus,
            rating:this.product.rating,
            image:this.base64Image,
            price:this.product.price+'',
            quantity:this.product.quantity+''
        }
        this.productService.addProducts(req).subscribe((res:any)=>{
            if(res.code == 200){
                this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
                this.product = {};
                this.base64Image = '';
                this.isLoading = false;
                this.getAllProducts();
            }
            this.productDialog = false;
        },()=>{
            this.isLoading = false;
        })
        // if (this.product.name.trim()) {
        //     if (this.product.id) {
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //     } else {
        //         this.product.id = this.createId();
        //         this.product.code = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        //         this.products.push(this.product);
        //         this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        //     }

        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    public getCategoriesList(){
        this.productService.getAllCategories().subscribe((res:any)=>{
            this.categoryList = res;
        },()=>{

        })
    }
    public onSelect(event: any) {
        const file = event.files[0];

        // Validate file type
        if (!file.type.match(/image\/*/) ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please upload an image file'
            });
            return;
        }

        const reader = new FileReader();
        this.product.imgName = file.name;

        reader.onload = (e: any) => {
            this.product.image = e.target.result;
            this.base64Image = e.target.result;
            this.messageService.add({
                severity: 'info',
                summary: 'Success',
                detail: 'File Selected'
            });
        };

        reader.onerror = (error) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to read file'
            });
        };

        reader.readAsDataURL(file);
    }
    onRowClick(event: MouseEvent, product: any) {
        // Check if the click was on the delete button
        if ((event.target as HTMLElement).closest('.p-button-rounded.p-button-warning')) {
            return; // Do nothing if the delete button was clicked
        }
        this.goToDetails(product); // Proceed to go to details if it's not the delete button
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

    public getAllProducts(){
        this.isProductsLoading = true;
        this.productService.getAllProducts().subscribe((res:any)=>{
            this.isProductsLoading = false;
            if(res.code == 200){
                this.products = res?.data;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: res?.message, life: 3000});
            }
        },()=>{
            this.isProductsLoading = false;
        })
    }

    getGoogleDriveImageUrl(url: string): any {
        if (!url) return '';
        // Check if it's a Google Drive URL
        if (url.includes('drive.google.com')) {
            // Extract the file ID from the URL
            const fileId = url.match(/[-\w]{25,}/);
            if (fileId) {
                // Use the direct download format
                return `https://drive.google.com/file/d/${fileId[0]}/preview`;
            }
        }
    }

    public goToDetails(row:any){
        this.router.navigate(['/dashboard/ecommerce/create-product'],{
            queryParams:{
                data:JSON.stringify(row)
            }
        })
    }
}
