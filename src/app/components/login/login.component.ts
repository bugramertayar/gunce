import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from './model/login.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(public loginService: LoginService, public router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginModel = new LoginModel();
      loginModel.username = this.loginForm.get('username')?.value;
      loginModel.password = this.loginForm.get('password')?.value;
      this.loginService.login(loginModel).subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('calendar');
        }
      });
    }
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }
}
