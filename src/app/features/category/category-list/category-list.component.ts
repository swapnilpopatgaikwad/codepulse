import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../models/category-Dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationDataService } from '../services/navigation-data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories: CategoryDto[] = []; // Array to store categories
  isLoading: boolean = true; // Loading indicator
  constructor(private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private navigationDataService: NavigationDataService) {

  }
  ngOnInit(): void {
    const data = this.navigationDataService.getData();
    this.navigationDataService.clearData();
    if (data === true)
      this.loadCategories(true);
    else
      this.loadCategories();
  }

  loadCategories(eraseCache: boolean = false): void {
    this.categoryService.getCategories(eraseCache).subscribe(
      (data) => {
        this.categories = data;
        this.isLoading = false; // Stop loading
      },
      (error) => {
        console.error('Error loading categories:', error);
        this.isLoading = false; // Stop loading
      }
    );
  }

  onDelete(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (response) => {
        // Assuming 'response' is the string message from the backend
        console.log('Response:', response); // Debugging line
        this.snackBar.open('Category deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-toast'],
        });
        this.loadCategories(true);
      },
      error: (error) => {
        console.error('Error:', error); // Debugging line
        this.snackBar.open('Error deleting category. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-toast'],
        });
      }
    });
  }

}
