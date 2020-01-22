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

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }
  save(recipe: Recipe) {
    this.http.post<Recipe>(this.url, recipe).subscribe(res => console.log(res));
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.url + '/' + id);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/tag');
  }

  getImage(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  delete(id: string) {
    return this.http.delete<Recipe>(this.url + '/' + id);
  }
}
