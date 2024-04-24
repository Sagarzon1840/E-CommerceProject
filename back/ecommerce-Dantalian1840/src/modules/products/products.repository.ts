import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Product A',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 19.99,
      stock: true,
      imgUrl: 'https://example.com/productA.jpg',
    },
    {
      id: 2,
      name: 'Product B',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 29.99,
      stock: false,
      imgUrl: 'https://example.com/productB.jpg',
    },
    {
      id: 3,
      name: 'Product C',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 39.99,
      stock: true,
      imgUrl: 'https://example.com/productC.jpg',
    },
    {
      id: 4,
      name: 'Product D',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 49.99,
      stock: true,
      imgUrl: 'https://example.com/productD.jpg',
    },
    {
      id: 5,
      name: 'Product E',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 59.99,
      stock: false,
      imgUrl: 'https://example.com/productE.jpg',
    },
  ];

  async getProducts() {
    return this.products;
  }
}
