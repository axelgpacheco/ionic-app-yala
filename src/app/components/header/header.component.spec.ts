import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as AuthActions from '../../common/core/state/auth/auth.actions';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: any;
  let mockRouter: any;
  let actionSheetControllerSpy: jasmine.SpyObj<ActionSheetController>;

  beforeEach(waitForAsync(() => {
    mockStore = {
      select: jasmine.createSpy().and.returnValue(of({
        photoUrl: 'https://example.com/photo.jpg',
        displayName: 'Test User',
        email: 'testuser@example.com',
      })),
      dispatch: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    actionSheetControllerSpy = jasmine.createSpyObj('ActionSheetController', ['create']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [HeaderComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ActionSheetController, useValue: actionSheetControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user details from the store', () => {
    expect(component.urlPhoto).toBe('https://example.com/photo.jpg');
    expect(component.displayName).toBe('Test');
  });

  it('should display default user details if no user is available', () => {
    mockStore.select.and.returnValue(of(null));
    component.ngOnInit();
    expect(component.urlPhoto).toBe('');
    expect(component.displayName).toBe('Usuario');
  });

  it('should set title input correctly', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });

  it('should call logout and navigate to login', () => {
    component.logout();
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should present an action sheet with options', async () => {
    const mockActionSheet = {
      present: jasmine.createSpy(),
    };
    actionSheetControllerSpy.create.and.returnValue(Promise.resolve(mockActionSheet) as any);

    await component.presentActionSheet();

    expect(actionSheetControllerSpy.create).toHaveBeenCalledWith({
      header: 'Opciones de Usuario',
      buttons: [
        {
          text: 'Cerrar Sesión',
          icon: 'log-out',
          handler: jasmine.any(Function),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    expect(mockActionSheet.present).toHaveBeenCalled();
  });

  it('should handle logout from action sheet option', async () => {
    const mockActionSheet = {
      present: jasmine.createSpy(),
    };
    actionSheetControllerSpy.create.and.returnValue(Promise.resolve(mockActionSheet) as any);

    await component.presentActionSheet();

    const mostRecentCall = actionSheetControllerSpy.create.calls.mostRecent();
    if (mostRecentCall && mostRecentCall.args[0] && mostRecentCall.args[0].buttons[0]) {
      const button = mostRecentCall.args[0].buttons[0];
      if (typeof button !== 'string' && button.handler) {
        const logoutHandler = button.handler;
        logoutHandler();
        expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      }
      logoutHandler();
      expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    }
 
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
function logoutHandler() {
  throw new Error('Function not implemented.');
}

