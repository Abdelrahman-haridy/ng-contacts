import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//services
import { ContactsService } from './services/contacts.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsAddComponent } from './components/contacts-add/contacts-add.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactsAddComponent,
    ContactsEditComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
