import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';
import {ConverterState} from './converter.state';

export const converter = (state: AppState) => state.converter

export const amount = createSelector(
  converter,
  (state: ConverterState) => state.amount
)

export const result = createSelector(
  converter,
  (state: ConverterState) => state.result
)

export const rate = createSelector(
  converter,
  (state: ConverterState) => state.rate
)
