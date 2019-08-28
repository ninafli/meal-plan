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
  @Output() ingredientToEmit = new EventEmitter<Ingredient>();

  @ViewChild('amount', { static: false }) amount: ElementRef;

  isNew = false;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    if (!this.ingredient) {
      this.ingredient = new Ingredient();
      this.isNew = true;
    }
  }

  isInFlight(): boolean {
    return !this.ingredient.id;
  }

  addIngredient() {
    if (this.ingredient.amount > 0 && this.ingredient.rawIngredient && this.ingredient.rawIngredient !== '') {
      this.ingredientToEmit.emit(this.ingredient);
      if (this.isNew) {
        this.ingredient = new Ingredient();
      }
    }
  }

  focusInput() {
    setTimeout(() => this.amount.nativeElement.focus());
  }
}
