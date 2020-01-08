import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

@Component({
  selector: 'app-recipe-side-menu',
  templateUrl: './recipe-side-menu.component.html',
  styleUrls: ['./recipe-side-menu.component.css']
})
export class RecipeSideMenuComponent implements OnInit {

  constructor(route: ActivatedRoute, public dialog: MatDialog) {
    route.params.subscribe(params => console.log('side menu id parameter', params.id));
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
      autoFocus: true,
      disableClose: true
    });
  }

}
