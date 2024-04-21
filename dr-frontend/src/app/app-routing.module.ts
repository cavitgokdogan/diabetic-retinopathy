import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  {path: '', component:UploadImageComponent},
  {path: 'results', component:ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
