import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { ContactsService } from './../../services/contacts.service';

@Component({
  selector: 'app-contacts-add',
  templateUrl: './contacts-add.component.html',
  styleUrls: ['./contacts-add.component.scss']
})
export class ContactsAddComponent implements OnInit {
  pageTitle;
  contactsList: any = [];
  loading = false;

  addNewContactForm: FormGroup;

  // For model
  submitted = false;
  msg: {};
  error: {};
  @ViewChild('submittedModal', { static: true }) submittedModal;
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => {
        this.pageTitle = v['title'];
      });
    this.addNewContactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.addNewContactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.addNewContactForm.invalid) {
      this.loading = true;

      // add new job api
      return this.contactsService.addNew(this.addNewContactForm.value).subscribe(
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
        err => {
          this.error = 'Not Add';
          this.submittedModal.show();
          // console.log(err);

          this.loading = false;
          setTimeout(() => {
            this.submittedModal.hide();
          }, 3000);
        }
      );
    }
  }

}
