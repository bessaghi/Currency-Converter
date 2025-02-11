import {createReducer, on} from '@ngrx/store';
import {convertFromEurToUSD, swapCurrency, updateAmount, updateRate} from './converter.actions';
import {initialConverterState} from './converter.state';
import {ConverterUtils} from './converter.utils';

export const converterReducer = createReducer(
  initialConverterState,
  on(updateAmount, (state, {amount}) => (
      {
        ...state,
        amount: state.amount + amount
      }
    )
  ),
  on(convertFromEurToUSD, state => (
      {
        ...state,
        result: ConverterUtils.convertEurToUsd(state)
      }
    )
  ),
  on(swapCurrency, state => (
      {
        ...state,
        amount: state.result,
        result: state.amount,
        rate: 1 / state.rate
      }
    )
  ),
  on(updateRate, (state, {rate}) => (
      {
        ...state,
        rate: rate
      }
    )
  )
);
