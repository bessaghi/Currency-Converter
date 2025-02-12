import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {interval, of, skipWhile, switchMap, withLatestFrom} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  addHistory,
  convert,
  randomlyChangeRate,
  updateAmount,
  updateHistory,
  updateRealRate,
  useFixedRate
} from './converter.actions';
import {ConverterUtils} from './converter.utils';
import {Action, select, Store} from '@ngrx/store';
import {history} from './converter.selectors';
import {Conversion} from './converter.state';

@Injectable()
export class ConverterEffects {

  private actions$ = inject(Actions)
  private store = inject(Store)

  randomlyChangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(randomlyChangeRate),
      switchMap(() => interval(3000).pipe(
        map(() => Math.random() * 0.1 - 0.05),
        map(randomValue => ConverterUtils.roundValue(randomValue)),
        map(randomValue => updateRealRate({rate: randomValue}))
      ))
    )
  );

  convertOnRateChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRealRate, useFixedRate, updateAmount),
      switchMap(() => of(
          convert(),
          addHistory()
        )
      )
    )
  );

  limitHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHistory),
      withLatestFrom(this.store.pipe(select(history))),
      skipWhile(([, history]: [Action, Conversion[]]) => history.length < 6),
      map(([, history]: [Action, Conversion[]]) => updateHistory({history: [...history.slice(1)]}))
    )
  );

}
