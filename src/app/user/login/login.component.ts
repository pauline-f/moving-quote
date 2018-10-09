import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private userService:UserService,
              private router:Router,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group( {
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const mail = this.loginForm.get('mail').value;
    const password = this.loginForm.get('password').value;
    this.userService.loginUser(mail, password).then (
      () => {
        this.router.navigate(['/quote/create']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

}
