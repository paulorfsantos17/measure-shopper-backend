import type { ImageStorageService } from '@/domain/measure/application/storage/generate-image'

export class InMemoryImageStorageService implements ImageStorageService {
  async generateTemporaryLinkForImage(
    base64Image: string,
    expiresIn: number,
  ): Promise<string> {
    const base64Data = base64Image.substring(0, 10)
    const expirationTime = new Date(Date.now() + expiresIn * 1000).toISOString()
    return `https://example.com/image/${base64Data}?expires=${expirationTime}`
  }
}
