import { Component, OnInit } from '@angular/core';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  recipes: Recipe[];

  constructor(public dialog: MatDialog, private recipeService: RecipeService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
      autoFocus: true,
      disableClose: true
    });
  }

  ngOnInit() {
    this.recipeService.getAll().subscribe(data => this.recipes = data);
  }
}
