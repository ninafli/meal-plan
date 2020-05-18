import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
