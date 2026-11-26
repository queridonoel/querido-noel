import type { LetterData } from '../types/letter'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024
const MAX_PHOTO_DIMENSION = 4096
const SUPPORTED_PHOTO_TYPES = ['image/jpeg', 'image/png']

interface PhotoFileData {
  size: number
  type: string
}

interface DecodedImage {
  close?: () => void
  height: number
  width: number
}

type ImageDecoder = (file: Blob) => Promise<DecodedImage>

export function canDownloadLetter(data: LetterData) {
  return Boolean(
    data.petName.trim() &&
    data.photoUrl.trim() &&
    data.message.trim() &&
    data.institution.trim() &&
    isValidPhone(data.contact),
  )
}

export function clampPhotoPosition(value: number) {
  return Math.min(100, Math.max(0, value))
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function isValidPhone(value: string) {
  return /^\(\d{2}\) (?:\d{4}|\d{5})-\d{4}$/.test(value)
}

export function toSafeFileName(value: string, fallback = 'pet') {
  return (
    value
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || fallback
  )
}

export function validatePhotoFile(file: PhotoFileData) {
  if (!SUPPORTED_PHOTO_TYPES.includes(file.type)) {
    return 'Selecione uma imagem JPG ou PNG.'
  }

  if (file.size > MAX_PHOTO_SIZE) {
    return 'A imagem deve ter no máximo 5 MB.'
  }

  return null
}

export async function validatePhotoImage(
  file: File,
  decode: ImageDecoder = createImageBitmap,
) {
  const fileError = validatePhotoFile(file)
  if (fileError) return fileError

  let image: DecodedImage

  try {
    image = await decode(file)
  } catch {
    return 'Não foi possível ler a imagem. Selecione outro arquivo.'
  }

  const hasInvalidDimensions =
    image.width < 1 ||
    image.height < 1 ||
    image.width > MAX_PHOTO_DIMENSION ||
    image.height > MAX_PHOTO_DIMENSION

  image.close?.()

  if (hasInvalidDimensions) {
    return `A imagem deve ter no máximo ${MAX_PHOTO_DIMENSION} × ${MAX_PHOTO_DIMENSION} pixels.`
  }

  return null
}
