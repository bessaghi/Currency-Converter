import {createReducer, on} from '@ngrx/store';
import {convertFromEurToUSD, updateAmount} from './converter.actions';
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
  )
);
