import { NgModule } from '@angular/core';
import { MatPrefix } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './admin/dashboard/home-admin/home-admin.component';
import { ReadnftAdminComponent } from './admin/dashboard/readnft-admin/readnft-admin.component';
import { LoginAdminComponent } from './admin/sign/login-admin/login-admin.component';
import { PageNotFoundComponent } from './errorPage/404/page-not-found/page-not-found.component';
import { CollectComponent } from './private_pages/collect/collect.component';
import { CreatenftComponent } from './private_pages/createnft/createnft.component';
import { ProfileComponent } from './private_pages/profile/profile.component';
import { ReadnftComponent } from './private_pages/readnft/readnft.component';
import { ActivateComponent } from './public_pages/activate/activate.component';
import { HomeComponent } from './public_pages/home/home.component';
import { LoginComponent } from './public_pages/login/login.component';
import { SignupComponent } from './public_pages/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '404', component:PageNotFoundComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'activation/:string/:stringtwo', component: ActivateComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'collect', component: CollectComponent},
  {path: 'buildnft/new', component: CreatenftComponent},
  {path: 'buildnft/:modify', component: ReadnftComponent},
  {path: 'function/core/admin/sign/login', component: LoginAdminComponent},
  {path: 'function/core/admin/dashboard', component: HomeAdminComponent},
  {path: 'function/core/admin/dashboard/readnft/:guid', component: ReadnftAdminComponent},




  {path: '**', redirectTo:'/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
