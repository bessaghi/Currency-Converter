export class ConverterUtils {
  static roundValue = (value: number) => Math.round(value * 100) / 100

  static convertAmount = (amount: number, rate: number) =>
    ConverterUtils.roundValue(amount * rate)
}
