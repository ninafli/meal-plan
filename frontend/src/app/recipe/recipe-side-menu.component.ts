import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-side-menu',
  templateUrl: './recipe-side-menu.component.html',
  styleUrls: ['./recipe-side-menu.component.css']
})
export class RecipeSideMenuComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => console.log('side menu id parameter', params['id']));

  }

  ngOnInit() {
  }

}
