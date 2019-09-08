import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Contact } from './../models/contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'bearer MY_SECRET_ENCRYPTED_TOKEN'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  BaseApiURL = 'http://localhost:3000/contacts';
  constructor(private http: HttpClient) { }
  errorData: {};

  getContactsList(): Observable<Contact>  {
    return this.http.get<Contact>(this.BaseApiURL);
  }

  deleteContact(id) {
    return this
      .http
      .delete<Contact>(`${this.BaseApiURL}/${id}`, httpOptions);
  }

  addNew(contact): Observable<Contact>  {
    return this.http.post<Contact>(this.BaseApiURL, contact, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getContact(id): Observable<Contact>  {
    return this
      .http
      .get<Contact>(this.BaseApiURL + `/` + id);
  }

  editContact(contact, id): Observable<Contact> {
    return this.http.put<Contact>(this.BaseApiURL + '/' + id, JSON.stringify(contact), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(error);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'No data sent',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}

