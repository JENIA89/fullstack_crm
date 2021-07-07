import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces';

@Injectable({
    providedIn: "root"
})

export class CategoriesSrvice {
    constructor(private http: HttpClient){}

    getCategory(): Observable<Category[]>{
        return this.http.get<Category[]>('/api/category')
    }
}