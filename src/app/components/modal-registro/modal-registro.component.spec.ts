import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalRegistroComponent } from './modal-registro.component';
import { StorageService } from 'src/app/services/storage.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AddDocumentResult } from '@capacitor-firebase/firestore';

describe('ModalRegistroComponent', () => {
  let component: ModalRegistroComponent;
  let fixture: ComponentFixture<ModalRegistroComponent>;
  let mockModalController: jasmine.SpyObj<ModalController>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(waitForAsync(() => {
    mockModalController = jasmine.createSpyObj('ModalController', ['dismiss']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['addRegistroDocument']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ModalRegistroComponent],
      providers: [
        { provide: ModalController, useValue: mockModalController },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input property "ingreso"', () => {
    const mockIngreso = { uid: '123', type: 'testType', descripcion: 'Test Description' };
    component.ingreso = mockIngreso;
    fixture.detectChanges();
    expect(component.ingreso).toEqual(mockIngreso);
  });

  it('should call closeModal and dismiss the modal', () => {
    component.closeModal();
    expect(mockModalController.dismiss).toHaveBeenCalled();
  });

  it('should populate "data" correctly and call storage service on guardarCantidad', async () => {
    const mockIngreso = { uid: '123', type: 'testType', descripcion: 'Test Description' };
    component.ingreso = mockIngreso;
    component.cantidad = 100;

    const mockResponse = Promise.resolve({ result: 'Success' } as unknown as AddDocumentResult);
    mockStorageService.addRegistroDocument.and.returnValue(mockResponse);

    component.guardarCantidad();

    expect(component.data).toEqual({
      uid: '123',
      type: 'testType',
      monto: 100,
      fecha: jasmine.any(Number),
      description: 'Test Description',
    });
    expect(mockStorageService.addRegistroDocument).toHaveBeenCalledWith(component.data);
    expect(mockModalController.dismiss).toHaveBeenCalled();
  });

  it('should log an error if guardarCantidad fails', async () => {
    spyOn(console, 'error');

    const mockIngreso = { uid: '123', type: 'testType', descripcion: 'Test Description' };
    component.ingreso = mockIngreso;
    component.cantidad = 100;

    mockStorageService.addRegistroDocument.and.returnValue(Promise.reject('Test Error'));

    await component.guardarCantidad();

    expect(console.error).toHaveBeenCalledWith('Error al guardar el registro:', 'Test Error');
    expect(mockModalController.dismiss).toHaveBeenCalled();
  });
});
