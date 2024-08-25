import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Dish } from '../models/Dish';

@Component({
  selector: 'dish',
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
  templateUrl: './dish.ctrl.html',
  styleUrl: './dish.ctrl.scss',
})
export class DishComponent {
  public formGroup: FormGroup;
  public personFormGroup: FormGroup;

  public dishName: string = '';
  public currentPerson: string;
  public editIdentifier: number;
  @Input()
  public dishItem: Dish;
  @Output()
  public itemAdded: EventEmitter<Dish> = new EventEmitter<Dish>();
  @Output()
  public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [],
      price: [],
    });
    if (this.dishItem) {
      this.editIdentifier = this.dishItem.id;
      this.formGroup.patchValue({
        name: this.dishItem.name,
        price: this.dishItem.price,
      });
    }
  }

  public addDishes(): void {
    const name = this.formGroup.get('name').value;
    const price = this.formGroup.get('price').value;

    if (name && price) {
      this.formGroup.reset();

      if (this.editIdentifier > 0) {
        this.dishItem.name = name;
        this.dishItem.price = price;
        this.itemAdded.emit(this.dishItem);
        return;
      }

      const newDish = new Dish(name, price);
      this.itemAdded.emit(newDish);
    }
  }
  public onClose() {
    this.close.emit(true);
  }
}
