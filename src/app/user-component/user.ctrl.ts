import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Dish } from '../models/Dish';

@Component({
  selector: 'user',
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
  templateUrl: './user.ctrl.html',
  styleUrl: './user.ctrl.scss',
})
export class UserComponent {
  //public userFormGroup: FormGroup;
  public username: string;
  @Output() usernameChange = new EventEmitter<string>();


  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {}

  public addPerson(): void {
this.usernameChange.emit(this.username);
  }
}
