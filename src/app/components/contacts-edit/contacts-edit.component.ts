import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { ContactsService } from './../../services/contacts.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {
  pageTitle;
  contact: any = {};
  loading = false;
  contactID;

  // For model
  submitted = false;
  msg: {};
  error: {};
  @ViewChild('submittedModal', { static: true }) submittedModal;
  updateContactForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => {
        this.pageTitle = v['title'];
      });

    this.contactID = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(params => {
      this.contactsService.getContact(params['id']).subscribe(res => {
        this.contact = res;
      });
    });
  }

  createForm() {
    this.updateContactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.updateContactForm.controls;
  }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.updateContactForm.invalid) {
      this.loading = true;

      return this.contactsService.editContact(this.updateContactForm.value, this.contactID).subscribe(
        data => {
          // console.log(data);
          this.msg = 'Done';
          this.loading = false;
          this.submittedModal.show();
          setTimeout(() => {
            this.submittedModal.hide();
            this.router.navigate(['/']);
          }, 3000);
        },
        error => {
          this.error = 'Note Updated';
          this.submittedModal.show();
          console.log(error);

          this.loading = false;
          setTimeout(() => {
            this.submittedModal.hide();
          }, 3000);
        }
      );
    }
  }

}

