import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes =
    [
        {
            path: '',
            children: [
                {
                    path: 'login',
                    component: LoginComponent,
                },
                {
                    path: 'register',
                    component: RegisterComponent,
                },
                {
                    path: 'forgot',
                    component: ForgotPasswordComponent,
                },
            ],
        }

    ];


export const AuthRoutingModule = RouterModule.forChild(routes);
