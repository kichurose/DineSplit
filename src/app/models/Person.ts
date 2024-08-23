export class Person {
  name: string;
  consumedItems: string[];
  totalPrice: number;

  constructor(
    name: string,
    consumedItems: string[] = [],
    totalPrice: number = 0
  ) {
    this.name = name;
    this.consumedItems = consumedItems;
    this.totalPrice = totalPrice;
  }
}
