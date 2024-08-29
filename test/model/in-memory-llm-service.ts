import type { LLMService } from '@/domain/measure/application/model/LLMService'

export class InMemoryLLMService implements LLMService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getValueMeasure(imageBase64: string): Promise<number> {
    const min = 0
    const max = 1000
    const value = Math.random() * (max - min) + min
    return value
  }
}
