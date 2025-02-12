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

export const fixedRate = createSelector(
  converter,
  (state: ConverterState) => state.fixedRate
)

export const realRate = createSelector(
  converter,
  (state: ConverterState) => state.realRate
)

export const sourceCurrency = createSelector(
  converter,
  (state: ConverterState) => state.sourceCurrency
)

export const destinationCurrency = createSelector(
  converter,
  (state: ConverterState) => state.destinationCurrency
)

export const history = createSelector(
  converter,
  (state: ConverterState) => state.history
)

export const rateInvalid = createSelector(
  converter,
  (state: ConverterState) => state.fixedRate >= 1.02 * state.realRate
)
