import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import * as AuthActions from '../../common/core/state/auth/auth.actions';
import { StorageService } from 'src/app/services/storage.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockStore: any;
  let mockRouter: any;
  let mockFirestoreService: any;
  let mockActionSheetController: jasmine.SpyObj<ActionSheetController>;
  let userSubject: Subject<any>;
  let documentSubject: Subject<any>;

  beforeEach(waitForAsync(() => {
    userSubject = new Subject();
    documentSubject = new Subject();

    mockStore = {
      select: jasmine.createSpy().and.returnValue(userSubject.asObservable()),
      dispatch: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    mockFirestoreService = {
      listenToDocumentsByUid: jasmine.createSpy().and.returnValue(documentSubject.asObservable()),
    };

    mockActionSheetController = jasmine.createSpyObj('ActionSheetController', ['create']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: StorageService, useValue: mockFirestoreService },
        { provide: ActionSheetController, useValue: mockActionSheetController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to user$ on initialization and fetch documents', () => {
    const mockUser = { uid: 'test-uid' };
    const mockDocuments = [
      { data: { type: 'gasto', monto: '50', fecha: Date.now() - 1000 } },
      { data: { type: 'ingreso', monto: '150', fecha: Date.now() } },
    ];

    userSubject.next(mockUser);
    documentSubject.next(mockDocuments);

    expect(mockFirestoreService.listenToDocumentsByUid).toHaveBeenCalledWith(mockUser.uid);
    expect(component.documents).toEqual(mockDocuments.sort((a, b) => b.data.fecha - a.data.fecha));
  });

  it('should calculate totals correctly in calculateTotals', () => {
    component.documents = [
      { data: { type: 'gasto', monto: '50' } },
      { data: { type: 'ingreso', monto: '150' } },
      { data: { type: 'gasto', monto: '30' } },
    ];

    component.calculateTotals();

    expect(component.totalGastos).toBe(80); // 50 + 30
    expect(component.totalIngresos).toBe(150); // Only ingresos
    expect(component.saldo).toBe(70); // 150 - 80
  });

  it('should call logout and navigate to login', () => {
    component.logout();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    spyOn(component['userSubscription']!, 'unsubscribe');
    component.ngOnDestroy();

    expect(component['userSubscription']?.unsubscribe).toHaveBeenCalled();
  });
});
