export interface ConverterState {
  amount: number;
  result: number;
  eurToUsdRate: number;
}

export const initialConverterState: ConverterState = {
  amount: 1.1,
  result: 1.1,
  eurToUsdRate: 1.03
}
