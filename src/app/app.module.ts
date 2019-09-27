import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaCallbackComponent,
  OktaAuthModule,
  OktaLoginRedirectComponent
} from '@okta/okta-angular';
import { DetailsComponent } from './components/details/details.component';

const oktaConfig = {
  issuer: 'https://dev-202011.oktapreview.com/oauth2/default',
  clientId: '0oangm1j2mdetoW8z0h7',
  redirectUri: 'http://localhost:4200/implicit/callback'
}

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'details', component: DetailsComponent, canActivate: [OktaAuthGuard] },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: OktaLoginRedirectComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
