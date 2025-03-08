import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteEntryComponent } from './remote-entry.component';

const routes: Routes = [{ path: '', component: RemoteEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteEntryRoutingModule { }
