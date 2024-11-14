import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreContainerComponent } from './explore-container.component';
import { By } from '@angular/platform-browser';

describe('ExploreContainerComponent', () => {
  let component: ExploreContainerComponent;
  let fixture: ComponentFixture<ExploreContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExploreContainerComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should contain a specific DOM element (e.g., explore-container)', () => {
    const containerElement = fixture.debugElement.query(By.css('.explore-container'));
    expect(containerElement).toBeTruthy();
  });

  it('should display placeholder content if applicable', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const placeholderText = compiled.querySelector('.placeholder');
    expect(placeholderText?.textContent).toContain('Expected Content');  
  });
});
