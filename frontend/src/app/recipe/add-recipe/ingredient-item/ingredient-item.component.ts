import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, OnChanges, AfterViewInit, Renderer } from '@angular/core';
import { MatInput, MatFormField } from '@angular/material';
import { Ingredient } from '../../ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {

  @Input() ingredient?: Ingredient;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  @ViewChild('amount', { static: false }) amount: ElementRef;

  isNew = false;

  constructor(private renderer: Renderer) { }

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
    console.log("here");
    if (!this.isNew) {
      this.ingredientDeleted.emit(this.ingredient);
    }
  }

  focusInput() {
    setTimeout(() => this.amount.nativeElement.focus());
  }

  delete() {

  }
}
