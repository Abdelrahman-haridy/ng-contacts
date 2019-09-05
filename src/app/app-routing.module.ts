import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsAddComponent } from './components/contacts-add/contacts-add.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';

const routes: Routes = [

  // App routes goes here 
  {
    path: '',
    component: ContactsListComponent,
    data: { title: 'Contacts List' }
  },
  {
    path: 'contacts',
    component: ContactsListComponent,
    data: { title: 'Contacts List' }
  },
  {
    path: 'contacts/add',
    component: ContactsAddComponent,
    data: { title: 'Add new Contact' }
  },
  {
    path: 'contacts/edit/:id',
    component: ContactsEditComponent,
    data: { title: 'Edit contact' }
  },
  { path: '**', component: ContactsListComponent },

];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
