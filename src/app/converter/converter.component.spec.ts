import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConverterComponent} from './converter.component';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialize the value to 1.1`, () => {
    const fixture = TestBed.createComponent(ConverterComponent);
    const app = fixture.componentInstance;
    expect(app.value).toEqual(1.1);
  });
});
