import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/recipe';
  }

  find(tag?: string): Observable<Recipe[]> {
    if (tag) {
      return this.http.get<Recipe[]>(this.url + '?tag=' + tag);
    } else {
      return this.http.get<Recipe[]>(this.url);
    }
  }

  create(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, recipe);
  }

  update(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.url, recipe);
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

  getTagSummary(): Observable<[]> {
    return this.http.get<[]>(this.url + '/tag-summary');
  }

  delete(id: string) {
    return this.http.delete<Recipe>(this.url + '/' + id);
  }

  search(searchString: string): Observable<Recipe[]> {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<Recipe[]>(this.url + '/search', { params: params });
  }
}
