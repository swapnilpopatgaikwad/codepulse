import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryDto } from '../models/category-Dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { NavigationDataService } from '../services/navigation-data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy, OnInit {

  categoryId: string | any;
  model: CategoryDto | any;
  private addCategorySubscription?: Subscription

  constructor(private route: ActivatedRoute,
    private _location: Location,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private navigationDataService: NavigationDataService) {
    this.model = {
      id: '',
      name: '',
      urlHandle: ''
    };
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.categoryService.getCategory(this.categoryId).subscribe(
        (response) => {
          this.model.id = response.id;
          this.model.name = response.name;
          this.model.urlHandle = response.urlHandle;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.snackBar.open('Failed to load category details.', 'Close', {
            duration: 3000,
            panelClass: ['error-toast'],
          });
        }
      );
    }
  }

  onFromSubmit() {
    this.addCategorySubscription = this.categoryService.addOrUpdateCategory(this.model)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Category added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-toast'],
          });
          this.navigationDataService.setData(true);
          this._location.back();
        },
        error: (response) => {
          this.snackBar.open('Failed to add category. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-toast'],
          });
        },
        complete: () => {
          console.log('Task Completed');
        }
      });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe addCategorySubsciption');
    this.addCategorySubscription?.unsubscribe();
  }
}
