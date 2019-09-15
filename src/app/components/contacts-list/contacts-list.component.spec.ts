import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactsListComponent } from './contacts-list.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertService } from './../../services/alert.service';
import { ContactsService } from './../../services/contacts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, Ng2SearchPipeModule, HttpClientTestingModule ],
      declarations: [ ContactsListComponent ],
      providers: [AlertService, ContactsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as page title 'Contacts List'`, () => {
    const fixture = TestBed.createComponent(ContactsListComponent);
    const page = fixture.debugElement.componentInstance;
    expect(page.pageTitle).toEqual('Contacts List');
  });
});
