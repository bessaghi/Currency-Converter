import {createReducer, on} from '@ngrx/store';
import {
  addHistory,
  convert,
  swapCurrency,
  updateAmount,
  updateFixedRate,
  updateHistory,
  updateRealRate,
  useFixedRate,
  useRealRate
} from './converter.actions';
import {initialConverterState} from './converter.state';
import {ConverterUtils} from './converter.utils';

export const converterReducer = createReducer(
    initialConverterState,
    on(updateRealRate, (state, {rate}) => (
        {
          ...state,
          realRate: state.realRate + rate
        }
      )
    ),
  on(updateAmount, (state, {amount}) => (
        {
          ...state,
          amount: amount
        }
      )
    ),
    on(convert, state => (
        {
          ...state,
          result: ConverterUtils.convertAmount(state.amount, state[state.rateField])
        }
      )
    ),
    on(swapCurrency, state => (
        {
          ...state,
          amount: state.result,
          result: state.amount,
          realRate: ConverterUtils.roundValue(1 / state.realRate),
          fixedRate: ConverterUtils.roundValue(1 / state.fixedRate),
          sourceCurrency: state.destinationCurrency,
          destinationCurrency: state.sourceCurrency
        }
      )
    ),
    on(updateFixedRate, (state, {rate}) => (
        {
          ...state,
          fixedRate: rate
        }
      )
    ),
    on(useFixedRate, state => (
        {
          ...state,
          rate: 'fixedRate'
        }
      )
    ),
    on(useRealRate, state => (
        {
          ...state,
          rate: 'realRate'
        }
      )
    ),
    on(addHistory, state => (
        {
          ...state,
          history: [
            ...state.history,
            {
              fixedRate: state.fixedRate,
              realRate: state.realRate,
              amount: (state.amount ?? 0) + state.sourceCurrency,
              result: state.result + state.destinationCurrency
            }
          ]
        }
      )
    ),
    on(updateHistory, (state, {history}) => (
        {
          ...state,
          history: history
        }
      )
    )
  );
