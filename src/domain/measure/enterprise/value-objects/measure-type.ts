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

  public toString(): string {
    return this._value
  }
}
