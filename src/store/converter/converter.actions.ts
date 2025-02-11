import {createAction, props} from '@ngrx/store';

export const randomlyChangeAmount = createAction(
  '[Converter] Randomly change the amount'
);

export const updateAmount = createAction(
  '[Converter] Update amount',
  props<{amount: number}>()
);

export const convertFromEurToUSD = createAction(
  '[Converter] Convert amount from EUR to USD'
);

export const swapCurrency = createAction(
  '[Converter] Swap currencies'
);
