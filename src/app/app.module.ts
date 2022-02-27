import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ToolbarComponent } from './components-core/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './public_pages/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoginComponent } from './public_pages/login/login.component';
import { SignupComponent } from './public_pages/signup/signup.component';
import { AccountMenuComponent } from './components-core/toolbar/component/account-menu/account-menu.component';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule } from  '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileComponent } from './private_pages/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatTableModule} from '@angular/material/table';
import { CollectComponent } from './private_pages/collect/collect.component';
import { CreatenftComponent } from './private_pages/createnft/createnft.component';
import { ActivateComponent } from './public_pages/activate/activate.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ProgressSpinnerComponent } from './components-core/progress-spinner/progress-spinner.component'
import { OverlayService } from './components-core/progress-spinner/service/overlay.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddPropertiesComponent } from './private_pages/createnft/component/add-properties/add-properties.component';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DestroySaveComponent } from './private_pages/createnft/component/destroy-save/destroy-save.component';
import { HttpUrlService } from './service/http/http-url.service';
import { ReadnftComponent } from './private_pages/readnft/readnft.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterComponent } from './components-core/footer/footer.component';
import { AuthService } from './auth/auth.service';
import { SplashService } from './service/splash/splash.service';
import { SplashComponent } from './components-core/splash/splash/splash.component';
import { LoginAdminComponent } from './admin/sign/login-admin/login-admin.component';
import { HomeAdminComponent } from './admin/dashboard/home-admin/home-admin.component';
import { ReadnftAdminComponent } from './admin/dashboard/readnft-admin/readnft-admin.component';
import {MatBadgeModule} from '@angular/material/badge';
import { PageNotFoundComponent } from './errorPage/404/page-not-found/page-not-found.component';
import { SentimentService } from './service/sentiment/sentiment.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function ConnectionFailed(event:any) {
  if(event != true) {return false;}
  return true;
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AccountMenuComponent,
    ProfileComponent,
    CollectComponent,
    CreatenftComponent,
    ActivateComponent,
    ProgressSpinnerComponent,
    AddPropertiesComponent,
    DestroySaveComponent,
    ReadnftComponent,
    FooterComponent,
    SplashComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    ReadnftAdminComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it-it',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'Loading...' }),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    OverlayModule,
    CommonModule,
    NgxDropzoneModule,
    MatCardModule,
    MatSlideToggleModule,
    SweetAlert2Module,
    MatBadgeModule
  ],
  exports:[ProgressSpinnerComponent],
  providers: [OverlayService,HttpUrlService,AuthService,SplashService, SentimentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
