import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../login/model/login.model';
import { LoginService } from '../login/service/login.service';
import { RegisterModel } from './model/register.model';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(public registerService: RegisterService, public router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nameSurname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerModel = new RegisterModel();
      registerModel.username = this.registerForm.get('username')?.value;
      registerModel.nameSurname = this.registerForm.get('nameSurname')?.value;
      registerModel.email = this.registerForm.get('email')?.value;
      registerModel.password = this.registerForm.get('password')?.value;
      this.registerService.login(registerModel).subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('login');
        }
      });
    }
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
