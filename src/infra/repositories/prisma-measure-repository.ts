import { MeasuresRepository } from '@/domain/measure/application/repositories/measures-repository'
import { Measure } from '@/domain/measure/enterprise/measure'
import { prisma } from '@/infra/database/prisma'

import { PrismaMeasureMapper } from './mappers/prisma-measure-mapper'

export class PrismaMeasuresRepository implements MeasuresRepository {
  async getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYear(
    customerId: string,
    measuredAt: Date,
  ): Promise<Measure | null> {
    const startOfMonth = new Date(
      measuredAt.getFullYear(),
      measuredAt.getMonth(),
      1,
    )
    const endOfMonth = new Date(
      measuredAt.getFullYear(),
      measuredAt.getMonth() + 1,
      0,
    )

    const measure = await prisma.measure.findFirst({
      where: {
        customerId,
        measuredAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    if (!measure) {
      return null
    }

    return PrismaMeasureMapper.toDomain(measure)
  }

  async create(measure: Measure): Promise<void> {
    const data = PrismaMeasureMapper.toPrisma(measure)
    await prisma.measure.create({
      data,
    })
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = await prisma.measure.findUnique({
      where: {
        id,
      },
    })

    if (!measure) {
      return null
    }

    return PrismaMeasureMapper.toDomain(measure)
  }

  async save(measure: Measure): Promise<void> {
    const data = PrismaMeasureMapper.toPrisma(measure)
    await prisma.measure.update({
      where: {
        id: measure.id.toValue(),
      },
      data,
    })
  }

  async findByCostumerId(
    customerId: string,
    queryMeasureType?: 'WATER' | 'GAS',
  ): Promise<Measure[] | null> {
    const measures = await prisma.measure.findMany({
      where: {
        customerId,
        measureType: queryMeasureType || undefined,
      },
    })

    if (measures.length === 0) {
      return null
    }

    return measures.map(PrismaMeasureMapper.toDomain)
  }
}
