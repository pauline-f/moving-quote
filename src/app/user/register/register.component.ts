import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;

  constructor(private userService:UserService,
              private router:Router,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group( {
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const mail = this.registerForm.get('mail').value;
    const password = this.registerForm.get('password').value;
    this.userService.createNewUser(mail, password).then (
      () => {
        this.router.navigate(['/quote/create']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

}
