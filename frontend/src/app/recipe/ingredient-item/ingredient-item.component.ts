import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {

  @Input() ingredient?: Ingredient;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  @ViewChild('amount') amount: ElementRef;

  isNew = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (!this.ingredient) {
      this.ingredient = new Ingredient();
      this.isNew = true;
      setTimeout(() => this.amount.nativeElement.focus());
    }
  }

  addIngredient() {
    if (this.ingredient.amount > 0 && this.ingredient.rawIngredient && this.ingredient.rawIngredient !== '') {
      if (this.isNew) {
        this.ingredientAdded.emit(this.ingredient);
        this.ingredient = new Ingredient();
      }
    }
  }

  deleteIngredient() {
    if (!this.isNew) {
      this.ingredientDeleted.emit(this.ingredient);
    }
  }

  focusInput() {
    setTimeout(() => this.amount.nativeElement.focus());
  }

  onKey(event: KeyboardEvent) { // with type info
    console.log(event);
  }
}
