import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { env } from '../env'

export class GenerateImageService {
  async generateTemporaryLinkForImage(
    base64Image: string,
    expiresIn: number,
  ): Promise<string> {
    const IMAGE_DIR = path.join(__dirname, '../..', 'images')
    if (!fs.existsSync(IMAGE_DIR)) {
      fs.mkdirSync(IMAGE_DIR)
    }

    const [, base64Data] = base64Image.split(',')

    const imageName = `${uuidv4()}.png`
    const imagePath = path.join(IMAGE_DIR, imageName)

    fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'))

    const temporaryLink = `http://localhost:${env.PORT}/images/${imageName}`

    setTimeout(() => {
      fs.unlinkSync(imagePath)
    }, expiresIn * 1000)

    return temporaryLink
  }
}
