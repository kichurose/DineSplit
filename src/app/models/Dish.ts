export class Dish {
    name: string;
    price: number;
    id: number;
  
    private static lastId = 0;
    constructor(name: string, price: number) {
      this.name = name;
      this.price = price;
      this.id = ++Dish.lastId;
    }
  }