import { RecipeService } from '../recipe.service';
import { Ingredient } from '../ingredient';
import { Component, OnInit, OnChanges, ViewChild, Inject } from '@angular/core';
import { IngredientItemComponent } from '../ingredient-item/ingredient-item.component';
import { MethodComponent } from '../method/method.component';
import { Recipe } from '../recipe';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { observable, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit {

  @ViewChild('newIngredient', { static: false }) newIngredient: IngredientItemComponent;
  @ViewChild('newDirection', { static: false }) newDirection: MethodComponent;

  recipe: Recipe;

  constructor(private recipeService: RecipeService, public dialog: MatDialog,
    public editorDialogRef: MatDialogRef<RecipeEditorComponent>, @Inject(MAT_DIALOG_DATA) recipeData: any,
    private router: Router) {
    if (recipeData && recipeData.recipe) {
      this.recipe = recipeData.recipe;
    } else {
      this.recipe = new Recipe([], [], new Set(), '', null);
    }
  }

  ngOnInit() {
  }

  addIngredient(ingredient: Ingredient) {
    this.recipe.ingredients.push(ingredient);
    this.newIngredient.focusInput();
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.recipe.ingredients.indexOf(ingredient);
    if (index > -1) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  addDirection(method: string) {
    this.recipe.method.push(method);
    this.newDirection.focusInput();
  }

  isValid(): boolean {
    return this.recipe.method.length > 0 && this.recipe.ingredients.length > 0 && this.recipe.name !== '';
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
            this.recipe.image = reader.result;
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
      this.recipe.image = reader.result;
    };
  }

  saveRecipe() {
    if (this.isValid()) {
      let observ: Observable<Recipe>;
      if (this.recipe.id) {
        observ = this.recipeService.update(this.recipe);
      } else {
        observ = this.recipeService.create(this.recipe);
      }

      observ.subscribe(savedRecipe => this.editorDialogRef.close());
    }
  }
}

@Component({
  selector: 'app-image-url-dialog',
  templateUrl: 'image-url-dialog.html',
  styleUrls: []
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
