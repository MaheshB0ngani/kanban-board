import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private auth: AngularFireAuth) { }

  @HostListener('click')
  onclick() {
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}