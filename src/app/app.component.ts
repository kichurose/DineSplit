import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person } from './models/Person';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Dish } from './models/Dish';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public formGroup: FormGroup;
  public personFormGroup: FormGroup;
  title = 'DineSplit';
  public itemToPriceMap: Map<string, number> = new Map<string, number>();
  public dishName: string = '';
  public currentPerson: string;
  public personArray: Person[] = [];
  public itemsArray: Dish[] = [];


   public showItems: boolean = false;

  constructor(private fb: FormBuilder) {}
  //
  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [],
      price: [],
      selectedItems: [],
    });

    this.personFormGroup = this.fb.group({
      name: [],
      items: [],
    });
  }

  //   public addItem(): void{
  // this.showItems = true;
  //   }
  public addDishes(): void {
    const name = this.formGroup.get('name').value;
    const price = this.formGroup.get('price').value;

    if (name && price) {
      this.itemToPriceMap.set(name, price);
      this.formGroup.reset();
      const newDish = new Dish(name, price);
      this.itemsArray.push(newDish);
    }
  }


  onViewClick(): void{
    if(this.itemsArray.length >0)
    {
      this.showItems = !this.showItems;
    }
   // console.log(this.showItems)

  }

  public addPerson(): void {
    const personName = this.personFormGroup.get('name').value;
    const dishes = this.personFormGroup.get('items').value;

    let total: number = 0;
    dishes.forEach((dish) => {
      const test: number = Number(this.itemToPriceMap.get(dish));
      total = total + test;
    });
    var person = new Person(personName, dishes, total);

    this.personArray.push(person);
    this.personFormGroup.reset();
  }
}
