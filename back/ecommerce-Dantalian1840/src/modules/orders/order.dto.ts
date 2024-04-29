export class CreateOrderDto {
  userId: string;
  products: { id: string }[];
}
