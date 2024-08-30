import { GoogleGenerativeAI } from '@google/generative-ai'

import { LLMService } from '@/domain/measure/application/model/LLMService'

import { env } from '../env'

export class GeminiService implements LLMService {
  private genAI: GoogleGenerativeAI

  constructor() {
    this.genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
  }

  async getValueMeasure(base64Image: string): Promise<number> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
    })

    const [, base64Data] = base64Image.split(',')

    try {
      const { response } = await model.generateContent([
        {
          text: 'retorne o somente numero da imagem que é o valor do medidor',
        },
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/png',
          },
        },
      ])
      const value = response.text()
      const parsedValue = parseFloat(value)

      return parsedValue
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error)
      throw new Error('Erro ao gerar conteúdo com o LLM')
    }
  }
}
