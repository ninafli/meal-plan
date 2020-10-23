import { FractionPipe } from '../../common/fraction.pipe';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Recipe } from '../recipe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../ingredient';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { RecipeEditorComponent } from '../recipe-editor/recipe-editor.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(private route: ActivatedRoute, private router: Router,
    private recipeService: RecipeService, private fractionPipe: FractionPipe,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.recipe$ = this.recipeService.getRecipe(params.id));
  }

  print(ingredient: Ingredient): string {
    return `${this.fractionPipe.transform(ingredient.amount)} ${ingredient.unit ? ingredient.unit : ''} ` +
      `${ingredient.rawIngredient}${ingredient.prepMethod ? ', ' + ingredient.prepMethod : ''}`;
  }

  delete(recipe: Recipe) {
    const message = `Are you sure you want to delete this recipe?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.recipeService.delete(recipe.id).subscribe(data =>
          this.router.navigate(['/recipes']));
      }
    });
  }

  edit(recipe: Recipe) {
    const dialogRef = this.dialog.open(RecipeEditorComponent, {
      width: '800px',
      height: '600px',
      autoFocus: true,
      disableClose: true,
      data: { recipe }
    });
  }
}
