import {ConverterState, initialConverterState} from './converter/converter.state';

export interface AppState {
  converter: ConverterState;
}

export const initialAppState: AppState = {
  converter: initialConverterState
}
