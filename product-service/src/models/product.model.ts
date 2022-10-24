export interface Product {
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
}

export type ProductDtoModel = Omit<Product, 'id' | 'count'>;

export class ProductDto implements ProductDtoModel {
  public title: string;
  public description: string;
  public price: number;

  constructor(product: Partial<Product>) {
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
  }
}
