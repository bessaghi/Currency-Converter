import {createAction, props} from '@ngrx/store';
import {Conversion} from './converter.state';

export const randomlyChangeRate = createAction(
  '[Converter] Randomly change rate'
);

export const updateRealRate = createAction(
  '[Converter] Update real rate',
  props<{rate: number}>()
);

export const updateAmount = createAction(
  '[Converter] Update amount',
  props<{amount: number}>()
);

export const convert = createAction(
  '[Converter] Convert amount with appropriate rate'
);

export const swapCurrency = createAction(
  '[Converter] Swap currencies'
);

export const updateFixedRate = createAction(
  '[Converter] Use fixed rate',
  props<{rate: number}>()
);

export const useFixedRate = createAction(
  '[Converter] Use fixed rate'
);

export const useRealRate = createAction(
  '[Converter] Use real rate'
);

export const addHistory = createAction(
  '[Converter] Add conversion to history'
);

export const updateHistory = createAction(
  '[Converter] Update history',
  props<{history: Conversion[]}>()
);
