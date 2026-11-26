import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { toPng } from 'html-to-image'
import { Camera, Download } from 'lucide-react'
import { getLetterTemplate } from '../config/templates'
import type { LetterData } from '../types/letter'
import {
  clampPhotoPosition,
  isValidPhone,
  toSafeFileName,
} from '../utils/letter'
import { SectionTitle } from './SectionTitle'

interface PhotoPosition {
  x: number
  y: number
}

interface DragStart extends PhotoPosition {
  clientX: number
  clientY: number
  pointerId: number
}

interface DraggablePhotoProps {
  alt: string
  src: string
}

function DraggablePhoto({ alt, src }: DraggablePhotoProps) {
  const [position, setPosition] = useState<PhotoPosition>({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<DragStart | null>(null)

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStart.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      pointerId: event.pointerId,
      ...position,
    }
    setIsDragging(true)
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const start = dragStart.current
    if (!start || start.pointerId !== event.pointerId) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const deltaX = ((event.clientX - start.clientX) / bounds.width) * 100
    const deltaY = ((event.clientY - start.clientY) / bounds.height) * 100

    setPosition({
      x: clampPhotoPosition(start.x - deltaX),
      y: clampPhotoPosition(start.y - deltaY),
    })
  }

  function stopDragging(event: PointerEvent<HTMLButtonElement>) {
    if (dragStart.current?.pointerId !== event.pointerId) return
    dragStart.current = null
    setIsDragging(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 10 : 3
    const movement = {
      ArrowDown: { x: 0, y: step },
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
    }[event.key]

    if (event.key === 'Home') {
      event.preventDefault()
      setPosition({ x: 50, y: 50 })
      return
    }

    if (!movement) return
    event.preventDefault()
    setPosition((current) => ({
      x: clampPhotoPosition(current.x + movement.x),
      y: clampPhotoPosition(current.y + movement.y),
    }))
  }

  return (
    <button
      aria-label={`${alt}. Arraste para reposicionar ou use as setas do teclado.`}
      className={`absolute top-[17.4%] left-[6.9%] h-[30.3%] w-[34.5%] touch-none overflow-hidden rounded-[0.5%] border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onKeyDown={handleKeyDown}
      onPointerCancel={stopDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      type="button"
    >
      <img
        alt=""
        aria-hidden="true"
        className="size-full select-none object-cover"
        draggable="false"
        src={src}
        style={{ objectPosition: `${position.x}% ${position.y}%` }}
      />
    </button>
  )
}

interface LetterPreviewProps {
  data: LetterData
}

export function LetterPreview({ data }: LetterPreviewProps) {
  const template = getLetterTemplate(data.template)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const canDownload = Boolean(
    data.petName.trim() &&
    data.photoUrl &&
    data.message.trim() &&
    data.institution.trim() &&
    isValidPhone(data.contact),
  )

  async function handleDownload() {
    const preview = previewRef.current
    if (!preview || !canDownload) return

    setIsDownloading(true)
    setDownloadError('')

    try {
      await document.fonts.ready
      const pixelRatio = 1254 / preview.getBoundingClientRect().width
      const dataUrl = await toPng(preview, {
        pixelRatio,
      })
      const safePetName = toSafeFileName(data.petName)
      const link = document.createElement('a')
      link.download = `cartinha-${safePetName}.png`
      link.href = dataUrl
      link.click()
    } catch {
      setDownloadError('Não foi possível gerar a imagem. Tente novamente.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section
      aria-label="Pré-visualização da cartinha"
      className="mx-auto flex w-full max-w-[540px] flex-col items-stretch gap-4 lg:sticky lg:top-6"
    >
      <SectionTitle>Pré-visualização da sua cartinha</SectionTitle>
      <div className="mt-1 overflow-hidden rounded-xl shadow-sm">
        <div
          className="relative aspect-square w-full overflow-hidden"
          ref={previewRef}
        >
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full scale-[1.01] object-cover"
            src={template.post}
          />
          {data.photoUrl ? (
            <DraggablePhoto
              alt={`Foto de ${data.petName || 'pet'}`}
              key={data.photoUrl}
              src={data.photoUrl}
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute top-[17.4%] left-[6.9%] flex h-[30.3%] w-[34.5%] items-center justify-center text-text/25"
            >
              <Camera className="size-[24%]" strokeWidth={1.5} />
            </div>
          )}
          <p
            aria-live="polite"
            className="absolute top-[27%] left-[45%] flex h-[7.8%] w-[38.6%] items-center justify-center truncate px-[2%] font-heading text-[clamp(0.65rem,2.7vw,0.95rem)] font-medium text-text"
          >
            {data.petName}
          </p>
          <p
            aria-live="polite"
            className="absolute top-[42%] left-[45%] flex h-[22.3%] w-[49.4%] items-center justify-center overflow-hidden px-[3%] py-[2%] text-center text-[clamp(0.55rem,2.2vw,0.85rem)] leading-snug font-medium break-words whitespace-pre-wrap text-text [overflow-wrap:anywhere]"
          >
            {data.message}
          </p>
          <div
            aria-live="polite"
            className="absolute top-[78.8%] left-[27.4%] flex h-[12.8%] w-[45.3%] flex-col items-center justify-center px-[3%] text-center text-text"
          >
            <p className="w-full truncate font-heading text-[clamp(0.55rem,2.2vw,0.85rem)] font-semibold">
              {data.institution}
            </p>
            <div
              aria-hidden="true"
              className="my-[2.5%] w-[82%] border-t border-text/15"
            />
            <p className="w-full truncate text-[clamp(0.5rem,1.9vw,0.75rem)] font-medium">
              {data.contact}
            </p>
          </div>
        </div>
      </div>
      <button
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45"
        disabled={!canDownload || isDownloading}
        onClick={handleDownload}
        type="button"
      >
        <Download aria-hidden="true" className="size-4" />
        {isDownloading ? 'Gerando imagem...' : 'Baixar cartinha'}
      </button>
      {downloadError && (
        <p className="text-center text-xs text-christmas-red" role="alert">
          {downloadError}
        </p>
      )}
    </section>
  )
}
