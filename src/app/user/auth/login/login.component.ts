import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public router: Router
  ) { }

  async onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.loading = true;
    const { email, password } = this.form.value;


    try {
      await this.userService.login(email, password);
      this.router.navigate(['']);
      this.loading = false;
    }
    catch (e) {
      this.errorMessage = e.message;
      setTimeout(() => this.errorMessage = '', 2500);

      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}
