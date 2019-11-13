import { RecipeService } from './../recipe.service';
import { Ingredient } from '../ingredient';
import { Component, OnInit, OnChanges, ViewChild, Inject } from '@angular/core';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { MethodComponent } from './method/method.component';
import { Recipe } from '../recipe';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  ingredients: Ingredient[] = [];
  methods: string[] = [];
  recipeName = '';
  tags: Set<string> = new Set();
  imageData: any;

  @ViewChild('newIngredient', { static: false }) newIngredient: IngredientItemComponent;
  @ViewChild('newDirection', { static: false }) newDirection: MethodComponent;

  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.focusInput();
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }

  addDirection(method: string) {
    this.methods.push(method);
    this.newDirection.focusInput();
  }

  isValid(): boolean {
    return this.methods.length > 0 && this.ingredients.length > 0 && this.recipeName !== '';
  }

  openImageUrlDialog() {
    const dialogRef = this.dialog.open(ImageUrlDialog, {
      width: '500px',
      data: { url: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.url) {
        this.recipeService.getImage(result.url).subscribe(data => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = () => {
            this.imageData = reader.result;
          };
        });
      }
    });
  }

  onFileSelected(file: File) {
    if (!file) {
      return;
    }

    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageData = reader.result;
    };
  }

  saveRecipe() {
    if (this.isValid()) {
      this.recipeService.save(new Recipe(this.ingredients, this.methods, this.tags, this.recipeName, this.imageData));
    }
  }
}

@Component({
  selector: 'app-image-url-dialog',
  templateUrl: 'image-url-dialog.html',
  styleUrls: ['./add-recipe.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class ImageUrlDialog {

  constructor(
    public dialogRef: MatDialogRef<ImageUrlDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
