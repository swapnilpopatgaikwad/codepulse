import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryDto } from '../models/category-Dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7189/api/Categories';

  private categoriesCache: CategoryDto[] | null = null;

  constructor(private http: HttpClient) { }

  addOrUpdateCategory(model : CategoryDto) : Observable<void> {

    return this.http.post<void>(`${this.apiUrl}/AddOrUpdate`, model);
  }

  getCategories(eraseCache: boolean = false): Observable<CategoryDto[]> {

    if (this.categoriesCache && eraseCache === false) {
      return of(this.categoriesCache);
    } else {
      return this.http.get<CategoryDto[]>(`${this.apiUrl}/AllCategories`).pipe(
        tap((data) => (this.categoriesCache = data))
      );
    }
  }

  getCategory(categoryId : string) : Observable<CategoryDto> {

    return this.http.get<CategoryDto>(`${this.apiUrl}/Category/${categoryId}`);
  }

  deleteCategory(categoryId : string) : Observable<string> {

    return this.http.delete<string>(`${this.apiUrl}/DeleteCategory/${categoryId}`);
  }
}
