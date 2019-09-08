import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { ContactsService } from './../../services/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  pageTitle;
  contactsList: any = [];
  loading = false;

  // For model
  submitted = false;
  msg: {};
  error: {};
  @ViewChild('submittedModal', { static: true }) submittedModal;
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => {
        this.pageTitle = v['title'];
      });
    this.getContactsList();
  }

  // get All Contacts list
  getContactsList() {
    this.loading = true;
    this.contactsService.getContactsList().subscribe((res) => {
      this.loading = false;
      this.contactsList = res;
    });
  }

  // Delete Contact
  deleteContact(id) {
    if (confirm('Confirm delete ?')) {

      return this.contactsService.deleteContact(id).subscribe(
        data => {
          this.loading = true;
          this.msg = 'Done';
          this.submittedModal.show();
          setTimeout(() => {
            this.submittedModal.hide();
            this.loading = false;
            this.getContactsList();
          }, 3000);
        },
        error => {
          this.error = 'have Error';
          this.submittedModal.show();
          // console.log(error);
          setTimeout(() => {
            this.submittedModal.hide();
          }, 3000);
        }
      );
    }
  }

}
