import { getLetterTemplate } from '../config/templates'
import type { LetterData } from '../types/letter'
import { SectionTitle } from './SectionTitle'

interface LetterPreviewProps {
  data: LetterData
}

export function LetterPreview({ data }: LetterPreviewProps) {
  const template = getLetterTemplate(data.template)

  return (
    <section
      aria-label="Pré-visualização da cartinha"
      className="mx-auto flex w-full max-w-[540px] flex-col items-stretch gap-4 lg:sticky lg:top-6"
    >
      <SectionTitle>Pré-visualização da sua cartinha</SectionTitle>
      <div className="relative mt-1 aspect-square w-full overflow-hidden rounded-xl shadow-sm">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full scale-[1.01] object-cover"
          src={template.post}
        />
        {data.photoUrl && (
          <img
            alt={`Foto de ${data.petName || 'pet'}`}
            className="absolute top-[17.4%] left-[6.9%] h-[30.3%] w-[34.5%] rounded-[0.5%] object-cover object-center"
            draggable="false"
            src={data.photoUrl}
          />
        )}
        <p
          aria-live="polite"
          className="absolute top-[27%] left-[45%] flex h-[7.8%] w-[38.6%] items-center justify-center truncate px-[2%] font-heading text-[clamp(0.65rem,2.7vw,0.95rem)] font-medium text-text"
        >
          {data.petName}
        </p>
        <p
          aria-live="polite"
          className="absolute top-[42%] left-[45%] flex h-[22.3%] w-[49.4%] items-center justify-center overflow-hidden px-[3%] py-[2%] text-center text-[clamp(0.55rem,2.2vw,0.85rem)] leading-snug font-medium break-words whitespace-pre-wrap text-text"
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
    </section>
  )
}
