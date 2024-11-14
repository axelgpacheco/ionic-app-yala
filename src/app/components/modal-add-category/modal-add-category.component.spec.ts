import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalAddCategoryComponent } from './modal-add-category.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ModalAddCategoryComponent', () => {
  let component: ModalAddCategoryComponent;
  let fixture: ComponentFixture<ModalAddCategoryComponent>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    mockModalController = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ModalAddCategoryComponent],
      providers: [
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input property "ingreso"', () => {
    const mockIngreso = { id: 1, name: 'Test Ingreso' };
    component.ingreso = mockIngreso;
    fixture.detectChanges();
    expect(component.ingreso).toEqual(mockIngreso);
  });

  it('should close the modal on "closeModal" call', () => {
    component.closeModal();
    expect(mockModalController.dismiss).toHaveBeenCalled();
  });

  it('should update selectedImage on image selection', () => {
    const mockEvent = {
      target: {
        files: [
          new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' }),
        ],
      },
    };
    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
          (this.onload as Function)({ target: { result: 'data:image/jpeg;base64,dummycontent' } });
        });

    component.onImageSelected(mockEvent);
    fixture.detectChanges();
    expect(component.fileToUpload).toBeTruthy();
    expect(component.selectedImage).toEqual('data:image/jpeg;base64,dummycontent');
  });

  it('should not upload an image if no file is selected', () => {
    spyOn(window, 'alert');
    component.fileToUpload = null; // No file selected
    component.uploadImage();
    expect(window.alert).toHaveBeenCalledWith('Please select an image before uploading.');
  });

  it('should log the file path if an image is selected for upload', () => {
    const mockFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    component.fileToUpload = mockFile;

    spyOn(console, 'log');
    component.uploadImage();
    expect(console.log).toHaveBeenCalledWith(`categories/${jasmine.any(Number)}_test.jpg`);
  });

  it('should save and close the modal on "guardarCantidad"', () => {
    spyOn(console, 'log');
    component.descripcion = 'Test Description';
    component.data = { uid: '123', type: 'test', monto: '100', fecha: Date.now(), description: 'Test data' };

    component.guardarCantidad();

    expect(console.log).toHaveBeenCalledWith('Categoria Agregada');
    expect(console.log).toHaveBeenCalledWith('Test Description');
    expect(console.log).toHaveBeenCalledWith('Data:', component.data);
    expect(mockModalController.dismiss).toHaveBeenCalled();
  });
});
