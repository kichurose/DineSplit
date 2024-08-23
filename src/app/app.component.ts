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
  title = 'DineSplit';
  public itemToPriceMap: Map<string, number> = new Map<string, number>();
  public dishName: string = '';
  public currentPerson: string;
  public personArray: Person[] = [];
  public itemsArray: Dish[] = [];

  // public showPerson: boolean = false;

  constructor(private fb: FormBuilder) {}
  //
  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [],
      price: [],
      selectedItems: [],
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

  public addPerson(): void {
    const test = this.personArray.push(new Person(this.currentPerson));
    this.currentPerson = '';
    console.log(this.personArray);
  }

  public itemsConsumed(person: Person): void {
    let total: number = 0;
    person.consumedItems.forEach((x) => {
      const test: number = Number(this.itemToPriceMap.get(x));
      total = total + test;
    });
    person.totalPrice = total;
    // console.log(person);
    this.updatePersonInArray(person);
  }

  private updatePersonInArray(updatedPerson: Person): void {
    const index = this.personArray.findIndex(
      (p) => p.name === updatedPerson.name
    );
    if (index !== -1) {
      this.personArray[index] = updatedPerson;
    } else {
      console.warn('Person not found in the array');
    }
  }
}
