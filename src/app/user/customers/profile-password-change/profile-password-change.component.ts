import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/shared/validators/password-match';

@Component({
  selector: 'app-profile-password-change',
  templateUrl: './profile-password-change.component.html',
  styleUrls: ['./profile-password-change.component.scss']
})

export class PasswordChangeComponent implements OnInit {

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
    const { currentPassword, passData } = this.form.value;


    try {
      await this.userService.changePassword(currentPassword, passData.password);
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
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      passData: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePassword: ['', [Validators.required, Validators.minLength(8)]]
      }, { validators: [passwordMatch] }),
    });
  }
}
