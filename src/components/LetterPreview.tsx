import { getLetterTemplate } from '../config/templates'
import type { LetterData } from '../types/letter'
import { Polaroid } from './Polaroid'
import { SectionTitle } from './SectionTitle'

interface LetterPreviewProps {
  data: LetterData
}

export function LetterPreview({ data }: LetterPreviewProps) {
  const template = getLetterTemplate(data.template)
  const petName = data.petName.trim() || 'Mel'
  const message =
    data.message.trim() ||
    'Neste Natal, meu maior desejo é encontrar uma família cheia de amor e carinho para chamar de minha.'
  const institution = data.institution.trim() || 'Canil Amigo'
  const contact = data.contact.trim() || '(11) 99999-9999'

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

        <div className="absolute inset-[10%] grid grid-cols-[52%_1fr] items-center gap-[4%] text-primary">
          <div
            className="relative aspect-square w-[110%]"
            style={{
              transform: 'translate(-5%, -30%)',
            }}
          >
            <Polaroid
              accentColor={template.accent}
              className="absolute top-[4%] left-[8%] w-[84%] rounded-[2.5%]"
              photoAlt={`Foto de ${petName}`}
              photoUrl={data.photoUrl}
            />
          </div>

          <div className="flex min-w-0 flex-col text-left">
            <p className="font-heading text-[clamp(0.72rem,2vw,1.15rem)] font-semibold">
              Querido Noel,
            </p>
            <p className="mt-0.5 text-[clamp(0.58rem,1.5vw,0.82rem)] font-bold">
              Eu sou {petName}!
            </p>
            <p className="mt-2 line-clamp-5 text-[clamp(0.52rem,1.3vw,0.74rem)] leading-snug">
              {message}
            </p>
            <div className="mt-3 text-[clamp(0.5rem,1.2vw,0.7rem)] leading-tight">
              <p className="font-bold">{institution}</p>
              <p>{contact}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
