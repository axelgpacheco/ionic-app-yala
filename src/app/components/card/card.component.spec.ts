import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent],  
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should have a specific DOM element (e.g., a card container)', () => {
    const cardContainer = fixture.debugElement.query(By.css('.card-container'));
    expect(cardContainer).toBeTruthy();
  });

  it('should display specific content (placeholder test)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('.card-content');
    expect(content?.textContent).toContain('Expected Placeholder Content');  
  });
});
