import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces';
import { CategoriesSrvice } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  isLoading: boolean = false
  categories: Category[] = []

  constructor(private categoriesService: CategoriesSrvice) { }

  ngOnInit(): void {
     this.getCategories()
    
  }

  getCategories(){
    this.isLoading = true
    this.categoriesService.getCategory().subscribe(categories => {
      this.isLoading = false
      this.categories = categories
      console.log(categories);
      
    })
  }

}
