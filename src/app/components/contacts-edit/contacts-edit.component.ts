import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

// services
import { ContactsService } from './../../services/contacts.service';
import { AlertService } from './../../services/alert.service';

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
  submitted = false;

  updateContactForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private alertService: AlertService,
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
        res.phones.forEach(element => {
          this.addPhone();
        });
      });
    });
  }

  createForm() {
    this.updateContactForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      phones: this.formBuilder.array([])
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
          this.alertService.success('SUCCESS - Your contact updated :)  ');
          setTimeout(() => {
            this.alertService.clear();
            this.router.navigate(['/']);
          }, 3000);
        },
        error => {
          this.alertService.error('ERROR - Your contact not updated :(  try again  ');

          this.loading = false;
          setTimeout(() => {
            this.alertService.clear();
          }, 3000);
        }
      );
    }
  }

  get phones() {
    return this.updateContactForm.get('phones') as FormArray;
  }

  addPhone() {
    const control = <FormArray>this.updateContactForm.controls['phones'];
    control.push(this.getPhone());
  }

  deletePhone(index) {
    this.phones.removeAt(index);
  }


  private getPhone() {
    return this.formBuilder.group({
      phone: [null, [Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]*$")]],
    });
  }

}

