import { FractionPipe } from './../../common/fraction.pipe';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatAccordion, MatDialog } from '@angular/material';
import { Recipe } from '../recipe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../ingredient';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(private route: ActivatedRoute, private router: Router,
    private recipeService: RecipeService, private fractionPipe: FractionPipe,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.recipeService.getRecipe(params.get('id'))));
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
      console.log(dialogResult);
      if (dialogResult) {
        this.recipeService.delete(recipe.id).subscribe(data =>
          this.router.navigate(['/recipes']));
      }
    });
  }
}
