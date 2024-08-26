export class Person {
  userId: number;
  name: string;
  consumedItems: string[];
  totalPrice: number;

  static lastId: number = 0;
  constructor(
    name: string,
    consumedItems: string[] = [],
    totalPrice: number = 0
  ) {
    this.name = name;
    this.consumedItems = consumedItems;
    this.totalPrice = totalPrice;
    this.userId = ++Person.lastId;
  }
}
