import { Category } from './../../shared/interfaces';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesSrvice } from 'src/app/shared/services/categories.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  image: File
  imagePreview
  category: Category
  form: FormGroup
  isNew: boolean = true

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesSrvice) { }

  ngOnInit(){
    this.initForm()

    this.form.disable()

    this.route.params
    .pipe(
      switchMap((params: Params)=>{
        if(params['id']){
          this.isNew = false
        return this.categoryService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(
      (category: Category)=>{
        if(category){
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview = category.imageSrc
          MaterialService.updateTextInputs()
        }
        this.form.enable()
      },
      error=> MaterialService.toasts(error.error.message)
      )
    
  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any){
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = ()=>{
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit(){
    let obs$
    this.form.disable()

    if(this.isNew){
      obs$ = this.categoryService.create(this.form.value.name, this.image)
    }else{
      obs$ = this.categoryService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category =>{
        this.category = category
        MaterialService.toasts('Изменения сохранены')
        this.form.enable()
      },
      error=>{
        MaterialService.toasts(error.error.message)
        this.form.enable()
      }
    )

  }

}
