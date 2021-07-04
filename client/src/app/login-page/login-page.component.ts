import { MaterialService } from './../shared/services/material.service';
import { User } from './../shared/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  showMessage(){
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']){
        MaterialService.toasts('Теперь вы можете зайти в систему используя свои данные')
      }else if(params['accessDenied']){
        MaterialService.toasts('Для начала авторизируйтесь в системе')
      }else if(params['sessionFailed']){
        MaterialService.toasts('Пожалуйста, войдите в систему заново')
      }
    })
  }

  onSubmit(){
    if(this.form.invalid) return

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

   this.sub = this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/overview'])
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

}
