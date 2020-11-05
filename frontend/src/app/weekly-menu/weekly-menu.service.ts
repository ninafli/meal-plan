import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeeklyMenu } from './weekly-menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeeklyMenuService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/weeklyMenu';
  }


  update(menu: WeeklyMenu): Observable<WeeklyMenu> {
    return this.http.put<WeeklyMenu>(this.url, menu);
  }
}
