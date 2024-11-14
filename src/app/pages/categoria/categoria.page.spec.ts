import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaPage } from './categoria.page';
import { of, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoriaPage', () => {
  let component: CategoriaPage;
  let fixture: ComponentFixture<CategoriaPage>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let queryParams$: Subject<any>;

  beforeEach(() => {
    queryParams$ = new Subject();  

    mockActivatedRoute = {
      queryParams: queryParams$.asObservable(),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [CategoriaPage, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedTab based on queryParams in ngOnInit', () => {
    queryParams$.next({ tab: 'ingresos' });
    fixture.detectChanges();
    expect(component.selectedTab).toBe('ingresos');
  });

  it('should default to "gastos" if no tab queryParam is provided', () => {
    queryParams$.next({});
    fixture.detectChanges();
    expect(component.selectedTab).toBe('gastos');
  });

  it('should navigate and update selectedTab on navigateTo call', () => {
    const tabName = 'ingresos';
    component.navigateTo(tabName);

    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: mockActivatedRoute,
      queryParams: { tab: tabName },
      queryParamsHandling: 'merge',
    });
    expect(component.selectedTab).toBe(tabName);
  });
});
