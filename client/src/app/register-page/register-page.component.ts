import { User } from './../shared/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
   this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }

  onSubmit(){
    if(this.form.invalid) return

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.sub = this.auth.register(user).subscribe(()=>{
        this.router.navigate(['/login'], {
          queryParams:{
            registered: true
          }
        })
        console.log(' user created')
      })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

}
