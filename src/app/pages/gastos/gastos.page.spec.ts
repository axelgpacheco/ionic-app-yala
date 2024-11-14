import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { GastosPage } from './gastos.page';
import { ModalRegistroComponent } from 'src/app/components/modal-registro/modal-registro.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('GastosPage', () => {
  let component: GastosPage;
  let fixture: ComponentFixture<GastosPage>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [GastosPage],
      providers: [
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a populated "gastos" array', () => {
    expect(component.gastos.length).toBeGreaterThan(0);
    expect(component.gastos[0]).toEqual({
      descripcion: 'Agua',
      url: './../../../assets/gastos/botella-de-agua.png',
      type: 'gasto',
    });
  });

  it('should open a modal when onCardClick is called', async () => {
    const mockIngreso = { descripcion: 'Test Gasto', type: 'gasto' };
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
