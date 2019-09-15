import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// services
import { ContactsService } from './../../services/contacts.service';
import { AlertService } from './../../services/alert.service';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  pageTitle = 'Contacts List';
  contactsList;
  loading = false;
  submitted = false;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute, 
    private alertService: AlertService) { }

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
          this.alertService.success('SUCCESS - Your contact deleted :)  ');
          setTimeout(() => {
            this.alertService.clear();
            this.loading = false;
            this.getContactsList();
          }, 3000);
        },
        error => {
          this.alertService.error('ERROR - Your contact not deleted :(  try again  ');
          setTimeout(() => {
            this.alertService.clear();
          }, 3000);
        }
      );
    }
  }

}
