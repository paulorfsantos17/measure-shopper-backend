import { z } from 'zod'

const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/
const imagePrefixRegex = /^data:image\/(png|jpeg|jpg|gif);base64,/

export const base64ImageSchema = z
  .string()
  .min(1, 'É obrigatário passar uma imagem.')
  .refine(
    (value) => {
      if (!base64Regex.test(value.replace(imagePrefixRegex, ''))) {
        return false
      }

      return imagePrefixRegex.test(value)
    },
    {
      message:
        'Valor da imagem é inválido a imagem precisa estar no formato base64 com mimetype.',
    },
  )
