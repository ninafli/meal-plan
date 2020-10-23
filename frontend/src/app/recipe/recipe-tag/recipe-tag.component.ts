import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-recipe-tag',
  templateUrl: './recipe-tag.component.html',
  styleUrls: ['./recipe-tag.component.css']
})
export class RecipeTagComponent implements OnInit {

  tagCtrl = new FormControl();
  allTags: string[];
  filteredTags: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() tags: string[];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getTags().subscribe(data => {
      this.allTags = data;

      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    });
  }

  ngOnInit() { }

  remove(index: number): void {
    this.tags.splice(index, 1);
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      let value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
