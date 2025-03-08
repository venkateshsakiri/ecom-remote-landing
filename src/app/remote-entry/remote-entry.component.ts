import { Component } from '@angular/core';

@Component({
  selector: 'app-remote-entry',
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.scss']
})
export class RemoteEntryComponent {
  products = [
    {
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    },
    {
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    },
    {
      name: 'Premium Sunglasses',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f'
    },
    {
      name: 'Leather Backpack',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
    }
  ];
}
