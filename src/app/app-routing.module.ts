import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { UploadComponent } from './upload/upload.component';
import { WalletValueComponent } from './wallet-value/wallet-value.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'wallet-value', component: WalletValueComponent },
  {
    path: ':userId',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: ':userId/:resumeId',
    component: ResumeDetailsComponent,
    canActivate: [AngularFireAuthGuard],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
