import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
      height: '800px',
      autoFocus: true
    });

    // dialogRef.afterClosed().subscribe(data => {
    //   if (data) {
    //     // this.recipeService.save(data).subscribe(result => this.loadUsers());
    //   }
    // });
  }
}
