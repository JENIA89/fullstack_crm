import { Component, OnInit } from '@angular/core';
import { CategoriesSrvice } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesSrvice) { }

  ngOnInit(): void {
    // this.getCategories()
    this.categoriesService.getCategory().subscribe(category=>{
      console.log(category);
      
    })
  }

  // getCategories(){
  //   this.categoriesService.getCategory().subscribe(category=>{
  //     console.log(category);
      
  //   })
  // }

}
