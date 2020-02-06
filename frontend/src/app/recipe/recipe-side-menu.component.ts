import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

@Component({
  selector: 'app-recipe-side-menu',
  templateUrl: './recipe-side-menu.component.html',
  styleUrls: ['./recipe-side-menu.component.css']
})
export class RecipeSideMenuComponent implements OnInit {

  tagSummary: [];

  constructor(route: ActivatedRoute, public dialog: MatDialog, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getTagSummary().subscribe(data => this.tagSummary = data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecipeEditorComponent, {
      width: '800px',
      height: '600px',
      autoFocus: true,
      disableClose: true
    });
  }
}
