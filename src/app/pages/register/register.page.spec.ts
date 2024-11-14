import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['createUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form with required controls', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.controls['email'].value).toBe('');
    expect(component.registerForm.controls['password'].value).toBe('');
    expect(component.registerForm.controls['confirmPassword'].value).toBe('');
  });

  it('should validate email and password fields correctly', () => {
    const emailControl = component.registerForm.controls['email'];
    const passwordControl = component.registerForm.controls['password'];
    const confirmPasswordControl = component.registerForm.controls['confirmPassword'];

    emailControl.setValue('invalid-email');
    passwordControl.setValue('123');
    confirmPasswordControl.setValue('123');
    expect(emailControl.hasError('email')).toBeTrue();
    expect(passwordControl.hasError('minlength')).toBeTrue();

    emailControl.setValue('test@example.com');
    passwordControl.setValue('password123');
    confirmPasswordControl.setValue('password123');
    expect(emailControl.valid).toBeTrue();
    expect(passwordControl.valid).toBeTrue();
  });

  it('should validate password matching correctly', () => {
    const passwordControl = component.registerForm.controls['password'];
    const confirmPasswordControl = component.registerForm.controls['confirmPassword'];

    passwordControl.setValue('password123');
    confirmPasswordControl.setValue('differentPassword');


    expect(component.registerForm.errors?.['notMatching']).toBeTrue();

    confirmPasswordControl.setValue('password123');
    expect(component.registerForm.errors).toBeNull();
  });

  it('should navigate to login page on navigateToLogin', () => {
    component.navigateToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should register and navigate to home on successful registration', async () => {
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
    mockAuthService.createUser.and.returnValue(Promise.resolve(mockUser));

    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await component.onRegister();

    expect(mockAuthService.createUser).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/tabs/home']);
  });

  it('should handle registration errors correctly', async () => {
    const mockError = new Error('Registration failed');
    mockAuthService.createUser.and.returnValue(Promise.reject(mockError));

    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await component.onRegister();

    expect(mockAuthService.createUser).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
