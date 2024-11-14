import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IngresosPage } from './ingresos.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalRegistroComponent } from 'src/app/components/modal-registro/modal-registro.component';

describe('IngresosPage', () => {
  let component: IngresosPage;
  let fixture: ComponentFixture<IngresosPage>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [IngresosPage],
      providers: [
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a populated "ingresos" array', () => {
    expect(component.ingresos.length).toBe(10);
    expect(component.ingresos[0]).toEqual({
      id: 1,
      descripcion: 'Salario',
      url: './../../../assets/ingresos/tarjeta-de-debito.png',
      type: 'ingreso',
    });
  });

  it('should open a modal when onCardClick is called', async () => {
    const mockIngreso = { id: 1, descripcion: 'Salario', type: 'ingreso' };
    const mockModal = {
      present: jasmine.createSpy('present'),
    };
    mockModalController.create.and.returnValue(Promise.resolve(mockModal) as any);

    await component.onCardClick(mockIngreso);

    expect(mockModalController.create).toHaveBeenCalledWith({
      component: ModalRegistroComponent,
      componentProps: { ingreso: mockIngreso },
    });
    expect(mockModal.present).toHaveBeenCalled();
  });
});
