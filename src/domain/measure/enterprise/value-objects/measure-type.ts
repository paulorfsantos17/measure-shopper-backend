export class MeasureType {
  private readonly _value: 'WATER' | 'GAS'

  private constructor(value: 'WATER' | 'GAS') {
    this._value = value
  }

  public static WATER(): MeasureType {
    return new MeasureType('WATER')
  }

  public static GAS(): MeasureType {
    return new MeasureType('GAS')
  }

  public get value(): 'WATER' | 'GAS' {
    return this._value
  }

  static setMeasureType(value: string) {
    if (value === 'WATER') {
      return new MeasureType('WATER')
    }
    if (value === 'GAS') {
      return new MeasureType('GAS')
    }

    throw new Error('invalid value')
  }

  public toString(): string {
    return this._value
  }
}
