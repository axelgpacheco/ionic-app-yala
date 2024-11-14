import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../common/core/state/auth/auth.actions';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'signInWithGoogle',
      'signInWithEmailAndPassword',
      'getToken',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with required controls', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['email'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
  });

  it('should validate email and password fields correctly', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('invalid-email');
    passwordControl.setValue('123');
    expect(emailControl.hasError('email')).toBeTrue();
    expect(passwordControl.hasError('minlength')).toBeTrue();

    emailControl.setValue('test@example.com');
    passwordControl.setValue('password123');
    expect(emailControl.valid).toBeTrue();
    expect(passwordControl.valid).toBeTrue();
  });

  it('should show validation error messages for invalid form controls', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('');
    passwordControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();
    expect(passwordControl.hasError('required')).toBeTrue();
  });

  it('should navigate to the register page when navigateToRegister is called', () => {
    component.navigateToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });


  

  it('should dispatch login and navigate to home on successful email login', async () => {
    const mockUser: any = {
      email: 'test@example.com',
      uid: '123',
      displayName: 'Test User', 
      emailVerified: true, 
      isAnonymous: false, 
      metadata: {}, 
      phoneNumber: null, 
      photoURL: null, 
      providerData: [], 
      refreshToken: '', 
      tenantId: null, 
    };
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(mockUser));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    await component.loginWithEmailAndPassword();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.login({ email: 'test@example.com', password: 'password123' }));
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.loginSuccess({ user: mockUser }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/tabs/home']);
  });

  it('should dispatch login failure action on email login error', async () => {
    const mockError = new Error('Invalid credentials');
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.reject(mockError));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    await component.loginWithEmailAndPassword();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.loginFailure({ error: mockError.message }));
  });

  it('should dispatch login success and navigate on successful Google login', async () => {
    const mockUser: any = {
      email: 'test@example.com',
      uid: '123',
      displayName: 'Test User', 
      emailVerified: true, 
      isAnonymous: false, 
      metadata: {}, 
      phoneNumber: null, 
      photoURL: null, 
      providerData: [], 
      refreshToken: '', 
      tenantId: null, 
    };
    mockAuthService.signInWithGoogle.and.returnValue(Promise.resolve(mockUser));

    await component.loginWithGoogle();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.loginSuccess({ user: mockUser }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/tabs/home']);
  });

  it('should dispatch login failure action on Google login error', async () => {
    const mockError = new Error('Google login failed');
    mockAuthService.signInWithGoogle.and.returnValue(Promise.reject(mockError));

    await component.loginWithGoogle();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.loginFailure({ error: mockError.message }));
  });

  it('should call getToken from AuthService in getToken method', async () => {
    const mockToken = 'mock-token';
    mockAuthService.getToken.and.returnValue(Promise.resolve(mockToken));

    await component.getToken();

    expect(mockAuthService.getToken).toHaveBeenCalled();
  });
});
