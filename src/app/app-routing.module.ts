import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {path:'auth' ,loadChildren:()=>AuthModule},
  { path: 'settings',  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
  { path: 'editor',  loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
