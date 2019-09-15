import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

// services
import { ContactsService } from './../../services/contacts.service';
import { AlertService } from './../../services/alert.service';

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
  submitted = false;
  myFormValueChanges;

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {

    this.route
      .data
      .subscribe(v => {
        this.pageTitle = v['title'];
      });
    this.addNewContactForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      phones: this.formBuilder.array([
        this.getPhone()
      ])
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
          this.alertService.success('SUCCESS - Your contact added :)  ');
          setTimeout(() => {
            this.alertService.clear();
            this.router.navigate(['/']);
          }, 3000);
        },
        err => {
          this.loading = false;
          this.alertService.error('ERROR - Your contact not added :(  try again  ');
          setTimeout(() => {
            this.alertService.clear();
          }, 3000);
        }
      );
    }
  }

  get phones() {
    return this.addNewContactForm.get('phones') as FormArray;
  }

  addPhone() {
    const control = <FormArray>this.addNewContactForm.controls['phones'];
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
