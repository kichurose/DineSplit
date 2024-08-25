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
import { DishComponent } from './dish/dish.ctrl';
import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

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
    DishComponent,
    OverlayModule,
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
  public personArray: Person[] = [];
  public itemsArray: Dish[] = [];
  private overlayRef: OverlayRef;
  public showView: boolean = false;
  public showItems: boolean = false;

  constructor(private fb: FormBuilder, private overlay: Overlay) {}

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

  public addItem(newDish: Dish): void {}

  public onEdit(index: number): void {
    this.openDishOverlay(index);
  }

  public openDishOverlay(index?: number): void {
    // Define the overlay configuration
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const dishOverlayPortal = new ComponentPortal(DishComponent);
    const overlay = this.overlayRef.attach(dishOverlayPortal);
    const editingItem = this.itemsArray[index];
    overlay.instance.dishItem = editingItem;
    overlay.instance.itemAdded.subscribe((x) => {
      if (editingItem?.id && x.id === editingItem.id) {
        this.itemToPriceMap.delete(editingItem.name);
        const val = this.itemsArray.find((k) => x.id === k.id);
        val.name = x.name;
        val.price = x.price;
        this.itemToPriceMap.set(x.name, x.price);
        return;
      }
      this.itemsArray.push(x);
      this.itemToPriceMap.set(x.name, x.price);

      this.showView = true;
    });

    overlay.instance.close.subscribe((x) => {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    });
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  onViewClick(): void {
    if (this.itemsArray.length > 0) {
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
