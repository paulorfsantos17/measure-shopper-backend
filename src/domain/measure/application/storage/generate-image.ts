export interface ImageStorageService {
  generateTemporaryLinkForImage(
    base64Image: string,
    expiresIn: number,
  ): Promise<string>
}
