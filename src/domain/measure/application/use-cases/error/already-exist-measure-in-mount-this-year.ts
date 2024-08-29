import type { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyExistMeasureInMonthThisYear
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Leitura do mês já realizada')
  }
}
