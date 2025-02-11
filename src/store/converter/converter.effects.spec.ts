import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';
import {ConverterEffects} from './converter.effects';
import {convertFromEurToUSD, updateAmount} from './converter.actions';
import {marbles} from 'rxjs-marbles';
import {TestScheduler} from 'rxjs/internal/testing/TestScheduler';

describe('ConverterEffects', () => {
  let actions$: Observable<any>;
  let effects: ConverterEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConverterEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ConverterEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch convertFromEurToUSD when updateAmount is triggered',
    marbles((m) => {
      actions$ = m.hot('-a', { a: updateAmount({amount: 1}) });

      m.expect(effects.convertOnAmountChange$)
        .toBeObservable('-b', { b: convertFromEurToUSD() });
    })
  );
});
