import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {interval, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {convertFromEurToUSD, randomlyChangeAmount, updateAmount} from './converter.actions';
import {ConverterUtils} from './converter.utils';

@Injectable()
export class ConverterEffects {

  private actions$ = inject(Actions)

  randomlyChangeAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(randomlyChangeAmount),
      switchMap(() => interval(3000).pipe(
        map(() => Math.random() * 0.1 - 0.05),
        map(randomValue => ConverterUtils.roundValue(randomValue)),
        map(randomValue => updateAmount({amount: randomValue}))
      ))
    )
  );

  convertOnAmountChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAmount),
      map(() => convertFromEurToUSD())
    )
  );
}
