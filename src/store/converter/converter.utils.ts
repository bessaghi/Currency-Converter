import {ConverterState} from './converter.state';

export class ConverterUtils {
  static roundValue = (value: number) => Math.round(value * 100) / 100

  static convertEurToUsd = (converter: ConverterState) =>
    ConverterUtils.roundValue(converter.amount * converter.rate)
}
