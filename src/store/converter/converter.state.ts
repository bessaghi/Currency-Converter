export interface ConverterState {
  amount: number;
  result: number;
  rate: number;
}

export const initialConverterState: ConverterState = {
  amount: 1.1,
  result: 1.1,
  rate: 1.03
}
