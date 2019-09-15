import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AlertComponent } from './directives/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertService } from './services/alert.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        AlertComponent,
        NavbarComponent
      ],
      providers: [AlertService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the navbar', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  });

  it('should create the Alert', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    const alert = fixture.debugElement.componentInstance;
    expect(alert).toBeTruthy();
  });

  it(`should have as title 'ng-contacts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-contacts');
  });

});
