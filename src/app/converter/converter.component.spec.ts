import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConverterComponent} from './converter.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';
import {randomlyChangeRate} from '../../store/converter/converter.actions';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterComponent],
      providers: [
        provideMockStore(),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    store = TestBed.inject(Store) as MockStore;
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should dispatch the randomlyChangeAmount on init`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(randomlyChangeRate());
  });
});
