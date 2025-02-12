export interface ConverterState {
  amount: number
  result: number
  fixedRate: number
  realRate: number
  rateField: 'realRate' | 'fixedRate'
  sourceCurrency: string
  destinationCurrency: string
  history: Conversion[]
}

export interface Conversion {
  fixedRate: number
  realRate: number
  amount: string
  result: string
}

export const initialConverterState: ConverterState = {
  amount: 0,
  result: 0,
  fixedRate: 1.1,
  realRate: 1.1,
  rateField: 'realRate',
  sourceCurrency: '€',
  destinationCurrency: '$',
  history: []
}
