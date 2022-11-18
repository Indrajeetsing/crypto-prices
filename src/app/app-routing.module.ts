import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { WalletValueComponent } from './wallet-value/wallet-value.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'wallet-value', component: WalletValueComponent },
  {
    path: ':userId',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: ':userId/:resumeId',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard], this will also be public
  // },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
