import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatCardModule} from '@angular/material/card'
import { MatIconModule} from '@angular/material/icon'
import { MatToolbarModule} from '@angular/material/toolbar'
import { loginReducer } from './reducer/login.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './httpAPI/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


import { Store, StoreModule } from '@ngrx/store';
import { AdminComponent } from './admin/admin.component';
import { GLoginGuard } from './g-login.guard';
import { LoginGuard } from './login.guard';
import { RolesComponent } from './roles/roles.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent,canActivate:[LoginGuard]},
  { path: 'admin', component: AdminComponent,canActivate:[GLoginGuard],
  children: [
    {
      path: 'roles', // child route path
      component: RolesComponent, // child route component that the router renders
    },
  ]},
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    RolesComponent,
    DialogComponent,
    TableComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTreeModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule  ,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer }),
  ],
  providers: [AuthService,HttpService,MatSnackBar,GLoginGuard,AuthComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
