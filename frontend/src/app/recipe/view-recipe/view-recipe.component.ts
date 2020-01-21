import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Recipe } from '../recipe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService
  ) {

  }

  ngOnInit() {
    // console.log(this.route.paramMap);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // this.recipeService.getRecipe(params.get('id')))
        console.log(params.get('id'));
        return null;
      }
      ));
  }
}
