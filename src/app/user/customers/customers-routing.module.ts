import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile-page/profile.component';

const routes: Routes =
    [
        {
            path: '',
            children: [
                {
                    path: 'profile',
                    component: ProfileComponent,
                },
            ],
        }

    ];

export const CustomersRoutingModule = RouterModule.forChild(routes);
