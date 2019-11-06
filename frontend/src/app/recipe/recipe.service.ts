import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/recipe';
  }

  save(recipe: Recipe) {
    this.http.post<Recipe>(this.url, recipe).subscribe(res => console.log(res));
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/tag');
  }
}
