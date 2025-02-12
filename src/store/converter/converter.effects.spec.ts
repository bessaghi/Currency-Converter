import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';
import {ConverterEffects} from './converter.effects';
import {addHistory, convert, updateHistory, updateRealRate} from './converter.actions';
import {marbles} from 'rxjs-marbles';
import {TestScheduler} from 'rxjs/internal/testing/TestScheduler';
import {Store} from '@ngrx/store';
import {Conversion} from './converter.state';

describe('ConverterEffects', () => {
  let actions$: Observable<any>
  let effects: ConverterEffects
  let testScheduler: TestScheduler
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConverterEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ConverterEffects);
    store = TestBed.inject(Store) as MockStore;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch convertWithRealRate and addHistory when updateRealRate is triggered',
    marbles((m) => {
      actions$ = m.hot('-a', {a: updateRealRate({rate: 1})});

      m.expect(effects.convertOnRateChange$)
        .toBeObservable('-(bc)', {b: convert(), c: addHistory()});
    })
  );

  it('should dispatch an updateHistory when history has exceeded 5',
    marbles((m) => {
      const historyMock: Conversion[] = [
        {fixedRate: 1.1, realRate: 0.9, amount: '21', result: '12'},
        {fixedRate: 0.8, realRate: 0.2, amount: '26', result: '21'},
        {fixedRate: 1.7, realRate: 0.4, amount: '71', result: '31'},
        {fixedRate: 1.3, realRate: 0.6, amount: '43', result: '41'},
        {fixedRate: 90, realRate: 0.8, amount: '44', result: '94'},
        {fixedRate: 1.5, realRate: 0.7, amount: '65', result: '32'}
      ];

      actions$ = m.hot('-a', {a: addHistory()});
      store.setState({
        converter: {
          history: historyMock
        }
      });

      m.expect(effects.limitHistory$)
        .toBeObservable('-b', {b: updateHistory({history: historyMock.slice(1)})});
    })
  );

  it('should not dispatch an updateHistory when history length is less than 5',
    marbles((m) => {
      const historyMock: Conversion[] = [
        {fixedRate: 1.1, realRate: 0.9, amount: '21', result: '12'},
        {fixedRate: 0.8, realRate: 0.2, amount: '26', result: '21'},
        {fixedRate: 1.7, realRate: 0.4, amount: '71', result: '31'}
      ];

      actions$ = m.hot('-a', {a: addHistory()});
      store.setState({
        converter: {
          history: historyMock
        }
      });

      m.expect(effects.limitHistory$).toBeObservable('-');
    })
  );
});
