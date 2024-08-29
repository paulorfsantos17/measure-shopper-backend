export interface LLMService {
  getValueMeasure(imageBase64: string): Promise<number>
}
